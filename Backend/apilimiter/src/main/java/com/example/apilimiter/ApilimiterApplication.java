package com.example.apilimiter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@EnableJpaAuditing
@SpringBootApplication
@EntityScan(basePackages = "com.example.apilimiter.entities")
public class ApilimiterApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApilimiterApplication.class, args);
	}

}
