package com.omcommunication.portal.service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

@Service
public class RazorpayService {

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

        // Razorpay expects amount in paise (1 INR = 100 paise)
        int amountInPaise = amountInRupees.multiply(BigDecimal.valueOf(100)).intValue();

        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountInPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "om_comm_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = client.orders.create(orderRequest);
        return order.get("id");
    }

    /**
     * Cryptographic verification of Razorpay payment signature using HMAC-SHA256.
     *
     * The payload string for signature verification is:
     *   razorpay_order_id + "|" + razorpay_payment_id
     *
     * @param orderId   Razorpay order ID
     * @param paymentId Razorpay payment ID from client
     * @param signature Razorpay signature from client
     * @return true if signature is authentic
     */
    public boolean verifySignature(String orderId, String paymentId, String signature) {
        try {
            String payload = orderId + "|" + paymentId;
            Mac mac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKeySpec = new SecretKeySpec(
                    keySecret.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            mac.init(secretKeySpec);
            byte[] hmacBytes = mac.doFinal(payload.getBytes(StandardCharsets.UTF_8));

            // Convert to hex string and compare
            String generatedSignature = HexFormat.of().formatHex(hmacBytes);
            return generatedSignature.equalsIgnoreCase(signature);

        } catch (NoSuchAlgorithmException | InvalidKeyException e) {
            throw new RuntimeException("HMAC-SHA256 signature verification failed", e);
        }
    }
}
