package com.example.apilimiter.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI apilimiteropenapi(){
        return new OpenAPI().info(new Info().title("APILimiter")
    .description("""
         API management platform with:
                        - JWT Authentication
                        - API Key authorization
                        - Redis-based Rate Limiting
                        - Usage analytics & logging
            """)
            .version("1.0.0")
        .contact(new Contact().name("Harshit Singh").email("singhharshit3636@gmai.com")));
    }
}
