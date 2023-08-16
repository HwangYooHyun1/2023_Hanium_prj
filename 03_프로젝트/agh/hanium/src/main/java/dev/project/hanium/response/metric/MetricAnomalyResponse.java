package dev.project.hanium.response.metric;

import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.dto.metric.Records;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Getter @Setter
public class MetricAnomalyResponse {
    private int count ;
    private List<MetricResponseData> metricResponseData;

    @Builder
    public MetricAnomalyResponse(int count, List<MetricResponseData> metricResponseData) {
        this.count = metricResponseData.size();
        this.metricResponseData = metricResponseData;
    }

    private static List<MetricResponseData> convert(List<Records> records) {
        return records.stream().map(MetricResponseData::from).sorted((m1,m2) -> (int)m1.getTime() - (int)m2.getTime()).collect(toList());
    }

    public static MetricAnomalyResponse from(MetricAnomalyDto dto) {
        return MetricAnomalyResponse.builder()
//                .count(dto.getCount())
                .count(dto.getRecords().size())
                .metricResponseData(convert(dto.getRecords()))
                .build();
    }
}
