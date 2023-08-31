package dev.project.hanium.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
@RestController

public class VulnerabiltiesApi {
    private final String flaskServerUrl = "http://210.110.39.163:8080/vulnerabilties";
    @Autowired
    RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/vulnerabilties")
    public ResponseEntity<String> getData(@RequestBody String userUrl) {
        // Flask 서버로 요청 보내기
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> requestEntity = new HttpEntity<>(userUrl, headers);
        ResponseEntity<String> responseEntity = restTemplate.exchange(flaskServerUrl, HttpMethod.POST, requestEntity, String.class);

        return new ResponseEntity<>(responseEntity.getBody(), HttpStatus.OK);
    }

}
