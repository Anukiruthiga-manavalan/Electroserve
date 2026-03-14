package com.electroserve.service;

import com.electroserve.dto.ServiceRequestDto;
import com.electroserve.entity.Customer;
import com.electroserve.entity.Electrician;
import com.electroserve.entity.ServiceRequest;
import com.electroserve.repository.CustomerRepository;
import com.electroserve.repository.ElectricianRepository;
import com.electroserve.repository.ServiceRequestRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ServiceRequestService {

    private final ServiceRequestRepository serviceRequestRepository;
    private final CustomerRepository customerRepository;
    private final ElectricianRepository electricianRepository;

    public ServiceRequestService(ServiceRequestRepository serviceRequestRepository, CustomerRepository customerRepository, ElectricianRepository electricianRepository) {
        this.serviceRequestRepository = serviceRequestRepository;
        this.customerRepository = customerRepository;
        this.electricianRepository = electricianRepository;
    }

    public ServiceRequest createRequest(String customerEmail, ServiceRequestDto dto) {
        Customer customer = customerRepository.findByEmail(customerEmail)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        ServiceRequest request = ServiceRequest.builder()
                .customer(customer)
                .serviceType(dto.getServiceType())
                .problemDescription(dto.getProblemDescription())
                .address(dto.getAddress())
                .phone(dto.getPhone())
                .customerName(dto.getCustomerName())
                .timeSlot(dto.getTimeSlot())
                .serviceStatus("Pending")
                .build();

        if (dto.getElectricianId() != null) {
            Electrician electrician = electricianRepository.findById(dto.getElectricianId())
                    .orElseThrow(() -> new RuntimeException("Electrician not found"));
            request.setElectrician(electrician);
            request.setServiceStatus("Assigned");
        }

        return serviceRequestRepository.save(request);
    }

    public ServiceRequest assignElectrician(Long requestId, Long electricianId) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));
        Electrician electrician = electricianRepository.findById(electricianId)
                .orElseThrow(() -> new RuntimeException("Electrician not found"));

        request.setElectrician(electrician);
        request.setServiceStatus("Assigned");
        return serviceRequestRepository.save(request);
    }

    public ServiceRequest updateStatus(Long requestId, String status) {
        ServiceRequest request = serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));
        request.setServiceStatus(status);
        return serviceRequestRepository.save(request);
    }

    public ServiceRequest getRequestById(Long requestId) {
        return serviceRequestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Service request not found"));
    }

    public List<ServiceRequest> getCustomerHistory(Long customerId) {
        return serviceRequestRepository.findByCustomerCustomerIdOrderByRequestDateDesc(customerId);
    }

    public List<ServiceRequest> getCustomerHistoryByEmail(String email) {
        Customer customer = customerRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return serviceRequestRepository.findByCustomerCustomerIdOrderByRequestDateDesc(customer.getCustomerId());
    }
}
