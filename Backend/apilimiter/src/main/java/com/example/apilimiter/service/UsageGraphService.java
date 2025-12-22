package com.example.apilimiter.service;


import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.apilimiter.dto.UsageDto;
import com.example.apilimiter.repositories.LogRepo;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsageGraphService {
    
    private final LogRepo logRepo;
public List<UsageDto> apikeyusedlast24hrs(Long apiId) {
    return logRepo.hourlyusageByApikeyNative(
            apiId,
            Instant.now().minus(24, ChronoUnit.HOURS)
    ).stream()
     .map(r -> new UsageDto(
             r[0].toString(),
             ((Number) r[1]).longValue()
     ))
     .toList();
}



    public List<UsageDto> dailyprojectreport(Long projectid){
        return logRepo.dailyUsageByProject(projectid);
    }
}
