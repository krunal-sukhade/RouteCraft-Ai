package com.routecraft.backend.dtos;

import com.routecraft.backend.model.TripTokens;

public class ChatResponse {
    public String reply;
    public TripTokens tokens;

    public ChatResponse(String reply) {
        this.reply = reply;
    }

    public ChatResponse(String reply, TripTokens tokens) {
        this.reply = reply;
        this.tokens = tokens;
    }
}