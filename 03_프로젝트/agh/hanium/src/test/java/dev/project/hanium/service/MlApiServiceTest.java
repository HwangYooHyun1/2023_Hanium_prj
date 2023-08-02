package dev.project.hanium.service;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class MlApiServiceTest {
    @Autowired
    MlRequestService mlRequestService;

    @Test
    public void requestTest() {
//        LogAnomalyDto mlMetricData = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        LogAnomalyDto statusCode = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        LogAnomalyDto visitor = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        LogAnomalyDto lowRequest = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");

        System.out.println(statusCode.getCount());
        System.out.println(statusCode.getRecords().get(0).getJob_id());
        System.out.println(visitor.getCount());
        System.out.println(lowRequest.getCount());
    }

    @Test
    public void metricAnomalyRequestTest() {
        MetricAnomalyDto dto = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        dto.getRecords().stream().forEach(System.out::println);
    }
}
