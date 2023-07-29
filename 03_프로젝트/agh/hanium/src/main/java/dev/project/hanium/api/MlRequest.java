package dev.project.hanium.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.http.HttpRequest;

@RestController
public class MlRequest {
    @GetMapping("/mlrequest")
    public void request(HttpRequest request) {

    }
}
