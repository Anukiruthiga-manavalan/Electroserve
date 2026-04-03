package com.electroserve.service;

import com.electroserve.entity.Electrician;
import com.electroserve.repository.ElectricianRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ElectricianService {

    private final ElectricianRepository electricianRepository;

    public ElectricianService(ElectricianRepository electricianRepository) {
        this.electricianRepository = electricianRepository;
    }

    public List<Electrician> getAllElectricians() {
        return electricianRepository.findAll();
    }

    public Electrician getElectricianById(Long id) {
        return electricianRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Electrician not found"));
    }

    public Electrician updateAvailability(Long id, String status) {
        Electrician electrician = getElectricianById(id);
        electrician.setAvailabilityStatus(status);
        return electricianRepository.save(electrician);
    }

    public List<Electrician> searchElectricians(String query) {
        if (query == null || query.isBlank()) {
            return getAllElectricians();
        }
        List<Electrician> results = electricianRepository.findBySpecializationContainingIgnoreCase(query);
        if (results.isEmpty()) {
            results = electricianRepository.findByLocationContainingIgnoreCase(query);
        }
        return results;
    }

    public Electrician getProfileByEmail(String email) {
        return electricianRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Electrician not found"));
    }
}
