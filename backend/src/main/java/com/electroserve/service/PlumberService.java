package com.electroserve.service;

import com.electroserve.entity.Plumber;
import com.electroserve.repository.PlumberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlumberService {

    private final PlumberRepository plumberRepository;

    public PlumberService(PlumberRepository plumberRepository) {
        this.plumberRepository = plumberRepository;
    }

    public List<Plumber> getAllPlumbers() {
        return plumberRepository.findAll();
    }

    public Plumber getPlumberById(Long id) {
        return plumberRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plumber not found"));
    }

    public Plumber updateAvailability(Long id, String status) {
        Plumber plumber = getPlumberById(id);
        plumber.setAvailabilityStatus(status);
        return plumberRepository.save(plumber);
    }

    public List<Plumber> searchPlumbers(String query) {
        if (query == null || query.isBlank()) {
            return getAllPlumbers();
        }
        List<Plumber> results = plumberRepository.findBySpecializationContainingIgnoreCase(query);
        if (results.isEmpty()) {
            results = plumberRepository.findByLocationContainingIgnoreCase(query);
        }
        return results;
    }
}
