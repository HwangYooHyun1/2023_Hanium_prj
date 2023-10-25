package dev.project.hanium.dto;

import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class VulnerabilitiesResultDto {
    private String vulnerability;
    private String description;
    private String purpose;
    private String security_threat;
    private String content;
    private String status;

}
