package com.example.apilimiter.dto;

import java.time.Instant;

import lombok.Data;

@Data
public class ProjectResponse {
    private Long id;
    private String name;
    private String desc;
    private Instant createdAt;
    private Instant updatedAt;
    private String shortname;
}
