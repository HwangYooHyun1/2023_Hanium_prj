package dev.project.hanium.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Records{
    private String job_id;
    private String result_type;
    private double probability;
    private double record_score;
    private double initial_record_score;
    private long bucket_span;
    private int detector_index;
    private boolean is_interim;
    private long timestamp;
    private String function;
    private String function_description;
    private String over_field_name;
    private String over_field_value;
    private List<Cause> causes;
    private List<Influencer> influencers;
    private List<String> source_address;
}
