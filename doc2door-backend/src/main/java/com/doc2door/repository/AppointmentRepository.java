package com.doc2door.repository;

import com.doc2door.model.Appointment;
import com.doc2door.model.Doctor;
import com.doc2door.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientOrderByAppointmentDateDesc(Patient patient);
    List<Appointment> findByDoctorOrderByAppointmentDateAsc(Doctor doctor);
}


