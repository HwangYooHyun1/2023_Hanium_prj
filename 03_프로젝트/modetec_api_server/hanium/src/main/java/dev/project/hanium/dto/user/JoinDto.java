package dev.project.hanium.dto.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JoinDto {
    private String username;
    private String passwd;
}
