package com.example.apilimiter.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apilimiter.dto.LogResponse;
import com.example.apilimiter.entities.Api_Key;
import com.example.apilimiter.entities.Log;
import com.example.apilimiter.repositories.LogRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogService {
    private final LogRepo logRepo;

    public void logvisit(Long projectid, Api_Key api_Key, String ip) {
        Log log = Log.builder().ipAddress(ip).api_Key(api_Key).projectId(projectid).timestamp(Instant.now()).build();
        logRepo.save(log);
    }

    public List<LogResponse> getlogsprojectwise(Long projectid) {
        return logRepo.findByProjectIdOrderByTimestampDesc(projectid).stream().map(log -> new LogResponse(log.getId(),
                log.getIpAddress(), log.getTimestamp(), log.getApi_Key().getId(), log.getApi_Key().getKeyValue()))
                .toList();
    }

}
