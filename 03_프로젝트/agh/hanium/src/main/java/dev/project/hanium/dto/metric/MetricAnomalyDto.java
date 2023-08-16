package dev.project.hanium.dto.metric;

import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
public class MetricAnomalyDto {
    private int count;
    private List<Records> records;

    public MetricAnomalyDto(List<Records> records){
        this.count = records.size();
        this.records = records;
    }
}
