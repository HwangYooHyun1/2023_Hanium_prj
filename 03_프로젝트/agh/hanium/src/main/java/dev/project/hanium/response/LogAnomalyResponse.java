package dev.project.hanium.response;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.Records;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.stream.Collectors;

@Getter @Setter
public class LogAnomalyResponse {
    private int count;
    private List<LogResponseData> logResponseData;

    @Builder
    public LogAnomalyResponse(int count, List<LogResponseData> logResponseData) {
        this.count = count;
        this.logResponseData = logResponseData;
    }

    private static List<LogResponseData> convertRecords(List<Records> records){
        return records.stream().map(LogResponseData::from).collect(Collectors.toList());
    }

    public static LogAnomalyResponse from(LogAnomalyDto dto) {
//        if(dto.getCount() == 0) return LogAnomalyResponse.builder()
//                .count(0)
//                .logResponseData(List.of())
//                .build();

        return LogAnomalyResponse.builder()
                .count(dto.getCount())
                .logResponseData(convertRecords(dto.getRecords()))
                .build();
    }
}
