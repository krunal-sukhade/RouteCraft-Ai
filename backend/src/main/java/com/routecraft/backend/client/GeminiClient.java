package com.routecraft.backend.client;

import com.routecraft.backend.model.EnrichedResponse;
import com.routecraft.backend.model.TripTokens;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.client.HttpClientErrorException;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

@Service
public class GeminiClient {

    private static final Logger logger = LoggerFactory.getLogger(GeminiClient.class);

    // Free Tier limit is 15 RPM. Using a Semaphore to limit concurrent requests.
    // This isn't a perfect RPM limiter, but it prevents sudden bursts from the same JVM instance.
    private final Semaphore rateLimiter = new Semaphore(1);

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public EnrichedResponse callGemini(String message) {
        int maxRetries = 3;
        int retryCount = 0;
        long waitTime = 5000; // Increased to 5s for free tier

        while (retryCount < maxRetries) {
            boolean acquired = false;
            try {
                // Try to acquire the permit to send a request, with a timeout.
                acquired = rateLimiter.tryAcquire(10, TimeUnit.SECONDS);
                if (!acquired) {
                    logger.warn("Could not acquire rate limiter permit. High traffic locally.");
                    return new EnrichedResponse(null, "The server is currently busy. Please wait a moment.");
                }

                return executeCall(message);

            } catch (HttpClientErrorException.TooManyRequests e) {
                retryCount++;
                if (retryCount >= maxRetries) {
                    logger.error("Max retries reached for Gemini API due to 429 Too Many Requests: {}", e.getResponseBodyAsString());
                    break;
                }
                logger.warn("429 Too Many Requests from Gemini. Retrying in {}ms (Attempt {}/{})", waitTime, retryCount, maxRetries);
                try {
                    Thread.sleep(waitTime);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    break;
                }
                waitTime *= 2; // exponential backoff
            } catch (Exception e) {
                logger.error("Error calling Gemini API: {}", e.getMessage(), e);
                return new EnrichedResponse(null, "Sorry, I encountered an error. Please try again.");
            } finally {
                if (acquired) {
                    // Small artificial delay before releasing to avoid hammering the API
                    try { Thread.sleep(1000); } catch (InterruptedException ignored) {}
                    rateLimiter.release();
                }
            }
        }
        return new EnrichedResponse(null, "Sorry, I am currently experiencing high traffic. Please try again later.");
    }

    private EnrichedResponse executeCall(String message) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        String systemPrompt = """
                You are a trip assistant.
                Extract these tokens if present in the user's message: source, destination, number_of_days, number_of_people, start_date, budget.
                If any token is missing, set its value to null.
                Also provide a friendly conversational response in 'userReply'.
                
                Respond ONLY with this JSON structure:
                {
                  "tokens": {
                    "source": "string or null",
                    "destination": "string or null",
                    "number_of_days": number or null,
                    "number_of_people": number or null,
                    "start_date": "string or null",
                    "budget": "string or null"
                  },
                  "userReply": "string"
                }
                
                User: """;

        Map<String, Object> body = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", systemPrompt + message)
                        ))
                ),
                "generationConfig", Map.of(
                        "response_mime_type", "application/json"
                )
        );

        Map response = restTemplate.postForObject(url, body, Map.class);
        logger.info("Raw response from Gemini: {}", response);

        List candidates = (List) response.get("candidates");
        Map first = (Map) candidates.get(0);
        Map content = (Map) first.get("content");
        List parts = (List) content.get("parts");
        Map textPart = (Map) parts.get(0);

        String jsonResponse = textPart.get("text").toString();
        logger.info("JSON response: {}", jsonResponse);
        EnrichedResponse enrichedResponse = parseResponse(jsonResponse);
        logger.info("Parsed EnrichedResponse: tokens={}, userReply={}", enrichedResponse.tokens(), enrichedResponse.userReply());
        return enrichedResponse;
    }

    private EnrichedResponse parseResponse(String json) {
        try {
            // Manual parsing to avoid dependency issues with Jackson/Gson if they aren't available in current environment
            String userReply = extractValue(json, "userReply");
            String tokensPart = extractObject(json, "tokens");
            
            TripTokens tokens = new TripTokens(
                extractValue(tokensPart, "source"),
                extractValue(tokensPart, "destination"),
                extractInt(tokensPart, "number_of_days"),
                extractInt(tokensPart, "number_of_people"),
                extractValue(tokensPart, "start_date"),
                extractValue(tokensPart, "budget")
            );
            
            return new EnrichedResponse(tokens, userReply);
        } catch (Exception e) {
            return new EnrichedResponse(null, "Error parsing response");
        }
    }

    private String extractValue(String json, String key) {
        String pattern = "\"" + key + "\":\\s*\"([^\"]*)\"";
        java.util.regex.Matcher matcher = java.util.regex.Pattern.compile(pattern).matcher(json);
        return matcher.find() ? matcher.group(1) : null;
    }

    private Integer extractInt(String json, String key) {
        String pattern = "\"" + key + "\":\\s*(\\d+)";
        java.util.regex.Matcher matcher = java.util.regex.Pattern.compile(pattern).matcher(json);
        return matcher.find() ? Integer.parseInt(matcher.group(1)) : null;
    }

    private String extractObject(String json, String key) {
        String pattern = "\"" + key + "\":\\s*(\\{.*?\\})";
        java.util.regex.Matcher matcher = java.util.regex.Pattern.compile(pattern, java.util.regex.Pattern.DOTALL).matcher(json);
        return matcher.find() ? matcher.group(1) : "{}";
    }
}
