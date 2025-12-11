package com.example.apilimiter.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.apilimiter.service.Api_KeyService;
import com.example.apilimiter.util.UserAuthHelper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class Api_KeyController extends UserAuthHelper{
    
    private final Api_KeyService api_keyservice;

    
}
