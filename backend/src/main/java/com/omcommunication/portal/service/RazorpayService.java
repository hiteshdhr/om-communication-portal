package com.omcommunication.portal.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
public class RazorpayService {

    private static final Logger log = LoggerFactory.getLogger(RazorpayService.class);

    @Value("${razorpay.key-id}")
    private String keyId;

    @Value("${razorpay.key-secret}")
    private String keySecret;

    /**
     * Creates a Razorpay order for the given amount (in INR).
     * Returns the Razorpay order ID.
     */
    public String createOrder(BigDecimal amountInRupees) throws RazorpayException {
        RazorpayClient client = new RazorpayClient(keyId, keySecret);

        // Razorpay expects amount in paise (1 INR = 100 paise). Use long to avoid
        // int overflow — int paise wraps above ~₹2.14 crore.
        long amountInPaise = amountInRupees
                .movePointRight(2)
                .setScale(0, RoundingMode.HALF_UP)
                .longValueExact();

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "om_comm_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        try {
            Order order = client.orders.create(orderRequest);
            return order.get("id");
        } catch (RazorpayException e) {
            log.error("Razorpay order creation failed for amount {} INR: {}", amountInRupees, e.getMessage());
            throw e;
        }
    }

    /**
     * Cryptographic verification of Razorpay payment signature using HMAC-SHA256.
     *
     * The payload string for signature verification is:
     *   razorpay_order_id + "|" + razorpay_payment_id
     *
     * Uses constant-time comparison (MessageDigest.isEqual) to prevent timing attacks.
     *
     * @param orderId   Razorpay order ID
     * @param paymentId Razorpay payment ID from client
     * @param signature Razorpay signature from client
     * @return true if signature is authentic
     */
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        // Null-safe: missing fields can never be a valid signature.
        if (orderId == null || paymentId == null || signature == null) {
            return false;
        }
        try {
            String payload = orderId + "|" + paymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmacBytes = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));

            String generatedSignature = HexFormat.of().formatHex(hmacBytes);

            // Constant-time comparison — prevents timing attacks
            return MessageDigest.isEqual(
                    generatedSignature.getBytes(StandardCharsets.UTF_8),
                    signature.getBytes(StandardCharsets.UTF_8)
            );

        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            log.error("HMAC-SHA256 signature verification failed: {}", e.getMessage());
            throw new RuntimeException("Payment signature verification failed", e);
        }
    }
}
