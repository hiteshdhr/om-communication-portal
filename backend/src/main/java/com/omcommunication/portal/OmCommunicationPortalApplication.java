package com.omcommunication.portal;

import com.omcommunication.portal.model.User;
import com.omcommunication.portal.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class OmCommunicationPortalApplication {

    private static final Logger log = LoggerFactory.getLogger(OmCommunicationPortalApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(OmCommunicationPortalApplication.class, args);
    }

    /**
     * Admin user bootstrap logic (runs on every startup).
     *
     * ADMIN_INITIAL_PASSWORD is REQUIRED (no hardcoded fallback). If it is unset,
     * property resolution fails and the application does not start (fail-fast).
     *
     *   - No admin in DB  → create 'admin' with the configured password.
     *   - Admin exists    → if the stored BCrypt hash no longer matches the
     *                       configured password, re-sync it (supports rotating
     *                       the password via the Railway env var).
     *
     * Security guarantees:
     *   - The password is never logged.
     *   - No hardcoded password fallback exists.
     *   - BCrypt match is used to detect mismatches, never plaintext comparison.
     */
    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                @Value("${admin.initial-password}") String rawInitialPassword) {
        return args -> {
            // Strip surrounding quotes that some env systems inject
            String configuredPassword = rawInitialPassword != null
                    ? rawInitialPassword.trim().replaceAll("^\"|\"$", "")
                    : null;

            if (configuredPassword == null || configuredPassword.isBlank()) {
                throw new IllegalStateException(
                        "ADMIN_INITIAL_PASSWORD must be configured — refusing to start without an admin password.");
            }

            var existingAdmin = userRepository.findByUsername("admin");

            if (existingAdmin.isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@omcommunication.com");
                admin.setRole("ROLE_ADMIN");
                admin.setPassword(passwordEncoder.encode(configuredPassword));
                userRepository.save(admin);
                log.info("[AdminSeed] Initial admin user created with username 'admin'.");
            } else {
                User admin = existingAdmin.get();
                if (!passwordEncoder.matches(configuredPassword, admin.getPassword())) {
                    admin.setPassword(passwordEncoder.encode(configuredPassword));
                    userRepository.save(admin);
                    log.info("[AdminSeed] Admin password re-synced to current ADMIN_INITIAL_PASSWORD.");
                } else {
                    log.info("[AdminSeed] Admin exists; password already in sync with ADMIN_INITIAL_PASSWORD.");
                }
            }
        };
    }
}
