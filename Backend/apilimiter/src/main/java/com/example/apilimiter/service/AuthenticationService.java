package com.example.apilimiter.service;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.apilimiter.dto.LoginRequestDto;
import com.example.apilimiter.dto.LoginResponseDto;
import com.example.apilimiter.dto.RegisterRequestDto;
import com.example.apilimiter.dto.RegisterResponseDto;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.UserRepo;
import com.example.apilimiter.security.AuthUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final AuthUtil authUtil;
    private final UserRepo userRepo;
    private final PasswordEncoder passwordencoder;

    public LoginResponseDto login(LoginRequestDto loginRequestDto) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword()));

        User user = (User) authentication.getPrincipal();

        String token = authUtil.generateaccesstoken(user);

        return new LoginResponseDto(token, user.getId(),user.getUsername());
    }

    public RegisterResponseDto register(RegisterRequestDto registerRequestDto) {
        User user = userRepo.findByUsername(registerRequestDto.getUsername())
                .orElse(null);

        if (user != null)
            throw new IllegalArgumentException("The user already exists.");

        user = userRepo.save(
                User.builder().username(registerRequestDto.getUsername()).password(passwordencoder.encode(registerRequestDto.getPassword()))
                        .email(registerRequestDto.getEmail())
                        .build());

        return new RegisterResponseDto(user.getUsername(), user.getEmail());

    }

}
