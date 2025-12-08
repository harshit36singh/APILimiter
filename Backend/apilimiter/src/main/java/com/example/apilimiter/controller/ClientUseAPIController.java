package com.example.apilimiter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apilimiter.service.ClientUseAPIService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/apilimiter")
@RequiredArgsConstructor
public class ClientUseAPIController {
    private final ClientUseAPIService clientUseAPIService;


    @GetMapping("/{name}")
    public ResponseEntity<?> publicApiResult(@PathVariable("name") String shortname){
        Object object=clientUseAPIService.fetchByShortname(shortname);
        return ResponseEntity.ok(object);

    }
    
}
