package com.example.apilimiter.service;

import org.springframework.beans.factory.annotation.Autowired;
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

    public Object fetch(String apiUrl){
       return restTemplate.getForObject(apiUrl, Object.class);

    }
}
