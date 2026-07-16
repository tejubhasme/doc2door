package com.doc2door.service;

import com.doc2door.dto.AppointmentDtos;
import com.doc2door.model.*;
import com.doc2door.repository.AppointmentRepository;
import com.doc2door.repository.DoctorRepository;
import com.doc2door.repository.PatientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;

    public AppointmentService(AppointmentRepository appointmentRepository, PatientRepository patientRepository, DoctorRepository doctorRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    public Appointment book(Long patientId, AppointmentDtos.BookRequest req) {
        Patient p = patientRepository.findById(patientId).orElseThrow();
        Doctor d = doctorRepository.findById(req.doctorId).orElseThrow();
        Appointment a = new Appointment();
        a.setPatient(p);
        a.setDoctor(d);
        a.setAppointmentDate(req.appointmentDate);
        a.setPatientAddress(req.patientAddress);
        a.setStatus(AppointmentStatus.PENDING);
        return appointmentRepository.save(a);
    }

    public List<Appointment> getForPatient(Long patientId) {
        Patient p = patientRepository.findById(patientId).orElseThrow();
        return appointmentRepository.findByPatientOrderByAppointmentDateDesc(p);
    }

    public List<Appointment> getForDoctor(Long doctorId) {
        Doctor d = doctorRepository.findById(doctorId).orElseThrow();
        return appointmentRepository.findByDoctorOrderByAppointmentDateAsc(d);
    }

    public Appointment updateStatusAsDoctor(Long doctorId, Long appointmentId, String action) {
        Appointment a = appointmentRepository.findById(appointmentId).orElseThrow();
        if (!a.getDoctor().getDoctorId().equals(doctorId)) throw new RuntimeException("Forbidden");
        switch (action.toUpperCase()) {
            case "ACCEPT" -> a.setStatus(AppointmentStatus.ACCEPTED);
            case "REJECT" -> a.setStatus(AppointmentStatus.REJECTED);
            case "CANCEL" -> a.setStatus(AppointmentStatus.CANCELLED);
            case "COMPLETE" -> a.setStatus(AppointmentStatus.COMPLETED);
            default -> throw new RuntimeException("Invalid action");
        }
        return appointmentRepository.save(a);
    }

    public Appointment cancelAsPatient(Long patientId, Long appointmentId) {
        Appointment a = appointmentRepository.findById(appointmentId).orElseThrow();
        if (!a.getPatient().getPatientId().equals(patientId)) throw new RuntimeException("Forbidden");
        if (a.getStatus() == AppointmentStatus.PENDING || a.getStatus() == AppointmentStatus.ACCEPTED) {
            a.setStatus(AppointmentStatus.CANCELLED);
        } else {
            throw new RuntimeException("Cannot cancel in current status");
        }
        return appointmentRepository.save(a);
    }
}


