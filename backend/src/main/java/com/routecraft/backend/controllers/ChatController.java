package com.routecraft.backend.controllers;

import com.routecraft.backend.dtos.ChatRequest;
import com.routecraft.backend.dtos.ChatResponse;
import com.routecraft.backend.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin("*") // allow frontend
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping("/chat")
    public ChatResponse chat(@RequestBody ChatRequest request) {
        return chatService.handleChat(request);
    }
}