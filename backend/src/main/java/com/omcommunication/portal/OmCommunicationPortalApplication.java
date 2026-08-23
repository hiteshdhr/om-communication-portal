package com.omcommunication.portal;

import com.omcommunication.portal.model.User;
import com.omcommunication.portal.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class OmCommunicationPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(OmCommunicationPortalApplication.class, args);
    }

    /**
     * Seeds an initial admin user on startup if none exists in database.
     * Password is provided via ADMIN_INITIAL_PASSWORD environment variable or config property.
     */
    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                @Value("${ADMIN_INITIAL_PASSWORD:${admin.initial-password:admin123}}") String initialPassword) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User();
                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode(initialPassword));
                admin.setEmail("admin@omcommunication.com");
                admin.setRole("ROLE_ADMIN");
                userRepository.save(admin);
                System.out.println("✅ Initial admin user created: username 'admin'");
            } else {
                System.out.println("ℹ️  Admin user already exists, skipping seed.");
            }
        };
    }
}
