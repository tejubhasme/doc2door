package com.doc2door.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class AuthDtos {
    public static class LoginRequest {
        @Email
        @NotBlank
        public String email;
        @NotBlank
        public String password;
        @NotBlank
        public String role; // PATIENT or DOCTOR
    }

    public static class TokenResponse {
        public String token;
        public String role;
        public Long id;
        public String name;
        public TokenResponse(String token, String role, Long id, String name) {
            this.token = token; this.role = role; this.id = id; this.name = name;
        }
    }

    public static class PatientSignupRequest {
        @NotBlank public String name;
        @Email @NotBlank public String email;
        @NotBlank public String password;
        @NotBlank public String phone;
        @NotBlank public String address;
        @NotBlank public String city;
    }

    public static class DoctorSignupRequest {
        @NotBlank public String name;
        @Email @NotBlank public String email;
        @NotBlank public String password;
        @NotBlank public String phone;
        @NotBlank public String specialization;
        @NotNull public Double fees;
        @NotNull public Integer experienceYears;
        @NotBlank public String city;
    }

    public static class ProfileResponse {
        public Long id;
        public String name;
        public String email;
        public String role;
        public String phone;
        public ProfileResponse(Long id, String name, String email, String role, String phone) {
            this.id = id; this.name = name; this.email = email; this.role = role; this.phone = phone;
        }
    }
}
