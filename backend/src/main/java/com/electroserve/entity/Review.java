package com.electroserve.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "electrician_id")
    private Electrician electrician;

    private Integer rating;

    @Column(length = 1000)
    private String comment;

    @Column(updatable = false)
    private LocalDateTime reviewDate;

    @PrePersist
    protected void onCreate() {
        this.reviewDate = LocalDateTime.now();
    }

    public Review() {}

    // Builder
    public static ReviewBuilder builder() { return new ReviewBuilder(); }

    public static class ReviewBuilder {
        private final Review r = new Review();
        public ReviewBuilder customer(Customer v) { r.customer = v; return this; }
        public ReviewBuilder electrician(Electrician v) { r.electrician = v; return this; }
        public ReviewBuilder rating(Integer v) { r.rating = v; return this; }
        public ReviewBuilder comment(String v) { r.comment = v; return this; }
        public Review build() { return r; }
    }

    // Getters and Setters
    public Long getReviewId() { return reviewId; }
    public void setReviewId(Long reviewId) { this.reviewId = reviewId; }
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    public Electrician getElectrician() { return electrician; }
    public void setElectrician(Electrician electrician) { this.electrician = electrician; }
    public Integer getRating() { return rating; }
    public void setRating(Integer rating) { this.rating = rating; }
    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
    public LocalDateTime getReviewDate() { return reviewDate; }
    public void setReviewDate(LocalDateTime reviewDate) { this.reviewDate = reviewDate; }
}
