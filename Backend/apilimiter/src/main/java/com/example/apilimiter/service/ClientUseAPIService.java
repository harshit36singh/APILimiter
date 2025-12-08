package com.example.apilimiter.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.apilimiter.entities.Project;
import com.example.apilimiter.repositories.ProjectRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientUseAPIService {
    private final RestTemplate restTemplate;
    private final ProjectRepo projectRepo;

    public Object fetchByShortname(String shortname){
        Project project=projectRepo.findByShortname(shortname).orElseThrow(()->new IllegalArgumentException("the project not found"));
        return restTemplate.getForObject(project.getApi_url(), Object.class);
        
    }
}
