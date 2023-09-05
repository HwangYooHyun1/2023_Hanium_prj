package dev.project.hanium.api;

import dev.project.hanium.dto.project.ProjectDto;
import dev.project.hanium.request.group.CreateProjectRequest;
import dev.project.hanium.response.CommonResponse;
import dev.project.hanium.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class ProjectApi {
    private final ProjectService projectService;
    @PostMapping("/projects/new")
    public CommonResponse<Void> createGroup(@RequestBody CreateProjectRequest createProjectRequest) {
        projectService.create(ProjectDto.fromCreate(createProjectRequest));
        return CommonResponse.success();
    }

    @GetMapping("/projects")
    public CommonResponse<List<String>> getProjectsName() {
        return CommonResponse.success(projectService.getAgents());
    }
}
