package dev.project.hanium.dto;

import lombok.Getter;
import lombok.Setter;

@Getter@Setter
public class MetricsResultDateDto {
    private String avgNetIn;
    private String maxNetIn;
    private String avgNetOut;
    private String maxNetOut;
    private String avgCpu;
    private String maxCpu;
    private String avgMem;
    private String maxMem;

}
