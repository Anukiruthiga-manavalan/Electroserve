package com.electroserve.service;

import com.electroserve.dto.ReviewDto;
import com.electroserve.entity.Customer;
import com.electroserve.entity.Electrician;
import com.electroserve.entity.Review;
import com.electroserve.repository.CustomerRepository;
import com.electroserve.repository.ElectricianRepository;
import com.electroserve.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final CustomerRepository customerRepository;
    private final ElectricianRepository electricianRepository;

    public ReviewService(ReviewRepository reviewRepository, CustomerRepository customerRepository, ElectricianRepository electricianRepository) {
        this.reviewRepository = reviewRepository;
        this.customerRepository = customerRepository;
        this.electricianRepository = electricianRepository;
    }

    public Review addReview(String customerEmail, ReviewDto dto) {
        Customer customer = customerRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        Electrician electrician = electricianRepository.findById(dto.getElectricianId())
                .orElseThrow(() -> new RuntimeException("Electrician not found"));

        Review review = Review.builder()
                .customer(customer)
                .electrician(electrician)
                .rating(dto.getRating())
                .comment(dto.getComment())
                .build();

        Review saved = reviewRepository.save(review);

        // Update electrician's average rating
        Double avgRating = reviewRepository.findAverageRatingByElectricianId(electrician.getElectricianId());
        if (avgRating != null) {
            electrician.setRating(Math.round(avgRating * 10.0) / 10.0);
            electricianRepository.save(electrician);
        }

        return saved;
    }

    public List<Review> getElectricianReviews(Long electricianId) {
        return reviewRepository.findByElectricianElectricianIdOrderByReviewDateDesc(electricianId);
    }
}
