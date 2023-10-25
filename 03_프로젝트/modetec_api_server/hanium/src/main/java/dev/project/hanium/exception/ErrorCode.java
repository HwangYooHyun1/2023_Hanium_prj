package dev.project.hanium.exception;

import co.elastic.clients.elasticsearch.nodes.Http;
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
    ANOMALY_CONNECT_ERROR(HttpStatus.INTERNAL_SERVER_ERROR,"Connection error!"),
    DUPLICATED_PROJECT_NAME(HttpStatus.OK, "Project Name is duplicated"),
    DUPLICATED_AGENT_NAME(HttpStatus.OK, "Agent Name is duplicated"),
    PROJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "Project is not exist");

    private final HttpStatus status;
    private final String message;
}
