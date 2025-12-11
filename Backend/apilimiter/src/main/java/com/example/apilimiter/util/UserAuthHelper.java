package com.example.apilimiter.util;

import org.springframework.security.core.Authentication;

import com.example.apilimiter.entities.User;

public abstract class UserAuthHelper {

    public User getUser(Authentication auth) {
        return (User) auth.getPrincipal();
    }

}
