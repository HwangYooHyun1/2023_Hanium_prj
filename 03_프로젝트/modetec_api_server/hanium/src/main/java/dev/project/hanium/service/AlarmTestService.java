package dev.project.hanium.service;

import dev.project.hanium.domain.LogAnomaly;
import dev.project.hanium.exception.ErrorCode;
import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.repository.EmitterRepository;
import dev.project.hanium.response.AnomalyAlarm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlarmTestService {
    private final EmitterRepository emitterRepository;
    private final static String ANOMALY_NAME = "ANOMALY";
    private final static Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

//    @Scheduled(fixedDelay = 10000,initialDelay = 10000)
//    public void alarm() {
//        sendAnomalyTest(1);
//    }

    public void sendAnomalyTest(Integer userId) {
        emitterRepository.get(userId).ifPresentOrElse(sseEmitter -> {
            try {
                AnomalyAlarm anomaly = new AnomalyAlarm("detector", 70.453);
                sseEmitter.send(SseEmitter.event().id(String.valueOf(userId)).name(ANOMALY_NAME).data(anomaly));
            } catch (IOException e){
                throw new HaniumException(ErrorCode.ANOMALY_CONNECT_ERROR);
            }
        },() -> log.info("No emitter founded")); //서버에 저장된 브라우저가 아닌 경우
    }
}
