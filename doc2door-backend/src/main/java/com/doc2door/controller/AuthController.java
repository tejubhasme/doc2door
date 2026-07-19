package com.doc2door.controller;

import com.doc2door.dto.AuthDtos;
import com.doc2door.model.Doctor;
import com.doc2door.model.Patient;
import com.doc2door.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/patient/signup")
    public ResponseEntity<Patient> signupPatient(@Valid @RequestBody AuthDtos.PatientSignupRequest req) {
        return ResponseEntity.ok(authService.signupPatient(req));
    }

    @PostMapping("/doctor/signup")
    public ResponseEntity<Doctor> signupDoctor(@Valid @RequestBody AuthDtos.DoctorSignupRequest req) {
        return ResponseEntity.ok(authService.signupDoctor(req));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.TokenResponse> login(@Valid @RequestBody AuthDtos.LoginRequest req) {
        return ResponseEntity.ok(authService.login(req));
    }
}
