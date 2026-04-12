package com.routecraft.backend.controllers;

import com.routecraft.backend.dtos.SaveTripRequest;
import com.routecraft.backend.model.SavedTrip;
import com.routecraft.backend.model.TripResponse;
import com.routecraft.backend.model.TripTokens;
import com.routecraft.backend.services.TripService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private static final Logger logger = LoggerFactory.getLogger(TripController.class);
    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @PostMapping("/generate")
    public TripResponse generateTrip(@RequestBody TripTokens tokens) {
        logger.info("Received request to generate trip with tokens: {}", tokens);
        TripResponse response = tripService.generateTripItinerary(tokens);
        logger.info("Generated trip itinerary: {}", response.title());
        return response;
    }

    @PostMapping("/save")
    public SavedTrip saveTrip(@RequestBody SaveTripRequest request) {
        logger.info("Received request to save trip for user: {}", request.userId());
        return tripService.saveTrip(request.userId(), request.tokens(), request.response());
    }

    @GetMapping("/saved/{userId}")
    public List<SavedTrip> getSavedTrips(@PathVariable String userId) {
        logger.info("Received request to fetch saved trips for user: {}", userId);
        return tripService.getSavedTrips(userId);
    }
}