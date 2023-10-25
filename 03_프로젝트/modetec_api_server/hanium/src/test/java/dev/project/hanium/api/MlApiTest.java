package dev.project.hanium.api;

import dev.project.hanium.config.JpaConfig;
import dev.project.hanium.config.RestConfig;
import dev.project.hanium.config.SecurityConfig;
import dev.project.hanium.repository.MetricAnomalyRepository;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.LogAnomalyResponse;
import dev.project.hanium.response.LogResponseData;
import dev.project.hanium.service.MlRequestService;
import org.elasticsearch.common.inject.Inject;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest(MlApi.class)
@Import({RestConfig.class, SecurityConfig.class})
class MlApiTest {
    @InjectMocks
    MlApi mlApi;

    @MockBean
    MlRequestService mlRequestService;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    MockMvc mvc;
}