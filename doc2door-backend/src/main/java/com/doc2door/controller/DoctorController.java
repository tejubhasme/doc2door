package com.doc2door.controller;

import com.doc2door.model.Doctor;
import com.doc2door.repository.DoctorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin
public class DoctorController {
    private final DoctorRepository doctorRepository;

    public DoctorController(DoctorRepository doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    @GetMapping
    public ResponseEntity<List<Doctor>> list(@RequestParam(required = false) String city) {
        if (city == null || city.isBlank()) {
            return ResponseEntity.ok(doctorRepository.findAll());
        }
        return ResponseEntity.ok(doctorRepository.findByCityIgnoreCaseAndAvailableTrue(city));
    }
}


