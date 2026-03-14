package com.electroserve.service;

import com.electroserve.config.JwtUtil;
import com.electroserve.dto.AuthRequest;
import com.electroserve.dto.AuthResponse;
import com.electroserve.dto.RegisterRequest;
import com.electroserve.entity.Customer;
import com.electroserve.entity.Electrician;
import com.electroserve.repository.CustomerRepository;
import com.electroserve.repository.ElectricianRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final CustomerRepository customerRepository;
    private final ElectricianRepository electricianRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(CustomerRepository customerRepository, ElectricianRepository electricianRepository,
                       PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.customerRepository = customerRepository;
        this.electricianRepository = electricianRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse register(RegisterRequest request) {
        if ("electrician".equalsIgnoreCase(request.getRole())) {
            return registerElectrician(request);
        }
        return registerCustomer(request);
    }

    private AuthResponse registerCustomer(RegisterRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Customer customer = Customer.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .address(request.getAddress())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        customer = customerRepository.save(customer);
        String token = jwtUtil.generateToken(customer.getEmail(), "customer", customer.getCustomerId());

        return AuthResponse.builder()
                .token(token)
                .role("customer")
                .userId(customer.getCustomerId())
                .name(customer.getName())
                .email(customer.getEmail())
                .build();
    }

    private AuthResponse registerElectrician(RegisterRequest request) {
        if (electricianRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        Electrician electrician = Electrician.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .password(passwordEncoder.encode(request.getPassword()))
                .specialization(request.getSpecialization())
                .experienceYears(request.getExperienceYears())
                .location(request.getLocation())
                .bio(request.getBio())
                .certifications(request.getCertifications())
                .servicesOffered(request.getServicesOffered())
                .hourlyRate(request.getHourlyRate())
                .build();

        electrician = electricianRepository.save(electrician);
        String token = jwtUtil.generateToken(electrician.getEmail(), "electrician", electrician.getElectricianId());

        return AuthResponse.builder()
                .token(token)
                .role("electrician")
                .userId(electrician.getElectricianId())
                .name(electrician.getName())
                .email(electrician.getEmail())
                .build();
    }

    public AuthResponse login(AuthRequest request) {
        if ("electrician".equalsIgnoreCase(request.getRole())) {
            Electrician electrician = electricianRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            if (!passwordEncoder.matches(request.getPassword(), electrician.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            String token = jwtUtil.generateToken(electrician.getEmail(), "electrician", electrician.getElectricianId());
            return AuthResponse.builder()
                    .token(token)
                    .role("electrician")
                    .userId(electrician.getElectricianId())
                    .name(electrician.getName())
                    .email(electrician.getEmail())
                    .build();
        }

        Customer customer = customerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), customer.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(customer.getEmail(), "customer", customer.getCustomerId());
        return AuthResponse.builder()
                .token(token)
                .role("customer")
                .userId(customer.getCustomerId())
                .name(customer.getName())
                .email(customer.getEmail())
                .build();
    }
}
