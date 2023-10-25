package dev.project.hanium;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class HaniumApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaniumApplication.class, args);
	}

}
