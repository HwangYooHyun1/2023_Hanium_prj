package dev.project.hanium.dto;

import dev.project.hanium.domain.LogAnomaly;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class LogAnomalyDto {
    int count;
    List<Records> records;
    public LogAnomalyDto(List<Records> records){
        this.count = records.size();
        this.records = records;
    }
}
