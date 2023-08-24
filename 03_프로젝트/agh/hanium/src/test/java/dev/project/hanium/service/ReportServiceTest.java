package dev.project.hanium.service;

import dev.project.hanium.dto.ReportDto;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ReportServiceTest {
    @Autowired
    ReportService reportService;

    @Test
    public void reportsTest() {
        LocalDateTime startDate = LocalDateTime.parse("2023-08-20" + "T00:00:00");
        LocalDateTime endDate = LocalDateTime.parse("2023-08-20" + "T23:59:59");
        List<ReportDto> reports = reportService.reports(startDate, endDate);
        reports.stream().forEach(System.out::println);
    }
}

