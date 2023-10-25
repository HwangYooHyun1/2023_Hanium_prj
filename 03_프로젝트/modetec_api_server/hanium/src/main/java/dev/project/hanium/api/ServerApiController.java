package dev.project.hanium.api;

import dev.project.hanium.response.AgentServerListResponse;
import dev.project.hanium.response.CommonResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class ServerApiController {
    @GetMapping("/agents")
    public CommonResponse<AgentServerListResponse> getAgentsNameList() {
        Map<String,String> map = new HashMap<>();
        map.put("Nginx","ip-172-31-12-240");
        map.put("Shop.service","ip-172-31-15-63");
        return CommonResponse.success(new AgentServerListResponse(map));
    }
}
