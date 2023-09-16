package dev.project.hanium.repository;

import dev.project.hanium.domain.Agent;
import dev.project.hanium.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgentRepository extends JpaRepository<Agent,Long> {
    Optional<Agent> findByAgentNameAndProject(String agentName, Project project);
}
