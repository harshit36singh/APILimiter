package com.example.apilimiter.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LogResponse {
    private Long id;
    private String ipaddress;
    private Instant createdAt;
    private Long apikeyid;
    private String apikeyval;
}
