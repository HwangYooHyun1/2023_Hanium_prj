package dev.project.hanium.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class LogAnomaly {
    int count;
    List<Records> records;
}
