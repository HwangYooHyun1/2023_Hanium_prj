package dev.project.hanium.dto.project;

import dev.project.hanium.domain.Project;
import dev.project.hanium.request.group.CreateProjectRequest;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.parameters.P;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter @Setter
public class ProjectDto {
    private Long id;
    private String projectName;
    private String projectDescription;

    @Builder
    public ProjectDto(Long id, String projectName, String projectDescription) {
        this.id = id;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
    }

    public static ProjectDto fromCreate(CreateProjectRequest request){
        return ProjectDto.builder()
                .projectName(request.getProjectName())
                .projectDescription(request.getProjectDescription())
                .build();
    }

    public Project toEntity() {
        return Project.builder()
                .projectName(projectName)
                .projectDescription(projectDescription)
                .build();
    }
}
