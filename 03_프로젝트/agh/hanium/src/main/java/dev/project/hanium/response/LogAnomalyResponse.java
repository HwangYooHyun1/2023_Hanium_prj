package dev.project.hanium.response;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.Records;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Getter @Setter
public class LogAnomalyResponse {
    private int count;
    private List<LogResponseData> logResponseData;

    @Builder
    public LogAnomalyResponse(int count, List<LogResponseData> logResponseData) {
        this.count = count;
        this.logResponseData = logResponseData;
    }

    public static LogAnomalyResponse fromDto(LogAnomalyDto dto) {
        return LogAnomalyResponse.builder()
                .count(dto.getCount())
                .logResponseData(dto.getRecords().stream().map(LogResponseData::fromRecords).collect(toList()))
                .build();
    }
    private static List<LogResponseData> convertSourceIpRequest(List<Records> records){
        return records.stream().map(LogResponseData::fromSourceIpRequest).collect(toList());
    }

    private static List<LogResponseData> convertStatusCode(List<Records> records) {
        return records.stream().map(LogResponseData::fromStatus).collect(toList());
    }
    public static LogAnomalyResponse fromSourceIpRequest(LogAnomalyDto dto) {
        if(dto.getCount() == 0) return LogAnomalyResponse.builder()
                .count(0)
                .logResponseData(List.of())
                .build();

        return LogAnomalyResponse.builder()
                .count(dto.getCount())
                .logResponseData(convertSourceIpRequest(dto.getRecords()))
                .build();
    }

    public static LogAnomalyResponse fromStatusCode(LogAnomalyDto dto) {
        return LogAnomalyResponse.builder()
                .count(dto.getCount())
                .logResponseData(convertStatusCode(dto.getRecords()))
                .build();
    }
}
