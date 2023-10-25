package dev.project.hanium.service;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.dto.metric.Records;
import dev.project.hanium.fixture.LogAnomalyDtoFixtureFactory;
import dev.project.hanium.fixture.MetricAnomalyDtoFixtureFactory;
import dev.project.hanium.repository.EmitterRepository;
import dev.project.hanium.repository.LogAnomalyRepository;
import dev.project.hanium.repository.MetricAnomalyRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Test
    public void anomalyDBTest() {
        MetricAnomalyDto dtos = mlRequestService.getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        int size = 3;
        saveAllDifferenceInMetricData(size);
        assertThat(metricAnomalyRepository.count()).isEqualTo(dtos.getCount() + size);
    }

    @Test
    public void ifSameDataIndToTest() {
        Records.builder()
                .field_name("system.cpu.total.pct high_mean")
                .timestamp(1691736300000L)
                .record_score(0.06998891928168742)
                .build();
    }

    public void saveAllDifferenceInMetricData(int n) {
        Records records = Records.builder()
                .field_name("system.cpu.total.pct")
                .function("high_mean")
                .timestamp(1691736300000L)
                .record_score(0.06998891928168742)
                .build();
//        MetricAnomalyDto dtos = new MetricAnomalyDto(List.of(records));
        MetricAnomalyDto dtos = MetricAnomalyDtoFixtureFactory.create(n);
        long time = 1691736300000L;
        for(int i=0;i<dtos.getCount();i++){
            dtos.getRecords().get(i).setTimestamp(time + i);
        }
        if(dtos.getRecords().size() != metricAnomalyRepository.count()){
            List<MetricAnomaly> tmp = new ArrayList<>();
            List<MetricAnomaly> request = dtos.getRecords().stream().map(Records::toEntity).collect(toList());
            List<MetricAnomaly> db = metricAnomalyRepository.findAll();
            if(db.size() == 0) {
                metricAnomalyRepository.saveAll(request);
            } else{
                for(MetricAnomaly x : request){
                    boolean flag = false;
                    for(MetricAnomaly y : db){
                        //db에 있는 데이터인 경우
                        if((Objects.equals(x.getDetector(), y.getDetector())) && (x.getTime().isEqual(y.getTime())) ) {
                            flag = true;
                            break;
                        }
                    }
                    if(!flag) tmp.add(x);
                }
                metricAnomalyRepository.saveAll(tmp);
            }
        }
    }
}
