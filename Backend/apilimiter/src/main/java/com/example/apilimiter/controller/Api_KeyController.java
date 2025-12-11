package com.example.apilimiter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apilimiter.entities.User;
import com.example.apilimiter.service.Api_KeyService;
import com.example.apilimiter.util.UserAuthHelper;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/apikeys")
public class Api_KeyController extends UserAuthHelper{
    
    private final Api_KeyService api_keyservice;

    @PostMapping("/{id}")
    public ResponseEntity<?> generatekey(@PathVariable("id") Long projectid,Authentication auth){
        User owner=(User)getUser(auth);
        return ResponseEntity.ok(api_keyservice.createkey(owner, projectid));
    
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> listofkeysforaparticularproject(@PathVariable("id") Long projectId,Authentication auth){
        User owner=(User)getUser(auth);
        return ResponseEntity.ok(api_keyservice.getallapikeyforaparticularproject(owner, projectId));
    
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> disablekey(@PathVariable("id") Long keyid,Authentication auth){
        User owner=(User)getUser(auth);
        api_keyservice.disablekey(owner, keyid);
        return ResponseEntity.noContent().build();
        
    }


}
