package dev.project.hanium.config.filter;

import dev.project.hanium.global.UrlStringList;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class GlobalConfig {
    @Bean
    public UrlStringList urlStringList() {
        return new UrlStringList();
    }
}
