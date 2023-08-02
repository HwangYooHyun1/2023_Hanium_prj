package dev.project.hanium.api;

import dev.project.hanium.response.AgentNameResponse;
import dev.project.hanium.response.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
public class ServerApiController {
    @GetMapping("/agents")
    public CommonResponse<AgentNameResponse> getAgentsNameList() {
        return CommonResponse.success(new AgentNameResponse(Arrays.asList("nginx","server")));
    }
}
