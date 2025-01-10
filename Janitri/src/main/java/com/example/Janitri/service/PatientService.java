package com.example.Janitri.service;

import com.example.Janitri.entity.Patient;
import com.example.Janitri.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    // Add a New Patient
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient); // Save the patient entity
    }

    // Fetch Patient by ID
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Patient not found with ID: " + id));
    }
}
