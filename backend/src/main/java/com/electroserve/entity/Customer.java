package com.electroserve.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    private String name;

    @Column(unique = true)
    private String email;

    private String phone;
    private String address;
    private String password;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public Customer() {}

    // Builder pattern
    public static CustomerBuilder builder() { return new CustomerBuilder(); }

    public static class CustomerBuilder {
        private final Customer c = new Customer();
        public CustomerBuilder name(String v) { c.name = v; return this; }
        public CustomerBuilder email(String v) { c.email = v; return this; }
        public CustomerBuilder phone(String v) { c.phone = v; return this; }
        public CustomerBuilder address(String v) { c.address = v; return this; }
        public CustomerBuilder password(String v) { c.password = v; return this; }
        public Customer build() { return c; }
    }

    // Getters and Setters
    public Long getCustomerId() { return customerId; }
    public void setCustomerId(Long customerId) { this.customerId = customerId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
