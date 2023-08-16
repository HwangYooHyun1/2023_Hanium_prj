package dev.project.hanium.service;

import dev.project.hanium.dto.project.ProjectDto;
import dev.project.hanium.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public void create(ProjectDto dto) {
        projectRepository.save(dto.toEntity());
    }
}
