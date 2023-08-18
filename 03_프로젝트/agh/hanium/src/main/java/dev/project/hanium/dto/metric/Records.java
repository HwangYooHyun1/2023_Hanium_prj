package dev.project.hanium.dto.metric;

import dev.project.hanium.domain.MetricAnomaly;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class Records {
    private String field_name;
    private String function;
    private long timestamp;
    private double record_score;

    @Override
    public String toString() {
        return "field_name: " + field_name + ", function: " + function + ", timestamp : " + timestamp + " , record_score : " + record_score;
    }

    @Builder
    public Records(String field_name,String function,long timestamp,double record_score){
        this.field_name = field_name;
        this.function = function;
        this.timestamp = timestamp;
        this.record_score = record_score;
    }

    public MetricAnomaly toEntity() {
        return MetricAnomaly.builder()
                .detector(field_name + " " + function)
                .score(record_score)
                .time(timestamp)
                .build();
    }

    public static Records fromEntity(MetricAnomaly metricAnomaly){
        return Records.builder()
                .field_name(metricAnomaly.getDetector().split(" ")[0])
                .function(metricAnomaly.getDetector().split(" ")[1])
                .timestamp(metricAnomaly.getTime())
                .record_score(metricAnomaly.getScore())
                .build();
    }
}
