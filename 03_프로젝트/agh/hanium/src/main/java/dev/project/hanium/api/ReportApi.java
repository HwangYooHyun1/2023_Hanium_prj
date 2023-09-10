package dev.project.hanium.api;

import dev.project.hanium.Entity.RequestDate;
import dev.project.hanium.dto.ReportDto;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.response.ReportResponse;
import dev.project.hanium.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ReportApi {
    private final ReportService reportService;

    @GetMapping("/reports")
    public CommonResponse<List<ReportDto>> getReports(@ModelAttribute RequestDate requestDate){
        return CommonResponse.success(reportService.reports(LocalDateTime.parse(requestDate.getStartDate()+"T00:00:00"),
                LocalDateTime.parse(requestDate.getEndDate()+"T23:59:59")));
    }
}
