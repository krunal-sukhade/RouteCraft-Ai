package com.routecraft.backend.services;

import com.routecraft.backend.client.GeminiClient;
import com.routecraft.backend.model.EnrichedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    @Autowired
    private GeminiClient geminiClient;

    public EnrichedResponse getEnrichedResponse(String message) {
        return geminiClient.callGemini(message);
    }

    public String getResponse(String message) {
        EnrichedResponse enriched = geminiClient.callGemini(message);
        return clean(enriched.userReply());
    }

    private String clean(String text) {
        if (text == null) return "";
        return text.replaceAll("\\n+", " ").trim();
    }
}