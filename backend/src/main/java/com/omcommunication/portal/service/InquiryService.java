package com.omcommunication.portal.service;

import com.omcommunication.portal.model.Inquiry;
import com.omcommunication.portal.repository.InquiryRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class InquiryService {

    private final InquiryRepository inquiryRepository;

    public InquiryService(InquiryRepository inquiryRepository) {
        this.inquiryRepository = inquiryRepository;
    }

    public Inquiry submitInquiry(Inquiry inquiry) {
        inquiry.setStatus(Inquiry.Status.NEW);
        return inquiryRepository.save(inquiry);
    }

    public List<Inquiry> getAllInquiries() {
        return inquiryRepository.findAll(Sort.by(Sort.Direction.DESC, "createdAt"));
    }

    public Inquiry updateStatus(UUID id, Inquiry.Status newStatus) {
        Inquiry inquiry = inquiryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inquiry not found: " + id));
        inquiry.setStatus(newStatus);
        return inquiryRepository.save(inquiry);
    }

    public long countByStatus(Inquiry.Status status) {
        return inquiryRepository.findAll().stream()
                .filter(i -> i.getStatus() == status)
                .count();
    }

    public long countTotal() {
        return inquiryRepository.count();
    }

    public void deleteInquiry(UUID id) {
        if (!inquiryRepository.existsById(id)) {
            throw new RuntimeException("Inquiry not found: " + id);
        }
        inquiryRepository.deleteById(id);
    }
}
