package com.example.apilimiter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.apilimiter.dto.Api_KeyResponseDto;
import com.example.apilimiter.entities.Project;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.Api_KeyRepo;
import com.example.apilimiter.repositories.ProjectRepo;
import com.example.apilimiter.service.Api_KeyService;
import com.example.apilimiter.util.Api_Key_Generator;

@ExtendWith(MockitoExtension.class)
class ApiKeyServiceTest {

    @Mock
    private Api_KeyRepo apiKeyRepo;

    @Mock
    private ProjectRepo projectRepo;

    @Mock
    private Api_Key_Generator generator;

    @InjectMocks
    private Api_KeyService apiKeyService;

    @Test
    void shouldCreateApiKeyForOwner() {
        User owner = User.builder().id(1L).build();
        Project project = Project.builder().id(10L).owner(owner).build();

        when(projectRepo.findById(10L)).thenReturn(Optional.of(project));
        when(generator.generateapikey()).thenReturn("apik_test123");

        ResponseEntity<Api_KeyResponseDto> response =
                apiKeyService.createkey(owner, 10L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("apik_test123", response.getBody().getApikey());
    }

    @Test
    void shouldThrowIfUnauthorized() {
        User owner = User.builder().id(1L).build();
        User other = User.builder().id(2L).build();

        Project project = Project.builder().id(10L).owner(other).build();

        when(projectRepo.findById(10L)).thenReturn(Optional.of(project));

        assertThrows(IllegalArgumentException.class,
                () -> apiKeyService.createkey(owner, 10L));
    }
}
