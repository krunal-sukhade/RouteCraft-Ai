package com.routecraft.backend.repositories;

import com.routecraft.backend.model.SavedTrip;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface SavedTripRepository extends MongoRepository<SavedTrip, String> {
    List<SavedTrip> findByUserId(String userId);
}
