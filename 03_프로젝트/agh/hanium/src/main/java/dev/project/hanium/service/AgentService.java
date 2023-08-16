package dev.project.hanium.service;

import dev.project.hanium.domain.Project;
import dev.project.hanium.dto.agent.AgentDto;
import dev.project.hanium.repository.AgentRepository;
import dev.project.hanium.repository.ProjectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgentService {
    private final AgentRepository agentRepository;
    private final ProjectRepository projectRepository;
    public void create(AgentDto dto) {
        Project project = projectRepository.findByProjectName(dto.getProjectName()).get();
        agentRepository.save(dto.toEntity(project));
    }
}
