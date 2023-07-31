package dev.project.hanium.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LogAnomalyDto {
    int count;
    List<Records> records;
}
