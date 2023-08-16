package dev.project.hanium.api;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.LogAnomalyResponse;
import dev.project.hanium.response.LogResponseData;
import dev.project.hanium.response.metric.MetricAnomalyResponse;
import dev.project.hanium.service.MlRequestService;
import dev.project.hanium.util.DetectorMap;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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
        LogAnomalyDto sourceIpUrl = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_url_count_ecs/results/records");
        LogAnomalyDto statusCodeRate = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        LogAnomalyDto visitorRate = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        LogAnomalyDto lowRequest = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");

        List<LogResponseData> result = new ArrayList<>();
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(sourceIpAnomaly).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(sourceIpUrl).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromStatusCode(statusCodeRate).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(visitorRate).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(lowRequest).getLogResponseData());

        Map<String,String> detectorMap = DetectorMap.getDetectorMap();
        for (int i = 0; i < result.size(); i++) {
            String detector = result.get(i).getDetector();
            result.get(i).setDetector(detectorMap.get(detector));
        }

        return CommonResponse.success(new LogAnomalyResponse(result.size(), result.stream().sorted((a, b) -> (int) b.getTime() - (int) a.getTime()).collect(Collectors.toList())));
    }

//    @GetMapping("/loganomaliesV2")
//    public CommonResponse<LogAnomalyResponse> logAnomaliesRequestV2() {
//
//        LogAnomalyResponse requestedData = mlRequestService.getMlLogAnomalies();
//        return CommonResponse.success(requestedData);
//    }

    @GetMapping("/metricanomaly")
    public CommonResponse<MetricAnomalyResponse> metricAnomalyRequestV2() {
        MetricAnomalyDto dto = mlRequestService.getMlMetricDataInDB(mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records"));
        return CommonResponse.success(MetricAnomalyResponse.from(dto));
    }

//    @GetMapping("/metricanomaly")
//    public CommonResponse<MetricAnomalyResponse> metricAnomalyRequestV1() {
//        MetricAnomalyDto dto = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
//        return CommonResponse.success(MetricAnomalyResponse.from(dto));
//    }

    @GetMapping("/anomaly/subscribe")
    public SseEmitter subscribe() {
        //브라우저 - 서버 연결
        return mlRequestService.connected(1);
    }
}
