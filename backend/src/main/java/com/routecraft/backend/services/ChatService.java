package com.routecraft.backend.services;

import com.routecraft.backend.dtos.ChatRequest;
import com.routecraft.backend.dtos.ChatResponse;
import com.routecraft.backend.model.EnrichedResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private AIService aiService;

    public ChatResponse handleChat(ChatRequest request) {
        System.out.println("Processing chat request: " + request.message);
        EnrichedResponse enriched = aiService.getEnrichedResponse(request.message);
        
        System.out.println("Enriched response received. Tokens: " + enriched.tokens());
        
        return new ChatResponse(enriched.userReply(), enriched.tokens());
    }
}