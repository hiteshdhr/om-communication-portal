package com.omcommunication.portal.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailNotificationService {

    private static final Logger logger = LoggerFactory.getLogger(EmailNotificationService.class);

    @Async("taskExecutor")
    public void sendLeadAlertEmail(String clientName, String phone, String sector) {
        // MOCK EMAIL SENDER
        logger.info("====================================================");
        logger.info("MOCK EMAIL SENDER - NEW LEAD ALERT");
        logger.info("====================================================");
        logger.info("To: Internal Sales Team (4-5 members)");
        logger.info("Subject: New Quote Request from {} ({})", clientName, sector);
        logger.info("Body: Client Name: {}, Phone: {}, Sector: {}", clientName, phone, sector);
        logger.info("====================================================");
        
        try {
            Thread.sleep(500); // Simulate network delay
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
