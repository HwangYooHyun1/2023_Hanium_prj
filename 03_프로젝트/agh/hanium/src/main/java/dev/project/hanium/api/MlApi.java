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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Slf4j
public class MlApi {
    private final MlRequestService mlRequestService;

    @GetMapping("/mlrequest")
    public CommonResponse<dev.project.hanium.dto.LogAnomalyDto> request() {
        return CommonResponse.success(mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records"));
    }

    @GetMapping("/loganomaly")
    public CommonResponse<LogAnomalyResponse> logAnomalyRequest() {
        dev.project.hanium.dto.LogAnomalyDto logAnomalyDto = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        return CommonResponse.success(LogAnomalyResponse.fromSourceIpRequest(logAnomalyDto));
    }

    @GetMapping("/status")
    public CommonResponse<LogAnomalyResponse> getStatusCode() {
        dev.project.hanium.dto.LogAnomalyDto logAnomalyDto = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        return CommonResponse.success(LogAnomalyResponse.fromStatusCode(logAnomalyDto));
    }

    @GetMapping("/loganomalies")
    public CommonResponse<LogAnomalyResponse> logAnomaliesRequest() {
        List<LogResponseData> result = getLogResponseData();
        Map<String,String> detectorMap = DetectorMap.getDetectorMap();
        for (int i = 0; i < result.size(); i++) {
            String detector = result.get(i).getDetector();
            result.get(i).setDetector(detectorMap.get(detector));
        }

        return CommonResponse.success(new LogAnomalyResponse(result.size(), result.stream().sorted((a, b) -> (int) b.getTime() - (int) a.getTime()).collect(Collectors.toList())));
    }

    private List<LogResponseData> getLogResponseData() {
        dev.project.hanium.dto.LogAnomalyDto sourceIpAnomaly = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto sourceIpUrl = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_url_count_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto statusCodeRate = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto visitorRate = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto lowRequest = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");
        LogAnomalyDto dtos = new LogAnomalyDto(new ArrayList<>());

        List<LogResponseData> result = new ArrayList<>();
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(sourceIpAnomaly).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(sourceIpUrl).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromStatusCode(statusCodeRate).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(visitorRate).getLogResponseData());
        result.addAll(LogAnomalyResponse.fromSourceIpRequest(lowRequest).getLogResponseData());
        return result;
    }

//    @GetMapping("/loganomaliesV2")
//    public CommonResponse<LogAnomalyResponse> logAnomaliesRequestV2() {
//        LogAnomalyDto logAnomaliesFromElk = mlRequestService.getLogAnomaliesFromElk();
//        LogAnomalyDto requestedData = mlRequestService.saveAllDifferenceInLogData(logAnomaliesFromElk);
//        LogAnomalyResponse result = LogAnomalyResponse.fromDto(requestedData);
//        return CommonResponse.success(result);
//    }

    @GetMapping("/metricanomaly")
    public CommonResponse<MetricAnomalyResponse> metricAnomalyRequestV2() {
        //TODO :
//        MetricAnomalyDto dto = mlRequestService.getMlMetricDataInDB(mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records"));
        MetricAnomalyDto dto = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        return CommonResponse.success(MetricAnomalyResponse.from(dto));
    }

    @GetMapping(value = "/anomaly/subscribe",produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe() {
        //브라우저 - 서버 연결
        return mlRequestService.connected(1);
    }
}
