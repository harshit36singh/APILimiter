package com.example.apilimiter.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Api_KeyResponse {
    Long id;
    String apikey;
    Instant CreatedAt;
}
