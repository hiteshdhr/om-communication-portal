package com.omcommunication.portal.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    // Exact trusted frontend origin — set via FRONTEND_ORIGIN env var in Railway
    // Example: https://ocwportal.pages.dev
    @Value("${app.frontend-origin:http://localhost:5173}")
    private String frontendOrigin;

    // True only when the H2 web console is actually enabled (local/dev h2 profile).
    // In the postgres/production profile this is false, so the console is never
    // exposed in the security chain.
    @Value("${spring.h2.console.enabled:false}")
    private boolean h2ConsoleEnabled;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // Return 401 (not 403) for unauthenticated access to protected routes,
            // so the frontend reacts consistently to "not logged in".
            .exceptionHandling(ex -> ex.authenticationEntryPoint(restAuthEntryPoint()))
            .authorizeHttpRequests(auth -> {
                auth
                    // Public routes
                    .requestMatchers("/api/v1/public/**").permitAll()
                    .requestMatchers("/api/public/**").permitAll()
                    .requestMatchers("/api/auth/login").permitAll()
                    .requestMatchers("/api/auth/register").hasAuthority("ROLE_ADMIN");
                // H2 console is permitted ONLY when the console is actually enabled
                // (local/dev h2 profile). In the postgres/production profile this
                // rule is never registered, so /h2-console is unreachable.
                if (h2ConsoleEnabled) {
                    auth.requestMatchers("/h2-console/**").permitAll();
                }
                auth
                    // Admin routes require ROLE_ADMIN
                    .requestMatchers("/api/v1/admin/**").hasAuthority("ROLE_ADMIN")
                    .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                    .anyRequest().authenticated();
            })
            .headers(headers -> {
                // Clickjacking: DENY framing everywhere; the H2 console (dev only)
                // needs same-origin framing to render, so relax just for it.
                if (h2ConsoleEnabled) {
                    headers.frameOptions(frame -> frame.sameOrigin());
                } else {
                    headers.frameOptions(frame -> frame.deny());
                }
                headers
                    // HTTP Strict Transport Security — enforce HTTPS for 1 year, include subdomains
                    .httpStrictTransportSecurity(hsts -> hsts
                        .includeSubDomains(true)
                        .maxAgeInSeconds(31536000)
                        .preload(false)
                    )
                    // Prevent MIME sniffing
                    .contentTypeOptions(contentType -> {})
                    // Content Security Policy
                    .contentSecurityPolicy(csp -> csp.policyDirectives(
                        "default-src 'self'; " +
                        "script-src 'self' 'unsafe-inline' https://checkout.razorpay.com; " +
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                        "font-src 'self' https://fonts.gstatic.com; " +
                        "img-src 'self' data: https:; " +
                        "connect-src 'self' https://api.razorpay.com; " +
                        "frame-src https://api.razorpay.com; " +
                        "object-src 'none'; " +
                        "base-uri 'self'"
                    ))
                    // Referrer Policy
                    .referrerPolicy(referrer -> referrer
                        .policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN)
                    );
            })
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    /** Returns a clean 401 JSON body for unauthenticated requests (no stack traces). */
    private AuthenticationEntryPoint restAuthEntryPoint() {
        return (request, response, authException) -> {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write(
                "{\"status\":401,\"error\":\"Unauthorized\",\"message\":\"Authentication required.\"}");
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Exact trusted origins only — NO wildcard *.pages.dev / *.workers.dev
        // (those are shared, attacker-registerable hosts and must not be trusted
        // with credentials). The production Cloudflare origin is pinned explicitly;
        // any additional origin is supplied via the FRONTEND_ORIGIN env var.
        config.setAllowedOrigins(List.of(
            "http://localhost:5173",
            "http://localhost:5174",
            "http://localhost:3000",
            "https://om-communication-portal.hiteshdheer155.workers.dev",
            "https://omcommunicationworks.com",
            "https://www.omcommunicationworks.com",
            frontendOrigin
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
