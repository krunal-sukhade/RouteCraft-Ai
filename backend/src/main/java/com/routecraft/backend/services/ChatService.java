package com.routecraft.backend.services;

import com.routecraft.backend.dtos.ChatRequest;
import com.routecraft.backend.dtos.ChatResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private AIService aiService;

    public ChatResponse handleChat(ChatRequest request) {
        String reply = aiService.getResponse(request.message);
        return new ChatResponse(reply);
    }
}