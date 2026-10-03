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

    // The built-in default — used ONLY when no env var is provided.
    // We compare against this to know whether an explicit password was configured.
    private static final String DEFAULT_PASSWORD_SENTINEL = "Admin@OCW2026!";

    public static void main(String[] args) {
        SpringApplication.run(OmCommunicationPortalApplication.class, args);
    }

    /**
     * Admin user bootstrap logic (runs on every startup):
     *
     * Case 1 — No admin in DB:
     *   Creates the admin user with the configured ADMIN_INITIAL_PASSWORD.
     *
     * Case 2 — Admin exists, ADMIN_INITIAL_PASSWORD is explicitly set in env (not the default):
     *   If the stored BCrypt hash does NOT match the current env password, the hash is updated.
     *   This safely handles password resets via Railway environment variable changes.
     *   IMPORTANT: This only triggers when ADMIN_INITIAL_PASSWORD differs from the default sentinel.
     *
     * Case 3 — Admin exists, no custom password set (env var absent / equals default):
     *   No change. Existing hash is preserved.
     *
     * Security guarantees:
     *   - Passwords are never logged.
     *   - No hardcoded password fallback is used for updates.
     *   - BCrypt match is used to detect mismatches, not plaintext comparison.
     */
    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                @Value("${admin.initial-password:" + DEFAULT_PASSWORD_SENTINEL + "}") String rawInitialPassword) {
        return args -> {
            // Strip surrounding quotes that some env systems inject
            String configuredPassword = rawInitialPassword != null
                    ? rawInitialPassword.trim().replaceAll("^\"|\"$", "")
                    : DEFAULT_PASSWORD_SENTINEL;

            // Determine whether an explicit (non-default) password was configured via env
            boolean isExplicitlyConfigured = !DEFAULT_PASSWORD_SENTINEL.equals(configuredPassword);

            var existingAdmin = userRepository.findByUsername("admin");

            if (existingAdmin.isEmpty()) {
                // ── Case 1: First-time seed ──────────────────────────────────────────────
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@omcommunication.com");
                admin.setRole("ROLE_ADMIN");
                admin.setPassword(passwordEncoder.encode(configuredPassword));
                userRepository.save(admin);
                log.info("[AdminSeed] Initial admin user created with username 'admin'.");

            } else if (isExplicitlyConfigured) {
                // ── Case 2: Admin exists + explicit env password set → sync if mismatched ──
                User admin = existingAdmin.get();
                if (!passwordEncoder.matches(configuredPassword, admin.getPassword())) {
                    admin.setPassword(passwordEncoder.encode(configuredPassword));
                    userRepository.save(admin);
                    log.info("[AdminSeed] Admin password updated to match current ADMIN_INITIAL_PASSWORD env value.");
                } else {
                    log.info("[AdminSeed] Admin exists and password is already in sync with ADMIN_INITIAL_PASSWORD.");
                }

            } else {
                // ── Case 3: Admin exists, no explicit env password → preserve existing ────
                log.info("[AdminSeed] Admin user 'admin' already exists. No ADMIN_INITIAL_PASSWORD override detected — preserving existing credentials.");
            }
        };
    }
}
