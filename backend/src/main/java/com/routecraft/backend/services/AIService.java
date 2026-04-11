package com.routecraft.backend.services;

import com.routecraft.backend.client.GeminiClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AIService {

    @Autowired
    private GeminiClient geminiClient;

    public String getResponse(String message) {
        String raw = geminiClient.callGemini(message);
        return clean(raw);
    }

    private String clean(String text) {
        return text.replaceAll("\\n+", " ").trim();
    }
}