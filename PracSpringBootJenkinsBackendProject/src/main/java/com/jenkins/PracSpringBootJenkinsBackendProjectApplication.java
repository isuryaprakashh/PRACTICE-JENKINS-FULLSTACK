package com.jenkins;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PracSpringBootJenkinsBackendProjectApplication extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(PracSpringBootJenkinsBackendProjectApplication.class, args);
		System.out.println("Practice Jenkins Spring Boot Backend Project is Running!!! ");
	}

}
