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
     * Password is provided via ADMIN_INITIAL_PASSWORD environment variable in production.
     */
    @Bean
    CommandLineRunner seedAdmin(UserRepository userRepository,
                                PasswordEncoder passwordEncoder,
                                @Value("${admin.initial-password}") String initialPassword) {
        return args -> {
            User admin = userRepository.findByUsername("admin").orElseGet(() -> {
                User u = new User();
                u.setUsername("admin");
                u.setEmail("admin@omcommunication.com");
                u.setRole("ROLE_ADMIN");
                return u;
            });
            admin.setPassword(passwordEncoder.encode(initialPassword));
            userRepository.save(admin);
            System.out.println("✅ Admin user configured: username 'admin', password updated.");
        };
    }
}
