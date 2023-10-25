package dev.project.hanium.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Cause {
    private double probability;
    private String function;
    private String function_description;
    private List<Double> typical;
    private List<Double> actual;
    private String over_field_name;
    private String over_field_value;

    // Getters and Setters
}
