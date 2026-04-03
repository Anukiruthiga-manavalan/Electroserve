package com.electroserve.service;

import com.electroserve.entity.Customer;
import com.electroserve.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Customer getProfile(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer getProfileByEmail(String email) {
        return customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    public Customer updateProfile(String email, Customer updatedData) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        if (updatedData.getName() != null) customer.setName(updatedData.getName());
        if (updatedData.getPhone() != null) customer.setPhone(updatedData.getPhone());
        if (updatedData.getAddress() != null) customer.setAddress(updatedData.getAddress());

        return customerRepository.save(customer);
    }
}
