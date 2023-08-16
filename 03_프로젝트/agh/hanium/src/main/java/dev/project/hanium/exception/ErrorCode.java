package dev.project.hanium.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {
    DUPLICATED_USER_NAME(HttpStatus.CONFLICT,"User is duplicated"),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED,"Password is invalid"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND,"User is not founded"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Token is Invalid"),
    POST_NOT_FOUND(HttpStatus.NOT_FOUND,"Post is not founded" ),
    INVALID_PERMISSION(HttpStatus.UNAUTHORIZED, "Permission is invalid"),
    ANOMALY_CONNECT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"Connection error!") ;

    private final HttpStatus status;
    private final String message;
}
