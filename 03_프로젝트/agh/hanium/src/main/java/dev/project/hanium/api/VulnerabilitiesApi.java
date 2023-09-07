package dev.project.hanium.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import dev.project.hanium.dto.VulnerabilitiesResultDto;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.service.VulnerabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class VulnerabilitiesApi {

    private final VulnerabilityService vulnerabilityService;
    @PostMapping("/vulnerabilities")
    public CommonResponse<List<VulnerabilitiesResultDto>> saveData(@RequestBody String url) throws JsonProcessingException {
        //db저장
        // Flask 서버로 요청 보내기
        return CommonResponse.success(vulnerabilityService.saveResult(url));
    }
    @PostMapping("/vulnerabilitiesReport")
    public CommonResponse<List<VulnerabilitiesResultDto>> getData(@RequestBody String  url) throws JsonProcessingException {

        return CommonResponse.success(vulnerabilityService.getResult(url));
    }
}
