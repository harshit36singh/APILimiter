package com.example.apilimiter.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apilimiter.entities.Api_Key;
import com.example.apilimiter.entities.Log;
import com.example.apilimiter.repositories.LogRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepo logRepo;

    public void logvisit(Api_Key api_Key, String ip) {
        Log log = Log.builder().ipAddress(ip).api_Key(api_Key).timestamp(Instant.now()).build();
        logRepo.save(log);
    }

    public List<Log> getlogsprojectwise(Long projectid){
        return logRepo.findByProjectIdOrderByTimestampDesc(projectid);
    }
    
}
