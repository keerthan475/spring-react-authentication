package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.example.demo.exception.InvalidCredentialsException;
import com.example.demo.exception.PasswordExpiredException;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    // Constructor Injection (recommended)
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void registerUser(User user) {

        // 1. Check if user already exists
        if (userRepository.existsByUserId(user.getUserId())) {
            throw new RuntimeException("User ID already exists");
        }
        validatePassword(user.getPassword());

        // 2. Set password changed date
        user.setPasswordChangedDate(LocalDate.now());

        // 3. Save user to DB
        userRepository.save(user);
    }

    public void login(String userId, String password) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new InvalidCredentialsException("Invalid User ID"));

        if (!user.getPassword().equals(password)) {
            throw new InvalidCredentialsException("Invalid Password");
        }

        long daysBetween = ChronoUnit.DAYS.between(
                user.getPasswordChangedDate(),
                LocalDate.now()
        );

        if (daysBetween > 30) {
            throw new PasswordExpiredException("Password expired. Please change password.");
        }
    }

    public String validateAnswersAndGetPassword(String userId, String answer1, String answer2) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getAnswer1().equalsIgnoreCase(answer1)
                && user.getAnswer2().equalsIgnoreCase(answer2)) {

            return user.getPassword(); // SHOW PASSWORD
        }

        throw new RuntimeException("Security answers do not match");
    }

    public void changePassword(
            String userId,
            String oldPassword,
            String newPassword,
            String confirmPassword) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 1. Check old password
        if (!user.getPassword().equals(oldPassword)) {
            throw new RuntimeException("Old password is incorrect");
        }

        // 2. New password should not be same as old
        if (oldPassword.equals(newPassword)) {
            throw new RuntimeException("New password cannot be same as old password");
        }
        validatePassword(newPassword);
        // 3. Confirm password match
        if (!newPassword.equals(confirmPassword)) {
            throw new RuntimeException("New password and confirm password do not match");
        }

        // 4. Update password & date
        user.setPassword(newPassword);
        user.setPasswordChangedDate(LocalDate.now());

        userRepository.save(user);
    }

    public Map<String, String> getSecurityQuestions(String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<String, String> questions = new HashMap<>();
        questions.put("question1", user.getQuestion1());
        questions.put("question2", user.getQuestion2());

        return questions;
    }

    private void validatePassword(String password) {
        if (password.length() < 8 ||
            !password.matches(".*[A-Za-z].*") ||
            !password.matches(".*[0-9].*") ||
            !password.matches(".*[!@#$%^&*(),.?\":{}|<>].*") ||
            password.contains(" ")) {

            throw new RuntimeException(
                "Password must be at least 8 characters and include letters, numbers, and special characters"
            );
        }
    }



}
