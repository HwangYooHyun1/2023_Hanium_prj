package dev.project.hanium.api;

import dev.project.hanium.response.CommonResponse;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MetricTestApi {
    @GetMapping("/getmetricsV2")
    public CommonResponse<Map<String,Object>> getMetrics() {
        Map<String, Object> result = new HashMap<>();
        result.put("avg_net_in",1459.45);
        result.put("max_net_in",3324);
        result.put("max_cpu","88.40");
        result.put("avg_mem","55.72");
        result.put("avg_cpu","1.25");
        result.put("avg_net_out","12008.55");
        result.put("max_net_out",23486);
        result.put("max_mem","90.00");
        return CommonResponse.success(result);
    }
}
