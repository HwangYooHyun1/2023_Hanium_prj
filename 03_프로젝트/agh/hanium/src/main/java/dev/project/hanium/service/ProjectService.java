package dev.project.hanium.service;

import dev.project.hanium.domain.Project;
import dev.project.hanium.dto.project.ProjectDto;
import dev.project.hanium.exception.ErrorCode;
import dev.project.hanium.exception.HaniumException;
import dev.project.hanium.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public void create(ProjectDto dto) {
        projectRepository.findByProjectName(dto.getProjectName()).ifPresent(project -> {
            throw new HaniumException(ErrorCode.DUPLICATED_PROJECT_NAME,String.format("%s is duplicated",project.getProjectName()));
        });
        projectRepository.save(dto.toEntity());
    }

    public List<String> getAgents() {
        return projectRepository.findAll().stream().map(Project::getProjectName).collect(Collectors.toList());
    }
}
