package com.doc2door.service;

import com.doc2door.dto.AuthDtos;
import com.doc2door.model.Doctor;
import com.doc2door.model.Patient;
import com.doc2door.repository.DoctorRepository;
import com.doc2door.repository.PatientRepository;
import com.doc2door.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class AuthService {
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(PatientRepository patientRepository, DoctorRepository doctorRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public Patient signupPatient(AuthDtos.PatientSignupRequest req) {
        Patient p = new Patient();
        p.setName(req.name);
        p.setEmail(req.email);
        p.setPassword(passwordEncoder.encode(req.password));
        p.setPhone(req.phone);
        p.setAddress(req.address);
        p.setCity(req.city);
        return patientRepository.save(p);
    }

    public Doctor signupDoctor(AuthDtos.DoctorSignupRequest req) {
        Doctor d = new Doctor();
        d.setName(req.name);
        d.setEmail(req.email);
        d.setPassword(passwordEncoder.encode(req.password));
        d.setPhone(req.phone);
        d.setSpecialization(req.specialization);
        d.setFees(req.fees);
        d.setExperienceYears(req.experienceYears);
        d.setCity(req.city);
        d.setAvailable(true);
        return doctorRepository.save(d);
    }

    public AuthDtos.TokenResponse login(AuthDtos.LoginRequest req) {
        if ("PATIENT".equalsIgnoreCase(req.role)) {
            Patient p = patientRepository.findByEmail(req.email).orElseThrow(() -> new RuntimeException("Invalid credentials"));
            if (!passwordEncoder.matches(req.password, p.getPassword())) throw new RuntimeException("Invalid credentials");
            String token = jwtUtil.generateToken(String.valueOf(p.getPatientId()), Map.of("role", "PATIENT"));
            return new AuthDtos.TokenResponse(token, "PATIENT", p.getPatientId(), p.getName());
        } else if ("DOCTOR".equalsIgnoreCase(req.role)) {
            Doctor d = doctorRepository.findByEmail(req.email).orElseThrow(() -> new RuntimeException("Invalid credentials"));
            if (!passwordEncoder.matches(req.password, d.getPassword())) throw new RuntimeException("Invalid credentials");
            String token = jwtUtil.generateToken(String.valueOf(d.getDoctorId()), Map.of("role", "DOCTOR"));
            return new AuthDtos.TokenResponse(token, "DOCTOR", d.getDoctorId(), d.getName());
        }
        throw new RuntimeException("Invalid role");
    }
}


