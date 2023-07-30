package dev.project.hanium.service;

import dev.project.hanium.dto.LogAnomaly;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class MlRequestServiceTest {
    @Autowired
    MlRequestService mlRequestService;

    @Test
    public void requestTest() {
        LogAnomaly mlMetricData = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        System.out.println("-----------------------------");
        System.out.println(mlMetricData.getRecords().getDetector_index());
        System.out.println(mlMetricData.getRecords().getTimestamp());
        System.out.println(mlMetricData.getRecords().getJob_id());
        System.out.println(mlMetricData.getRecords().getRecord_score());
        System.out.println(mlMetricData.getRecords().getOver_field_value());
    }
}
