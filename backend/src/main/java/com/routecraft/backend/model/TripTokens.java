package com.routecraft.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public record TripTokens(
    String source,
    String destination,
    @JsonProperty("number_of_days") Integer numberOfDays,
    @JsonProperty("number_of_people") Integer numberOfPeople,
    @JsonProperty("start_date") String startDate,
    String budget
) {}
