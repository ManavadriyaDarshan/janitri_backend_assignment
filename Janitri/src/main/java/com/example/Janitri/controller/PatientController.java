package com.example.Janitri.controller;

import com.example.Janitri.dto.PatientWithHeartRatesDTO;
import com.example.Janitri.entity.Patient;
import com.example.Janitri.entity.HeartRate;
import com.example.Janitri.service.PatientService;
import com.example.Janitri.service.HeartRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private HeartRateService heartRateService;

    // Add a new Patient
    @PostMapping
    public Patient addPatient(@RequestBody Patient patient) {
        // Directly save the patient entity without involving DTOs
        return patientService.addPatient(patient);
    }

    // Get Patient by ID with Heart Rate Details
    @GetMapping("/{id}")
    public PatientWithHeartRatesDTO getPatientById(@PathVariable Long id) {
        // Fetch the patient entity
        Patient patient = patientService.getPatientById(id);

        // Fetch associated heart rates for the patient
        List<HeartRate> heartRates = heartRateService.getHeartRatesByPatientId(id);

        // Return a DTO with the combined information
        return new PatientWithHeartRatesDTO(patient.getId(), patient.getName(), patient.getAge(), heartRates);
    }
}
