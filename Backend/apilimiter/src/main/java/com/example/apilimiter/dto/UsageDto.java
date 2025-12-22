package com.example.apilimiter.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsageDto {
    
    private Object buckettime;
    private Long count;
}
