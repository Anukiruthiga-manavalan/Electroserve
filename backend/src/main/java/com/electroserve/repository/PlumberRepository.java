package com.electroserve.repository;

import com.electroserve.entity.Plumber;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface PlumberRepository extends JpaRepository<Plumber, Long> {
    Optional<Plumber> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Plumber> findByAvailabilityStatus(String status);
    List<Plumber> findBySpecializationContainingIgnoreCase(String specialization);
    List<Plumber> findByLocationContainingIgnoreCase(String location);
}
