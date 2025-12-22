package com.example.apilimiter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.apilimiter.dto.LoginRequestDto;
import com.example.apilimiter.dto.LoginResponseDto;
import com.example.apilimiter.dto.RegisterRequestDto;
import com.example.apilimiter.dto.RegisterResponseDto;
import com.example.apilimiter.service.AuthenticationService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto loginRequestDto){
        return ResponseEntity.ok(authenticationService.login(loginRequestDto));
    } 

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDto> register(@RequestBody RegisterRequestDto registerRequestDto){
        return ResponseEntity.ok(authenticationService.register(registerRequestDto));
    } 
  
    
}
