package com.example.demo.controller;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import java.util.Map;
//import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final UserService userService;

    // Constructor Injection
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.ok("User registered successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @GetMapping("/test")
    public String test() {
        return "Auth Controller Working";
    }

    @PostMapping("/login")
    public String login(@RequestBody User user) {
        userService.login(user.getUserId(), user.getPassword());
        return "Login successful";
    }

    @PostMapping("/forgot-password/show")
    public ResponseEntity<?> showPassword(@RequestBody User user) {
        try {
            return ResponseEntity.ok(
                    userService.validateAnswersAndGetPassword(
                            user.getUserId(),
                            user.getAnswer1(),
                            user.getAnswer2()
                    )
            );
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/forgot-password/questions/{userId}")
    public ResponseEntity<?> getSecurityQuestions(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(userService.getSecurityQuestions(userId));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Invalid User ID");
        }
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest req) {
        try {
            userService.changePassword(
                    req.getUserId(),
                    req.getOldPassword(),
                    req.getNewPassword(),
                    req.getConfirmPassword()
            );
            return ResponseEntity.ok("Password changed successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }



}
