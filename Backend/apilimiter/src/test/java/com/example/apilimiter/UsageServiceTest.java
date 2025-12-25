package com.example.apilimiter;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.apilimiter.dto.Api_KeyUsageDto;
import com.example.apilimiter.repositories.LogRepo;
import com.example.apilimiter.service.UsageService;

@ExtendWith(MockitoExtension.class)
class UsageServiceTest {

    @Mock
    private LogRepo logRepo;

    @InjectMocks
    private UsageService usageService;

    @Test
    void shouldReturnUsageStats() {
        when(logRepo.getusagebyProject(1L))
                .thenReturn(List.of());

        List<Api_KeyUsageDto> result =
                usageService.getallprojectsusage(1L);

        assertNotNull(result);
    }
}
