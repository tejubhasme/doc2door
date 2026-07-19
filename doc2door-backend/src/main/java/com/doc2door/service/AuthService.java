package com.doc2door.service;

import com.doc2door.dto.AuthDtos;
import com.doc2door.model.Doctor;
import com.doc2door.model.Patient;
import com.doc2door.repository.DoctorRepository;
import com.doc2door.repository.PatientRepository;
import com.doc2door.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
        if (patientRepository.findByEmail(req.email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }
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
        if (doctorRepository.findByEmail(req.email).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
        }
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
            Patient p = patientRepository.findByEmail(req.email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
            if (!passwordEncoder.matches(req.password, p.getPassword())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
            String token = jwtUtil.generateToken(String.valueOf(p.getPatientId()), Map.of("role", "PATIENT"));
            return new AuthDtos.TokenResponse(token, "PATIENT", p.getPatientId(), p.getName());
        } else if ("DOCTOR".equalsIgnoreCase(req.role)) {
            Doctor d = doctorRepository.findByEmail(req.email).orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));
            if (!passwordEncoder.matches(req.password, d.getPassword())) throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
            String token = jwtUtil.generateToken(String.valueOf(d.getDoctorId()), Map.of("role", "DOCTOR"));
            return new AuthDtos.TokenResponse(token, "DOCTOR", d.getDoctorId(), d.getName());
        }
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role");
    }
}
