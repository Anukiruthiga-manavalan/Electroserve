package com.electroserve.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "electricians")
public class Electrician {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long electricianId;

    private String name;
    private String phone;

    @Column(unique = true)
    private String email;

    private String password;
    private String specialization;
    private Integer experienceYears;
    private String location;

    @Column(columnDefinition = "VARCHAR(20) DEFAULT 'Available'")
    private String availabilityStatus = "Available";

    private Double rating = 0.0;

    @Column(length = 1000)
    private String bio;

    private String photo;

    @Column(length = 500)
    private String certifications;

    @Column(length = 500)
    private String servicesOffered;

    private Double hourlyRate;

    public Electrician() {}

    // Builder
    public static ElectricianBuilder builder() { return new ElectricianBuilder(); }

    public static class ElectricianBuilder {
        private final Electrician e = new Electrician();
        public ElectricianBuilder name(String v) { e.name = v; return this; }
        public ElectricianBuilder phone(String v) { e.phone = v; return this; }
        public ElectricianBuilder email(String v) { e.email = v; return this; }
        public ElectricianBuilder password(String v) { e.password = v; return this; }
        public ElectricianBuilder specialization(String v) { e.specialization = v; return this; }
        public ElectricianBuilder experienceYears(Integer v) { e.experienceYears = v; return this; }
        public ElectricianBuilder location(String v) { e.location = v; return this; }
        public ElectricianBuilder availabilityStatus(String v) { e.availabilityStatus = v; return this; }
        public ElectricianBuilder rating(Double v) { e.rating = v; return this; }
        public ElectricianBuilder bio(String v) { e.bio = v; return this; }
        public ElectricianBuilder photo(String v) { e.photo = v; return this; }
        public ElectricianBuilder certifications(String v) { e.certifications = v; return this; }
        public ElectricianBuilder servicesOffered(String v) { e.servicesOffered = v; return this; }
        public ElectricianBuilder hourlyRate(Double v) { e.hourlyRate = v; return this; }
        public Electrician build() { return e; }
    }

    // Getters and Setters
    public Long getElectricianId() { return electricianId; }
    public void setElectricianId(Long electricianId) { this.electricianId = electricianId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }
    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getAvailabilityStatus() { return availabilityStatus; }
    public void setAvailabilityStatus(String availabilityStatus) { this.availabilityStatus = availabilityStatus; }
    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }
    public String getPhoto() { return photo; }
    public void setPhoto(String photo) { this.photo = photo; }
    public String getCertifications() { return certifications; }
    public void setCertifications(String certifications) { this.certifications = certifications; }
    public String getServicesOffered() { return servicesOffered; }
    public void setServicesOffered(String servicesOffered) { this.servicesOffered = servicesOffered; }
    public Double getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(Double hourlyRate) { this.hourlyRate = hourlyRate; }
}
