package com.mingxing.backend.controller;

import com.mingxing.backend.dto.InquiryRequest;
import com.mingxing.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inquiry")
@CrossOrigin(origins = "http://localhost:5173") // Allow requests from Frontend
public class InquiryController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public ResponseEntity<String> submitInquiry(@RequestBody InquiryRequest request) {
        try {
            emailService.sendInquiryEmails(request);
            return ResponseEntity.ok("Inquiry sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to send inquiry: " + e.getMessage());
        }
    }
}
