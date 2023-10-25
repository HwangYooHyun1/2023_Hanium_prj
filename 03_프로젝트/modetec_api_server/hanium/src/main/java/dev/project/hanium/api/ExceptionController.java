package dev.project.hanium.api;

import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.response.CommonResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler(HaniumException.class)
    public ResponseEntity<?> DuplicatedIdHandler(HaniumException e) {
        log.error("Error occurs % {}", e.toString());
        return ResponseEntity.status(e.getErrorCode().getStatus())
                .body(CommonResponse.error(e.getErrorCode().name()));
    }
}
