package dev.project.hanium.service;

import dev.project.hanium.domain.AnomalyEntity;
import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.ReportDto;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.dto.metric.Records;
import dev.project.hanium.exception.ErrorCode;
import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.repository.EmitterRepository;
import dev.project.hanium.repository.LogAnomalyRepository;
import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.response.AnomalyAlarm;
import dev.project.hanium.util.DetectorMap;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MlRequestService {
    private final double MIN_ANOMALY_SCORE = 3.0;
    private final List<String> urlStringList;

    private final static String ANOMALY_NAME = "ANOMALY";
    private final static Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final RestTemplate restTemplate;
    private final MetricAnomalyRepository metricAnomalyRepository;
    private final LogAnomalyRepository logAnomalyRepository;
    private final EmitterRepository emitterRepository;


    public dev.project.hanium.dto.LogAnomalyDto getMlLogData(String url) {
//        String requestBody = "{\"record_score\": 90 , \"desc\" : true}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> entity = new HttpEntity<>(requestBody,headers);
        return restTemplate.getForObject(url, dev.project.hanium.dto.LogAnomalyDto.class);
    }

    public MetricAnomalyDto getMlMetricData(String url){
        return restTemplate.getForObject(url, MetricAnomalyDto.class);
    }


    @Scheduled(fixedDelay = 10000,initialDelay = 10000)
    public void saveAllDifferenceInMetricData() {
        log.info("start");
        MetricAnomalyDto dtos = getMlMetricData("http://3.36.169.149:9200/_ml/anomaly_detectors/metric_anomaly/results/records");
        if(dtos.getRecords().size() != metricAnomalyRepository.count()){
            List<MetricAnomaly> tmp = new ArrayList<>();
            List<MetricAnomaly> request = dtos.getRecords().stream().map(Records::toEntity).collect(toList());
            List<MetricAnomaly> db = metricAnomalyRepository.findAll();

            if(db.isEmpty()) {
                metricAnomalyRepository.saveAll(request);
                sendAnomaly(request,1);
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
                sendAnomaly(tmp,1);
            }
        }
    }

    @Scheduled(fixedDelay = 10000,initialDelay = 10000)
    public void saveAllDifferenceInLogData() {
        LogAnomalyDto dtos = getLogAnomaliesFromElk();
        if(dtos.getRecords().size() != logAnomalyRepository.count()){
            List<LogAnomaly> tmp = new ArrayList<>();
            List<LogAnomaly> request = dtos.getRecords().stream().map(dev.project.hanium.dto.Records::toEntity).collect(toList());
            List<LogAnomaly> db = logAnomalyRepository.findAll();
            if(db.isEmpty()) {
                logAnomalyRepository.saveAll(request);
                sendAnomaly(request,1);
            } else{
                for(LogAnomaly x : request){
                    boolean flag = false;
                    for(LogAnomaly y : db){
                        if((Objects.equals(x.getDetector(), y.getDetector())) && (x.getTime().isEqual(y.getTime())) ) flag = true;
                    }
                    if(!flag) tmp.add(x);
                }
                logAnomalyRepository.saveAll(tmp);
                sendAnomaly(tmp,1);
            }
        }
    }

    public void sendAnomaly(List<? extends AnomalyEntity> list, Integer userId) {
        emitterRepository.get(userId).ifPresentOrElse(sseEmitter -> {
            try {
                List<AnomalyAlarm> anomaly = list.stream().map(AnomalyAlarm::fromEntity).collect(toList());
                if (!anomaly.isEmpty() && anomaly.get(0).getScore() >= MIN_ANOMALY_SCORE) {
                    sseEmitter.send(SseEmitter.event().id(String.valueOf(userId)).name(ANOMALY_NAME).data(anomaly.get(0)));
                }
            } catch (IOException e) {
                throw new HaniumException(ErrorCode.ANOMALY_CONNECT_ERROR);
            }
        }, () -> log.info("No emitter founded"));
    }

    public SseEmitter connected(Integer userId) {
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(userId,sseEmitter);
        sseEmitter.onCompletion(() -> emitterRepository.delete(userId));
        sseEmitter.onTimeout(() -> emitterRepository.delete(userId));
        try {
            sseEmitter.send(SseEmitter.event().id(String.valueOf(userId)).name(ANOMALY_NAME).data("connect completed"));
        } catch (IOException exception) {
            throw new HaniumException(ErrorCode.ANOMALY_CONNECT_ERROR);
        }

        return sseEmitter;
    }

    public dev.project.hanium.dto.LogAnomalyDto getLogAnomaliesFromElk() {
        List<dev.project.hanium.dto.LogAnomalyDto> collect = urlStringList.stream().map(this::getMlLogData).collect(toList());

        dev.project.hanium.dto.LogAnomalyDto result = new dev.project.hanium.dto.LogAnomalyDto(new ArrayList<>());
        for(dev.project.hanium.dto.LogAnomalyDto x : collect) result.getRecords().addAll(x.getRecords());
        result.setCount(result.getRecords().size());

        Map<String,String> detectorMap = DetectorMap.getDetectorMap();
        List<dev.project.hanium.dto.Records> records = result.getRecords();

        for (int i = 0; i < records.size(); i++) {
            String detector = records.get(i).getJob_id();
            records.get(i).setJob_id(detectorMap.get(detector));
        }
//        List<dev.project.hanium.dto.Records> tmp = records.stream().sorted((l1, l2) -> (int) l2.getTimestamp() - (int) l1.getTimestamp()).collect(toList());

        return result;
    }
}
