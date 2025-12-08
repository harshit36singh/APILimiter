package com.example.apilimiter.dto;

import lombok.Data;

@Data
public class ProjectRequest {
    private String name;
    private String des;
    private String shortname;
    private String api_url;


}
