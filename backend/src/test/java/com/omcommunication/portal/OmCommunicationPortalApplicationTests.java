package com.omcommunication.portal;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@ActiveProfiles("h2")
@TestPropertySource(properties = {
    "JWT_SECRET=test-secret-key-that-is-long-enough-for-hmac-sha256-minimum-256-bits",
    "RAZORPAY_KEY_ID=rzp_test_dummy",
    "RAZORPAY_KEY_SECRET=test_dummy_secret",
    "ADMIN_INITIAL_PASSWORD=test_admin_password"
})
class OmCommunicationPortalApplicationTests {

    @Test
    void contextLoads() {
    }
}