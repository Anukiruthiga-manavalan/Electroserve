package com.electroserve.dto;

public class ServiceRequestDto {
    private Long electricianId;
    private String serviceType;
    private String problemDescription;
    private String address;
    private String phone;
    private String customerName;
    private String timeSlot;

    public Long getElectricianId() { return electricianId; }
    public void setElectricianId(Long electricianId) { this.electricianId = electricianId; }
    public String getServiceType() { return serviceType; }
    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
    public String getProblemDescription() { return problemDescription; }
    public void setProblemDescription(String problemDescription) { this.problemDescription = problemDescription; }
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
    public String getTimeSlot() { return timeSlot; }
    public void setTimeSlot(String timeSlot) { this.timeSlot = timeSlot; }
}
