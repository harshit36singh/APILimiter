package com.example.apilimiter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.example.apilimiter.dto.LoginRequestDto;
import com.example.apilimiter.dto.LoginResponseDto;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.UserRepo;
import com.example.apilimiter.security.AuthUtil;
import com.example.apilimiter.service.AuthenticationService;

@ExtendWith(MockitoExtension.class)
class AuthenticationServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private AuthUtil authUtil;

    @Mock
    private UserRepo userRepo;

    @Mock
    private PasswordEncoder encoder;

    @InjectMocks
    private AuthenticationService authenticationService;

    @Test
    void loginShouldReturnJwt() {
        User user = User.builder().id(1L).username("john").build();
        Authentication auth =
                new UsernamePasswordAuthenticationToken(user, null);

        when(authenticationManager.authenticate(any())).thenReturn(auth);
        when(authUtil.generateaccesstoken(user)).thenReturn("jwt123");

        LoginResponseDto res =
                authenticationService.login(new LoginRequestDto("john", "pwd"));

        assertEquals("jwt123", res.getJwt());
        assertEquals("john", res.getUsername());
    }
}
