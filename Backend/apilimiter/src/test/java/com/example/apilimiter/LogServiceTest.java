package com.example.apilimiter;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.apilimiter.entities.Api_Key;
import com.example.apilimiter.entities.Log;
import com.example.apilimiter.repositories.LogRepo;
import com.example.apilimiter.service.LogService;

@ExtendWith(MockitoExtension.class)
class LogServiceTest {

    @Mock
    private LogRepo logRepo;

    @InjectMocks
    private LogService logService;

    @Test
    void shouldSaveLog() {
        Api_Key key = Api_Key.builder().id(1L).build();

        logService.logvisit(10L, key, "127.0.0.1");

        verify(logRepo, times(1)).save(any(Log.class));
    }
}
