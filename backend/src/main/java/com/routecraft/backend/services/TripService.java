package com.routecraft.backend.services;

import com.routecraft.backend.model.TripResponse;
import com.routecraft.backend.model.TripTokens;
import com.routecraft.backend.model.SavedTrip;
import com.routecraft.backend.repositories.SavedTripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TripService {

    @Autowired
    private SavedTripRepository savedTripRepository;

    private static final Logger logger = LoggerFactory.getLogger(TripService.class);

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public TripResponse generateTripItinerary(TripTokens tokens) {
        logger.info("Generating trip itinerary for destination: {}", tokens.destination());
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        String systemPrompt = String.format(
            "You are a professional travel planner. Generate a detailed %d-day itinerary for a trip from %s to %s for %d people with a %s budget starting on %s. " +
            "Provide exactly %d days. " +
            "Respond ONLY with this JSON structure: " +
            "{ \"title\": \"Trip Title\", \"description\": \"Short intro\", \"itinerary\": [ " +
            "{ \"day\": 1, \"theme\": \"Day Theme\", \"dayDescription\": \"Summary\", \"morning\": { \"title\": \"Activity\", \"description\": \"Details\" }, \"afternoon\": { \"title\": \"Activity\", \"description\": \"Details\" }, \"evening\": { \"title\": \"Activity\", \"description\": \"Details\" }, \"stay\": \"Stay Info\" } ], " +
            "\"budgetTips\": [ \"tip1\", \"tip2\" ] }",
            tokens.numberOfDays(), tokens.source(), tokens.destination(), tokens.numberOfPeople(), tokens.budget(), tokens.startDate(), tokens.numberOfDays()
        );

        Map<String, Object> body = Map.of(
            "contents", List.of(Map.of("parts", List.of(Map.of("text", systemPrompt)))),
            "generationConfig", Map.of("response_mime_type", "application/json")
        );

        try {
            Map response = restTemplate.postForObject(url, body, Map.class);
            logger.info("Trip generation Gemini response received");
            List candidates = (List) response.get("candidates");
            Map first = (Map) candidates.get(0);
            Map content = (Map) first.get("content");
            List parts = (List) content.get("parts");
            String jsonResponse = ((Map) parts.get(0)).get("text").toString();
            logger.info("Trip generation JSON: {}", jsonResponse);

            TripResponse tripResponse = parseTripResponse(jsonResponse);
            logger.info("Successfully parsed trip: {}", tripResponse.title());
            return tripResponse;
        } catch (Exception e) {
            logger.error("Error generating trip itinerary via Gemini: {}", e.getMessage(), e);
            return getFallbackResponse(tokens);
        }
    }

    private TripResponse parseTripResponse(String json) {
        // Simplified manual parsing for demonstration. 
        // Ideally use a library like Jackson for nested structures.
        String title = extractValue(json, "title");
        String description = extractValue(json, "description");
        
        List<TripResponse.DayPlan> itinerary = new ArrayList<>();
        Pattern dayPattern = Pattern.compile("\\{\\s*\"day\":\\s*(\\d+).*?\"stay\":\\s*\"(.*?)\"\\s*\\}", Pattern.DOTALL);
        Matcher matcher = dayPattern.matcher(json);
        
        while (matcher.find()) {
            String dayJson = matcher.group();
            int day = Integer.parseInt(matcher.group(1));
            String theme = extractValue(dayJson, "theme");
            String dayDesc = extractValue(dayJson, "dayDescription");
            String stay = matcher.group(2);
            
            itinerary.add(new TripResponse.DayPlan(
                day, theme, dayDesc,
                new TripResponse.Activity(extractValue(extractObject(dayJson, "morning"), "title"), extractValue(extractObject(dayJson, "morning"), "description")),
                new TripResponse.Activity(extractValue(extractObject(dayJson, "afternoon"), "title"), extractValue(extractObject(dayJson, "afternoon"), "description")),
                new TripResponse.Activity(extractValue(extractObject(dayJson, "evening"), "title"), extractValue(extractObject(dayJson, "evening"), "description")),
                stay
            ));
        }

        List<String> budgetTips = new ArrayList<>();
        Pattern tipPattern = Pattern.compile("\"budgetTips\":\\s*\\[(.*?)\\]", Pattern.DOTALL);
        Matcher tipMatcher = tipPattern.matcher(json);
        if (tipMatcher.find()) {
            String tipsArray = tipMatcher.group(1);
            Matcher m = Pattern.compile("\"([^\"]*)\"").matcher(tipsArray);
            while (m.find()) budgetTips.add(m.group(1));
        }

        return new TripResponse(title, description, itinerary, budgetTips);
    }

    private TripResponse getFallbackResponse(TripTokens tokens) {
        return new TripResponse(
            "Trip to " + tokens.destination(),
            "We encountered an issue generating your detailed plan. Please try again.",
            List.of(), List.of()
        );
    }

    private String extractValue(String json, String key) {
        String pattern = "\"" + key + "\":\\s*\"([^\"]*)\"";
        Matcher matcher = Pattern.compile(pattern).matcher(json);
        return matcher.find() ? matcher.group(1) : "";
    }

    private String extractObject(String json, String key) {
        String pattern = "\"" + key + "\":\\s*(\\{.*?\\})";
        Matcher matcher = Pattern.compile(pattern, Pattern.DOTALL).matcher(json);
        return matcher.find() ? matcher.group(1) : "{}";
    }

    public SavedTrip saveTrip(String userId, TripTokens tokens, TripResponse response) {
        logger.info("Saving trip for user: {} to destination: {}", userId, tokens.destination());
        SavedTrip trip = new SavedTrip(userId, tokens, response);
        return savedTripRepository.save(trip);
    }

    public List<SavedTrip> getSavedTrips(String userId) {
        logger.info("Fetching saved trips for user: {}", userId);
        return savedTripRepository.findByUserId(userId);
    }
}