package com.example.apilimiter.util;

import java.util.UUID;

import org.springframework.stereotype.Component;

@Component
public class Api_Key_Generator {
    public String generateapikey(){
        return "apik_"+UUID.randomUUID().toString().replace("-", "");
    }
}
