package com.example.demo.controller;

import com.example.demo.dto.ChangePasswordRequest;
import com.example.demo.entity.User;
import com.example.demo.service.UserService;

import java.util.Map;
//import java.util.HashMap;

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
    public String register(@RequestBody User user) {
        userService.registerUser(user);
        return "User registered successfully";
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
    public String showPassword(@RequestBody User user) {

        return userService.validateAnswersAndGetPassword(
                user.getUserId(),
                user.getAnswer1(),
                user.getAnswer2()
        );
    }

    @GetMapping("/forgot-password/questions/{userId}")
    public Map<String, String> getSecurityQuestions(@PathVariable String userId) {
        return userService.getSecurityQuestions(userId);
    }

    @PostMapping("/change-password")
    public String changePassword(@RequestBody ChangePasswordRequest req) {

        userService.changePassword(
                req.getUserId(),
                req.getOldPassword(),
                req.getNewPassword(),
                req.getConfirmPassword()
        );

        return "Password changed successfully";
    }


}
