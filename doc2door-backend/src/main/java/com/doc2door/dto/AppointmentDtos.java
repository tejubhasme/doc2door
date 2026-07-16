package com.doc2door.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public class AppointmentDtos {
    public static class BookRequest {
        @NotNull public Long doctorId;
        @NotNull @Future public LocalDateTime appointmentDate;
        @NotBlank public String patientAddress;
    }

    public static class StatusUpdateRequest {
        @NotBlank public String action; // ACCEPT, REJECT, CANCEL, COMPLETE
    }
}


