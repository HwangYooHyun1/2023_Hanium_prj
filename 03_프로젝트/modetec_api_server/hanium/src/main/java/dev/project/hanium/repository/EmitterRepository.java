package dev.project.hanium.repository;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Repository
//로컬 캐싱 방법 - 문제점은 여러대의 서버에서 공유하는 데이터가 아니라는 점
public class EmitterRepository {
    private Map<String, SseEmitter> emitterMap = new HashMap<>();

    public SseEmitter save(Integer userId, SseEmitter sseEmitter) {
        final String key = getKey(userId);
        emitterMap.put(key, sseEmitter);
        log.info("Set sseEmitter {}", userId);
        return sseEmitter;
    }

    public Optional<SseEmitter> get(Integer userId) {
        final String key = getKey(userId);
        log.info("Get sseEmitter {}",userId);
        return Optional.ofNullable(emitterMap.get(key));
    }

    private String getKey(Integer userId) {
        return "Emitter:ID:" + userId;
    }

    public void delete(Integer userId) {
        emitterMap.remove(getKey(userId));
    }
}
