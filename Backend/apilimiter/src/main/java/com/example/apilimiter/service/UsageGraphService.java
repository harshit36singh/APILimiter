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

    public List<UsageDto> apikeyusedlast24hrs(Long apiLong){
        return logRepo.hourlyusageByApikey(apiLong, Instant.now().minus(24,ChronoUnit.HOURS));
    }


    public List<UsageDto> dailyprojectreport(Long projectid){
        return logRepo.dailyUsageByProject(projectid);
    }
}
