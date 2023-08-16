package dev.project.hanium.request.group;

import dev.project.hanium.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
public class CreateProjectRequest {
    private String projectName;
    private String projectDescription;
}
