package com.electroserve.controller;

import com.electroserve.dto.ReviewDto;
import com.electroserve.entity.Review;
import com.electroserve.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<Review> addReview(
            Authentication auth, @RequestBody ReviewDto dto) {
        Review review = reviewService.addReview(auth.getName(), dto);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/electrician/{id}")
    public ResponseEntity<List<Review>> getElectricianReviews(@PathVariable Long id) {
        return ResponseEntity.ok(reviewService.getElectricianReviews(id));
    }
}
