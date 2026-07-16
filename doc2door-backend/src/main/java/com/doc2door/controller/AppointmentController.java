package com.doc2door.controller;

import com.doc2door.dto.AppointmentDtos;
import com.doc2door.model.Appointment;
import com.doc2door.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    // Patient: book
    @PostMapping("/book")
    public ResponseEntity<Appointment> book(Authentication auth, @Valid @RequestBody AppointmentDtos.BookRequest req) {
        return ResponseEntity.ok(appointmentService.book(extractId(auth), req));
    }

    // Patient: list personal
    @GetMapping("/me")
    public ResponseEntity<List<Appointment>> myAppointments(Authentication auth) {
        return ResponseEntity.ok(appointmentService.getForPatient(extractId(auth)));
    }

    // Doctor: list incoming
    @GetMapping("/doctor/me")
    public ResponseEntity<List<Appointment>> doctorAppointments(Authentication auth) {
        return ResponseEntity.ok(appointmentService.getForDoctor(extractId(auth)));
    }

    // Doctor: update status
    @PostMapping("/{id}/doctor-action")
    public ResponseEntity<Appointment> doctorAction(Authentication auth, @PathVariable Long id, @Valid @RequestBody AppointmentDtos.StatusUpdateRequest req) {
        return ResponseEntity.ok(appointmentService.updateStatusAsDoctor(extractId(auth), id, req.action));
    }

    // Patient: cancel
    @PostMapping("/{id}/cancel")
    public ResponseEntity<Appointment> cancel(Authentication auth, @PathVariable Long id) {
        return ResponseEntity.ok(appointmentService.cancelAsPatient(extractId(auth), id));
    }

    private Long extractId(Authentication auth) { return Long.parseLong(auth.getName()); }
}


