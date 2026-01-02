package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {

    // Checks if a user already exists (used during registration)
    boolean existsByUserId(String userId);
    Optional<User> findByUserIdAndPassword(String userId, String password);

}
