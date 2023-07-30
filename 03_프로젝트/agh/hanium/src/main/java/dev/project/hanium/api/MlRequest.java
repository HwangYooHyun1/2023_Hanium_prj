package dev.project.hanium.api;

import dev.project.hanium.dto.LogAnomaly;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.service.MlRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MlRequest {
    private final MlRequestService mlRequestService;
    @GetMapping("/mlrequest")
    public CommonResponse<LogAnomaly> request() {
        return CommonResponse.success(mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records"));
    }
}
