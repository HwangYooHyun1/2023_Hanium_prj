package dev.project.hanium.api;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.LogAnomalyResponse;
import dev.project.hanium.response.LogResponseData;
import dev.project.hanium.service.MlRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MlApi {
    private final MlRequestService mlRequestService;
    @GetMapping("/mlrequest")
    public CommonResponse<LogAnomalyDto> request() {
        return CommonResponse.success(mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records"));
    }
    @GetMapping("/loganomaly")
    public CommonResponse<LogAnomalyResponse> logAnomalyRequest() {
        LogAnomalyDto logAnomalyDto = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        return CommonResponse.success(LogAnomalyResponse.fromSourceIpRequest(logAnomalyDto));
    }

    @GetMapping("/status")
    public CommonResponse<LogAnomalyResponse> getStatusCode() {
        LogAnomalyDto logAnomalyDto = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        return CommonResponse.success(LogAnomalyResponse.fromStatusCode(logAnomalyDto));
    }

    @GetMapping("/loganomalies")
    public CommonResponse<LogAnomalyResponse> logAnomaliesRequest() {
        LogAnomalyDto sourceIpAnomaly = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
//        LogAnomalyResponse.from(sourceIpAnomaly).getLogResponseData();
        LogAnomalyDto sourceIpUrl = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_url_count_ecs/results/records");
//        LogAnomalyResponse.from(sourceIpUrl).getLogResponseData();
        LogAnomalyDto statusCodeRate = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
//        LogAnomalyResponse.from(statusCodeRate).getLogResponseData();
        LogAnomalyDto visitorRate = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
//        LogAnomalyResponse.from(visitorRate).getLogResponseData();
        LogAnomalyDto lowRequest = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");
//        LogAnomalyResponse.from(lowRequest).getLogResponseData();

        List<LogResponseData> result = new ArrayList<>();
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(sourceIpAnomaly).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(sourceIpUrl).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromStatusCode(statusCodeRate).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(visitorRate).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(lowRequest).getLogResponseData());
//        result.stream().sorted((a, b) -> (int) a.getTime() - (int) b.getTime()).collect(Collectors.toList());
        return CommonResponse.success(new LogAnomalyResponse(result.size(), result.stream().sorted((a, b) -> (int) a.getTime() - (int) b.getTime()).collect(Collectors.toList())));
    }
}
