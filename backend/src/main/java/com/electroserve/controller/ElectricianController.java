package com.electroserve.controller;

import com.electroserve.entity.Electrician;
import com.electroserve.service.ElectricianService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/electricians")
public class ElectricianController {

    private final ElectricianService electricianService;

    public ElectricianController(ElectricianService electricianService) {
        this.electricianService = electricianService;
    }

    @GetMapping
    public ResponseEntity<List<Electrician>> getAllElectricians(
            @RequestParam(required = false) String search) {
        List<Electrician> electricians;
        if (search != null && !search.isBlank()) {
            electricians = electricianService.searchElectricians(search);
        } else {
            electricians = electricianService.getAllElectricians();
        }
        // Don't expose passwords
        electricians.forEach(e -> e.setPassword(null));
        return ResponseEntity.ok(electricians);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Electrician> getElectricianById(@PathVariable Long id) {
        Electrician electrician = electricianService.getElectricianById(id);
        electrician.setPassword(null);
        return ResponseEntity.ok(electrician);
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<Electrician> updateAvailability(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        Electrician electrician = electricianService.updateAvailability(id, body.get("status"));
        electrician.setPassword(null);
        return ResponseEntity.ok(electrician);
    }
}
