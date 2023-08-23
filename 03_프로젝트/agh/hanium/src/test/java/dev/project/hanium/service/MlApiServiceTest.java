package dev.project.hanium.service;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.Records;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.fixture.LogAnomalyDtoFixtureFactory;
import dev.project.hanium.fixture.MetricAnomalyDtoFixtureFactory;
import dev.project.hanium.repository.EmitterRepository;
import dev.project.hanium.repository.LogAnomalyRepository;
import dev.project.hanium.repository.MetricAnomalyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.List;

import static java.util.stream.Collectors.*;
import static org.assertj.core.api.Assertions.*;


@SpringBootTest
@Transactional
class MlApiServiceTest {
    @Autowired
    MlRequestService mlRequestService;

    @Autowired
    MetricAnomalyRepository metricAnomalyRepository;

    @Autowired
    LogAnomalyRepository logAnomalyRepository;

    @Autowired
    EmitterRepository emitterRepository;

    @Test
    public void requestTest() {
//        LogAnomalyDto mlMetricData = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/source_ip_request_rate_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto statusCode = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/status_code_rate_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto visitor = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/visitor_rate_ecs/results/records");
        dev.project.hanium.dto.LogAnomalyDto lowRequest = mlRequestService.getMlLogData("http://3.36.169.149:9200/_ml/anomaly_detectors/low_request_rate_ecs/results/records");
        //null point exception -> 아마 toString 할 때 null 들어오는 거 때문
        //        statusCode.getRecords().stream().forEach(System.out::println);
//        visitor.getRecords().stream().forEach(System.out::println);
//        lowRequest.getRecords().stream().forEach(System.out::println);
    }


    @Test
    public void metricAnomalyRequestTest() {
        MetricAnomalyDto dto = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        //null point Exception
//        dto.getRecords().stream().forEach(System.out::println);
    }

//    @Test
//    public void metricAnomaliesTest() {
//        MetricAnomalyDto dto = mlRequestService.getMlMetricDataInDB(mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records"));
//        System.out.println(metricAnomalyRepository.findAll().size());
//    }

    @Test
    public void logAnomaliesFromElkTest() {
        dev.project.hanium.dto.LogAnomalyDto logAnomaliesFromElk = mlRequestService.getLogAnomaliesFromElk();
        List<LogAnomaly> db = logAnomaliesFromElk.getRecords().stream().map(Records::toEntity).collect(toList());
        logAnomalyRepository.saveAll(db);
        assertThat(logAnomalyRepository.count()).isEqualTo(logAnomaliesFromElk.getCount());
    }

//    @Test
//    public void logAnomaliesalarmTest() {
//        dev.project.hanium.dto.LogAnomalyDto dtos = mlRequestService.getLogAnomaliesFromElk();
//        mlRequestService.saveAllDifferenceInLogData(dtos);
//        assertThat(logAnomalyRepository.count()).isEqualTo(dtos.getCount());
//    }

//    @Test
//    public void logAnomaliesalarm() {
//        logAnomalyRepository.save(LogAnomaly.builder()
//                        .time(123)
//                        .score(123)
//                        .sourceIp("123")
//                        .detector("Nginx")
//                .build());
//        LogAnomalyDto dtos = LogAnomalyDtoFixtureFactory.create(2);
//        LogAnomalyDto logAnomalyDto = mlRequestService.saveAllDifferenceInLogData(dtos);
//        assertThat(logAnomalyRepository.count()).isEqualTo(logAnomalyDto.getCount());
//    }
}
