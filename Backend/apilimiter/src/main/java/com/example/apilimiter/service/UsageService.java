package com.example.apilimiter.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.example.apilimiter.dto.Api_KeyUsageDto;
import com.example.apilimiter.repositories.LogRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsageService {
    
    private final LogRepo logRepo;

    public List<Api_KeyUsageDto> getallprojectsusage(Long projectid){
        return logRepo.getusagebyProject(projectid);
    }
}
