package com.routecraft.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "saved_trips")
public record SavedTrip(
    @Id
    String id,
    String userId,
    TripTokens tokens,
    TripResponse response,
    LocalDateTime createdAt
) {
    public SavedTrip(String userId, TripTokens tokens, TripResponse response) {
        this(null, userId, tokens, response, LocalDateTime.now());
    }
}
