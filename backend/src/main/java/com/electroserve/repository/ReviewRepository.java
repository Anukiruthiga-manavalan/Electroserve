package com.electroserve.repository;

import com.electroserve.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByElectricianElectricianIdOrderByReviewDateDesc(Long electricianId);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.electrician.electricianId = ?1")
    Double findAverageRatingByElectricianId(Long electricianId);
}
