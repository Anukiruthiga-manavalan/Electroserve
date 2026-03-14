package com.electroserve.controller;

import com.electroserve.dto.ServiceRequestDto;
import com.electroserve.entity.ServiceRequest;
import com.electroserve.service.ServiceRequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/service-requests")
public class ServiceRequestController {

    private final ServiceRequestService serviceRequestService;

    public ServiceRequestController(ServiceRequestService serviceRequestService) {
        this.serviceRequestService = serviceRequestService;
    }

    @PostMapping
    public ResponseEntity<ServiceRequest> createRequest(
            Authentication auth, @RequestBody ServiceRequestDto dto) {
        ServiceRequest request = serviceRequestService.createRequest(auth.getName(), dto);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{id}/assign")
    public ResponseEntity<ServiceRequest> assignElectrician(
            @PathVariable Long id, @RequestBody Map<String, Long> body) {
        ServiceRequest request = serviceRequestService.assignElectrician(id, body.get("electricianId"));
        return ResponseEntity.ok(request);
    }

    @GetMapping("/{id}/status")
    public ResponseEntity<Map<String, String>> getStatus(@PathVariable Long id) {
        ServiceRequest request = serviceRequestService.getRequestById(id);
        return ResponseEntity.ok(Map.of("status", request.getServiceStatus()));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<ServiceRequest> updateStatus(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        ServiceRequest request = serviceRequestService.updateStatus(id, body.get("status"));
        return ResponseEntity.ok(request);
    }

    @GetMapping("/history")
    public ResponseEntity<List<ServiceRequest>> getHistory(Authentication auth) {
        List<ServiceRequest> requests = serviceRequestService.getCustomerHistoryByEmail(auth.getName());
        return ResponseEntity.ok(requests);
    }
}
