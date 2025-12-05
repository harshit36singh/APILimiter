package com.example.apilimiter.dto;

import lombok.Data;

@Data
public class ProjectRequest {
    private String name;
    private String desc;
    private String shortname;
    private String api_url;


}
