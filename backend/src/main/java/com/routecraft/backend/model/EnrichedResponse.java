package com.routecraft.backend.model;

public record EnrichedResponse(
    TripTokens tokens,
    String userReply
) {}
