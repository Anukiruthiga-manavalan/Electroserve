package com.electroserve.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "plumbers")
public class Plumber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long plumberId;

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

    public Plumber() {}

    // Getters and Setters
    public Long getPlumberId() { return plumberId; }
    public void setPlumberId(Long plumberId) { this.plumberId = plumberId; }
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
