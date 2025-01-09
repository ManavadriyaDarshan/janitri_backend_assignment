package com.example.Janitri.controller;

import com.example.Janitri.entity.HeartRate;
import com.example.Janitri.service.HeartRateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/heartrates")
public class HeartRateController {

    @Autowired
    private HeartRateService heartRateService;

    // Add Heart Rate
    @PostMapping
    public HeartRate addHeartRate(@RequestBody HeartRate heartRate) {
        return heartRateService.addHeartRate(heartRate);
    }

    // Get Heart Rates by Patient ID
    @GetMapping("/{patientId}")
    public List<HeartRate> getHeartRatesByPatientId(@PathVariable Long patientId) {
        return heartRateService.getHeartRatesByPatientId(patientId);
    }
}
