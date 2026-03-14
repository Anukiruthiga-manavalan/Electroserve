package com.electroserve.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_requests")
public class ServiceRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requestId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "electrician_id")
    private Electrician electrician;

    private String serviceType;

    @Column(length = 1000)
    private String problemDescription;

    @Column(updatable = false)
    private LocalDateTime requestDate;

    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'Pending'")
    private String serviceStatus = "Pending";

    private String address;
    private String phone;
    private String customerName;
    private String timeSlot;

    @PrePersist
    protected void onCreate() {
        this.requestDate = LocalDateTime.now();
    }

    public ServiceRequest() {}

    // Builder
    public static ServiceRequestBuilder builder() { return new ServiceRequestBuilder(); }

    public static class ServiceRequestBuilder {
        private final ServiceRequest r = new ServiceRequest();
        public ServiceRequestBuilder customer(Customer v) { r.customer = v; return this; }
        public ServiceRequestBuilder electrician(Electrician v) { r.electrician = v; return this; }
        public ServiceRequestBuilder serviceType(String v) { r.serviceType = v; return this; }
        public ServiceRequestBuilder problemDescription(String v) { r.problemDescription = v; return this; }
        public ServiceRequestBuilder serviceStatus(String v) { r.serviceStatus = v; return this; }
        public ServiceRequestBuilder address(String v) { r.address = v; return this; }
        public ServiceRequestBuilder phone(String v) { r.phone = v; return this; }
        public ServiceRequestBuilder customerName(String v) { r.customerName = v; return this; }
        public ServiceRequestBuilder timeSlot(String v) { r.timeSlot = v; return this; }
        public ServiceRequest build() { return r; }
    }

    // Getters and Setters
    public Long getRequestId() { return requestId; }
    public void setRequestId(Long requestId) { this.requestId = requestId; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public Electrician getElectrician() { return electrician; }
    public void setElectrician(Electrician electrician) { this.electrician = electrician; }
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    public String getProblemDescription() { return problemDescription; }
    public void setProblemDescription(String problemDescription) { this.problemDescription = problemDescription; }
    public LocalDateTime getRequestDate() { return requestDate; }
    public void setRequestDate(LocalDateTime requestDate) { this.requestDate = requestDate; }
    public String getServiceStatus() { return serviceStatus; }
    public void setServiceStatus(String serviceStatus) { this.serviceStatus = serviceStatus; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
}
