package com.electroserve.controller;

import com.electroserve.entity.Customer;
import com.electroserve.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping("/profile")
    public ResponseEntity<Customer> getProfile(Authentication auth) {
        Customer customer = customerService.getProfileByEmail(auth.getName());
        customer.setPassword(null); // Don't expose password
        return ResponseEntity.ok(customer);
    }

    @PutMapping("/profile")
    public ResponseEntity<Customer> updateProfile(Authentication auth, @RequestBody Customer data) {
        Customer customer = customerService.updateProfile(auth.getName(), data);
        customer.setPassword(null);
        return ResponseEntity.ok(customer);
    }
}
