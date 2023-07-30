package dev.project.hanium;

import net.bytebuddy.implementation.bind.annotation.IgnoreForBinding;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication
public class HaniumApplication {

	public static void main(String[] args) {
		SpringApplication.run(HaniumApplication.class, args);
	}

}
