package dev.project.hanium.dto;

import dev.project.hanium.domain.LogAnomaly;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
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

    @Builder
    public Records(String job_id, String result_type, double probability, double record_score, double initial_record_score, long bucket_span, int detector_index, boolean is_interim, long timestamp, String function, String function_description, String over_field_name, String over_field_value, List<Cause> causes, List<Influencer> influencers, List<String> source_address) {
        this.job_id = job_id;
        this.result_type = result_type;
        this.probability = probability;
        this.record_score = record_score;
        this.initial_record_score = initial_record_score;
        this.bucket_span = bucket_span;
        this.detector_index = detector_index;
        this.is_interim = is_interim;
        this.timestamp = timestamp;
        this.function = function;
        this.function_description = function_description;
        this.over_field_name = over_field_name;
        this.over_field_value = over_field_value;
        this.causes = causes;
        this.influencers = influencers;
        this.source_address = source_address;
    }

    public LogAnomaly toEntity() {
        return LogAnomaly.builder()
                .detector(job_id)
                .time(timestamp)
                .sourceIp(Objects.equals(job_id, "Nginx access status code rate") ?  getInfluencers().get(0).getInfluencer_field_values().get(0) : over_field_value)
                .score(record_score)
                .build();
    }

    public static Records fromEntity(LogAnomaly logAnomaly) {
        return Records.builder()
                .job_id(logAnomaly.getDetector())
                .timestamp(logAnomaly.getTime())
                .over_field_name(logAnomaly.getSourceIp())
                .record_score(logAnomaly.getScore())
                .build();
    }

    @Override
    public String toString() {
        return "detector : " + job_id + ", sourceIp : " + over_field_value + ", score" + record_score + ", time : " + timestamp + " , " + getInfluencers().get(0).getInfluencer_field_values().get(0);
    }
}
