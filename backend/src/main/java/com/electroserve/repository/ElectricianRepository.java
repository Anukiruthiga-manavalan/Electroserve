package com.electroserve.repository;

import com.electroserve.entity.Electrician;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ElectricianRepository extends JpaRepository<Electrician, Long> {
    Optional<Electrician> findByEmail(String email);
    boolean existsByEmail(String email);
    List<Electrician> findByAvailabilityStatus(String status);
    List<Electrician> findBySpecializationContainingIgnoreCase(String specialization);
    List<Electrician> findByLocationContainingIgnoreCase(String location);
}
