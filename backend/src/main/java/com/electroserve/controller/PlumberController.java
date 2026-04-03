package com.electroserve.controller;

import com.electroserve.entity.Plumber;
import com.electroserve.service.PlumberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plumbers")
public class PlumberController {

    private final PlumberService plumberService;

    public PlumberController(PlumberService plumberService) {
        this.plumberService = plumberService;
    }

    @GetMapping
    public ResponseEntity<List<Plumber>> getAllPlumbers(
            @RequestParam(required = false) String search) {
        List<Plumber> plumbers;
        if (search != null && !search.isBlank()) {
            plumbers = plumberService.searchPlumbers(search);
        } else {
            plumbers = plumberService.getAllPlumbers();
        }
        plumbers.forEach(p -> p.setPassword(null));
        return ResponseEntity.ok(plumbers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plumber> getPlumberById(@PathVariable Long id) {
        Plumber plumber = plumberService.getPlumberById(id);
        plumber.setPassword(null);
        return ResponseEntity.ok(plumber);
    }
}
