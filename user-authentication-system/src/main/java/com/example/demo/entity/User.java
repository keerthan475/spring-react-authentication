package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "USERS")
public class User {

    @Id
    @Column(name = "USER_ID")
    private String userId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "DOB")
    private LocalDate dob;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "QUESTION1")
    private String question1;

    @Column(name = "ANSWER1")
    private String answer1;

   
    @Column(name = "QUESTION2")
    private String question2;

    @Column(name = "ANSWER2")
    private String answer2;

    @Column(name = "PASSWORD_CHANGED_DATE")
    private LocalDate passwordChangedDate;

    // Getters and Setters (generate using IDE)
    
     public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getQuestion1() {
        return question1;
    }

    public void setQuestion1(String question1) {
        this.question1 = question1;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getQuestion2() {
        return question2;
    }

    public void setQuestion2(String question2) {
        this.question2 = question2;
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }

    public LocalDate getPasswordChangedDate() {
        return passwordChangedDate;
    }

    public void setPasswordChangedDate(LocalDate passwordChangedDate) {
        this.passwordChangedDate = passwordChangedDate;
    }

}
