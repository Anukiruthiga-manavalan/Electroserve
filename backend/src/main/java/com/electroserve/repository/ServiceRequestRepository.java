package com.electroserve.repository;

import com.electroserve.entity.ServiceRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ServiceRequestRepository extends JpaRepository<ServiceRequest, Long> {
    List<ServiceRequest> findByCustomerCustomerIdOrderByRequestDateDesc(Long customerId);
    List<ServiceRequest> findByElectricianElectricianIdOrderByRequestDateDesc(Long electricianId);
    List<ServiceRequest> findByServiceStatus(String status);
}
