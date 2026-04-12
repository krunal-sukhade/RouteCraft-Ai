package com.routecraft.backend.model;

import java.util.List;

public record TripResponse(
    String title,
    String description,
    List<DayPlan> itinerary,
    List<String> budgetTips
) {
    public record DayPlan(
        int day,
        String theme,
        String dayDescription,
        Activity morning,
        Activity afternoon,
        Activity evening,
        String stay
    ) {}

    public record Activity(
        String title,
        String description
    ) {}
}
