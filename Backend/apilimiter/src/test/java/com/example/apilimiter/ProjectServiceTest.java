package com.example.apilimiter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.modelmapper.ModelMapper;

import com.example.apilimiter.dto.ProjectRequest;
import com.example.apilimiter.entities.Project;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.ProjectRepo;
import com.example.apilimiter.service.ProjectService;
@ExtendWith(MockitoExtension.class)
class ProjectServiceTest {

    @Mock
    private ProjectRepo projectRepo;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ProjectService projectService;

    @Test
    void shouldGenerateUniqueShortname() {
        User user = User.builder().id(1L).build();

        when(projectRepo.existsByOwnerIdAndShortname(anyLong(), anyString()))
                .thenReturn(false);

        ProjectRequest req = new ProjectRequest();
        req.setName("My API");

        Project saved = Project.builder().shortname("my-api").build();
        when(projectRepo.save(any())).thenReturn(saved);

        Project result = projectService.createProject(user, req);

        assertEquals("my-api", result.getShortname());
    }
}
