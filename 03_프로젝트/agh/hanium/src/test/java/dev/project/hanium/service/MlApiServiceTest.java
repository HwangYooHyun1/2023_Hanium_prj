package dev.project.hanium.service;

import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.fixture.MetricAnomalyDtoFixtureFactory;
import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.util.DetectorMap;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.Map;


@SpringBootTest
@Transactional
class MlApiServiceTest {
    @Autowired
    MlRequestService mlRequestService;

    @Autowired
    MetricAnomalyRepository metricAnomalyRepository;

    @Test
    public void requestTest() {
//        LogAnomalyDto mlMetricData = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        LogAnomalyDto statusCode = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        LogAnomalyDto visitor = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        LogAnomalyDto lowRequest = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");
    }


    @Test
    public void metricAnomalyRequestTest() {
        MetricAnomalyDto dto = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        dto.getRecords().stream().forEach(System.out::println);
    }

    @Test
    public void metricAnomaliesTest() {
        MetricAnomalyDto dto = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        mlRequestService.saveAllDifferenceInMetricData(MetricAnomalyDtoFixtureFactory.create(10));
        System.out.println(metricAnomalyRepository.findAll().size());
    }
}
