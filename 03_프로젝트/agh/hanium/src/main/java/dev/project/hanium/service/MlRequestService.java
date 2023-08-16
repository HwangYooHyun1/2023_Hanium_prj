package dev.project.hanium.service;

import dev.project.hanium.domain.MetricAnomaly;
import dev.project.hanium.dto.LogAnomalyDto;
import dev.project.hanium.dto.metric.MetricAnomalyDto;
import dev.project.hanium.dto.metric.Records;
import dev.project.hanium.exception.ErrorCode;
import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.global.UrlStringList;
import dev.project.hanium.repository.EmitterRepository;
import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.response.LogAnomalyResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.*;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class MlRequestService {
    private final UrlStringList urlStringList;

    private final static String ANOMALY_NAME = "ANOMALY";
    private final static Long DEFAULT_TIMEOUT = 60L * 1000 * 60;
    private final RestTemplate restTemplate;
    private final MetricAnomalyRepository metricAnomalyRepository;
    private final EmitterRepository emitterRepository;


    public LogAnomalyDto getMlLogData(String url) {
//        String requestBody = "{\"record_score\": 90 , \"desc\" : true}";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
//        HttpEntity<String> entity = new HttpEntity<>(requestBody,headers);
        return restTemplate.getForObject(url, LogAnomalyDto.class);
    }

    //TODO: LogAnomalyResponse 가 반환형인데 일단 어쩔 수가 없었다.

//    public LogAnomalyResponse getMlLogAnomalies() {
//        List<String> urlList = urlStringList.getUrlList();
//        List<LogAnomalyDto> collect = urlList.stream().map(this::getMlLogData).collect(toList());
//
//    }

    public MetricAnomalyDto getMlMetricData(String url){
        return restTemplate.getForObject(url, MetricAnomalyDto.class);
    }


    public MetricAnomalyDto getMlMetricDataInDB(MetricAnomalyDto requested) {
//        MetricAnomalyDto requested = restTemplate.getForObject(url, MetricAnomalyDto.class);
//        List<MetricAnomaly> metricAnomalyList = requested.getRecords().stream().map(Records::toEntity).collect(toList());
        return saveAllDifferenceInMetricData(requested);
    }


    public MetricAnomalyDto saveAllDifferenceInMetricData(MetricAnomalyDto dtos) {
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
                        if((x.getDetector() == y.getDetector()) && (x.getTime() == y.getTime()) ) flag = true;
                    }
                    if(!flag) tmp.add(x);
                }
                metricAnomalyRepository.saveAll(tmp);
                sendMetricAnomaly(tmp,1);
            }
//            List<Records> list = metricAnomalyRepository.findAll().stream().map(Records::fromEntity).sorted((m1,m2) -> (int)m1.getTimestamp() - (int)m2.getTimestamp()).collect(toList());
            List<Records> list = metricAnomalyRepository.findAll()
                    .stream()
                    .map(Records::fromEntity)
                    .sorted((m1,m2) -> (int) m2.getTimestamp() - (int) m1.getTimestamp())
//                    .sorted(comparingLong(Records::getTimestamp))
                    .collect(toList());
            return new MetricAnomalyDto(list);
        }
        return dtos;
    }
    public void sendMetricAnomaly(List<MetricAnomaly> list, Integer userId) {
        emitterRepository.get(userId).ifPresentOrElse(sseEmitter -> {
            try {
                MetricAnomalyDto anomaly = new MetricAnomalyDto(list.stream().map(Records::fromEntity).collect(toList()));
                sseEmitter.send(SseEmitter.event().id("").name(ANOMALY_NAME).data(anomaly));
            } catch (IOException e){
                throw new HaniumException(ErrorCode.ANOMALY_CONNECT_ERROR);
            }
        },() -> log.info("No emitter founded")); //서버에 저장된 브라우저가 아닌 경우
    }

    public SseEmitter connected(Integer userId) {
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);
        emitterRepository.save(userId,sseEmitter);
        sseEmitter.onCompletion(() -> emitterRepository.delete(userId));
        sseEmitter.onTimeout(() -> emitterRepository.delete(userId));

        try {
            //id("") 기본 문자열이 들어간 이유는 우리 서비스에서 딱히 신경쓰지 않아도 되는 부분 같아서 넣어주었다
            sseEmitter.send(SseEmitter.event().id("").name(ANOMALY_NAME).data("connect completed"));
        } catch (IOException exception) {
            throw new HaniumException(ErrorCode.ANOMALY_CONNECT_ERROR);
        }

        return sseEmitter;
    }
}
