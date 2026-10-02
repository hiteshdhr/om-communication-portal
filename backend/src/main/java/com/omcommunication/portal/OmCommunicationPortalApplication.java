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
     * Seeds an initial admin user on startup ONLY if none exists in database.
     * Preserves existing admin password on subsequent application restarts.
     * Password is provided via ADMIN_INITIAL_PASSWORD environment variable in production.
     */
    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                @Value("${admin.initial-password:Admin@OCW2026!}") String rawInitialPassword) {
        return args -> {
            String initialPassword = rawInitialPassword != null ? rawInitialPassword.trim().replaceAll("^\"|\"$", "") : "Admin@OCW2026!";
            if (userRepository.findByUsername("admin").isEmpty()) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setEmail("admin@omcommunication.com");
                admin.setRole("ROLE_ADMIN");
                admin.setPassword(passwordEncoder.encode(initialPassword));
                userRepository.save(admin);
                log.info("Initial admin user created successfully with username 'admin'.");
            } else {
                log.info("Admin user 'admin' already exists in database. Preserving existing account.");
            }
        };
    }
}
