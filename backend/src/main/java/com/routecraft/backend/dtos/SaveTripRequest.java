package com.routecraft.backend.dtos;

import com.routecraft.backend.model.TripResponse;
import com.routecraft.backend.model.TripTokens;

public record SaveTripRequest(
    String userId,
    TripTokens tokens,
    TripResponse response
) {}
