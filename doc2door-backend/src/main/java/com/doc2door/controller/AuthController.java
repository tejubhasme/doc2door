package com.doc2door.controller;

import com.doc2door.dto.AuthDtos;
import com.doc2door.model.Doctor;
import com.doc2door.model.Patient;
import com.doc2door.repository.DoctorRepository;
import com.doc2door.repository.PatientRepository;
import com.doc2door.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AuthController(AuthService authService, PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.authService = authService;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
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

    @GetMapping("/me")
    public ResponseEntity<AuthDtos.ProfileResponse> me(Authentication authentication) {
        Long id = Long.parseLong(authentication.getName());
        boolean isDoctor = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_DOCTOR"));

        if (isDoctor) {
            Doctor d = doctorRepository.findById(id).orElseThrow();
            return ResponseEntity.ok(new AuthDtos.ProfileResponse(d.getDoctorId(), d.getName(), d.getEmail(), "DOCTOR", d.getPhone()));
        } else {
            Patient p = patientRepository.findById(id).orElseThrow();
            return ResponseEntity.ok(new AuthDtos.ProfileResponse(p.getPatientId(), p.getName(), p.getEmail(), "PATIENT", p.getPhone()));
        }
    }
}
