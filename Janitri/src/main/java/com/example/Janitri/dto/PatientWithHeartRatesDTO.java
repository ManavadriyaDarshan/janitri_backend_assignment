package com.example.Janitri.dto;

import com.example.Janitri.entity.HeartRate;

import java.util.List;

public class PatientWithHeartRatesDTO {
    private Long id;
    private String name;
    private int age;
    private List<HeartRate> heartRates;

    // Constructor
    public PatientWithHeartRatesDTO(Long id, String name, int age, List<HeartRate> heartRates) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.heartRates = heartRates;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public List<HeartRate> getHeartRates() {
        return heartRates;
    }

    public void setHeartRates(List<HeartRate> heartRates) {
        this.heartRates = heartRates;
    }
}
