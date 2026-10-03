package com.omcommunication.portal.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    // Separate caches for different rate limit policies
    private final Map<String, Bucket> publicApiCache = new ConcurrentHashMap<>();
    private final Map<String, Bucket> loginCache = new ConcurrentHashMap<>();

    /**
     * Number of trusted reverse proxies between the client and this app.
     * Railway terminates TLS and adds exactly one hop, so the default is 1.
     * Set APP_TRUSTED_PROXY_COUNT to match the real deployment topology.
     */
    @Value("${app.trusted-proxy-count:1}")
    private int trustedProxyCount;

    /**
     * Extract the client IP from X-Forwarded-For in a spoof-resistant way.
     *
     * X-Forwarded-For grows left→right as each proxy APPENDS the address it
     * received the request from, so the right-most entries are the ones added by
     * OUR trusted proxies and the left-most entries are attacker-controllable.
     * We therefore count `trustedProxyCount` hops in from the right rather than
     * blindly trusting the first entry (which a client can forge to rotate past
     * the rate limit). Falls back to getRemoteAddr() when the header is absent.
     */
    private String extractClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isBlank()) {
            String[] parts = xForwardedFor.split(",");
            int idx = parts.length - Math.max(1, trustedProxyCount);
            if (idx < 0) idx = 0;
            String ip = parts[idx].trim();
            if (!ip.isEmpty()) return ip;
        }
        return request.getRemoteAddr();
    }

    /** Public API bucket: 5 requests per minute per IP */
    private Bucket resolvePublicBucket(String ip) {
        return publicApiCache.computeIfAbsent(ip, k -> {
            Refill refill = Refill.intervally(5, Duration.ofMinutes(1));
            Bandwidth limit = Bandwidth.classic(5, refill);
            return Bucket.builder().addLimit(limit).build();
        });
    }

    /** Login bucket: 15 attempts per 15 minutes per IP (brute-force protection) */
    private Bucket resolveLoginBucket(String ip) {
        return loginCache.computeIfAbsent(ip, k -> {
            Refill refill = Refill.intervally(15, Duration.ofMinutes(15));
            Bandwidth limit = Bandwidth.classic(15, refill);
            return Bucket.builder().addLimit(limit).build();
        });
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String uri = request.getRequestURI();
        String method = request.getMethod();

        // Rate-limit login endpoint (brute-force protection)
        boolean isLoginEndpoint = "/api/auth/login".equals(uri) && "POST".equalsIgnoreCase(method);

        // Rate-limit public mutating endpoints
        boolean isPublicMutatingEndpoint =
                (uri.startsWith("/api/public") || uri.startsWith("/api/v1/public"))
                && ("POST".equalsIgnoreCase(method) || "PUT".equalsIgnoreCase(method));

        if (isLoginEndpoint) {
            String ip = extractClientIp(request);
            Bucket bucket = resolveLoginBucket(ip);
            if (bucket.tryConsume(1)) {
                filterChain.doFilter(request, response);
            } else {
                sendRateLimitResponse(response, "Too many login attempts. Please wait 15 minutes before trying again.");
            }
        } else if (isPublicMutatingEndpoint) {
            String ip = extractClientIp(request);
            Bucket bucket = resolvePublicBucket(ip);
            if (bucket.tryConsume(1)) {
                filterChain.doFilter(request, response);
            } else {
                sendRateLimitResponse(response, "Too many requests. Please wait a moment before trying again.");
            }
        } else {
            filterChain.doFilter(request, response);
        }
    }

    private void sendRateLimitResponse(HttpServletResponse response, String message) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"error\": \"" + message + "\"}");
    }
}
