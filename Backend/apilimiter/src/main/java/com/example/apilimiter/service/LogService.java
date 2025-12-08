package com.example.apilimiter.service;

import java.time.Instant;

import org.springframework.stereotype.Service;

import com.example.apilimiter.entities.Log;
import com.example.apilimiter.repositories.LogRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepo logRepo;

    public void logvisit(Long projectId, String ip) {
        Log log = Log.builder().projectId(projectId).ipAddress(ip).timestamp(Instant.now()).build();
        logRepo.save(log);
    }
    
}
