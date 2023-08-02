package dev.project.hanium.dto.metric;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class MetricAnomalyDto {
    private int count;
    private List<Records> records;
}
