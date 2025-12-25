package com.example.apilimiter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
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
public class ProjectServiceTest {

    @Mock
    private ProjectRepo projectRepo;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private ProjectService projectService;

    private User owner;

    @BeforeEach
    void setUp() {
        owner = User.builder()
                .id(1L)
                .email("test@test.com")
                .build();
    }

    @Test
    void listOfProjects_shouldReturnProjects() {
        List<Project> projects = List.of(
                Project.builder().id(1L).name("Test").owner(owner).build()
        );

        when(projectRepo.findByOwnerId(owner.getId())).thenReturn(projects);

        List<Project> result = projectService.listOfProjects(owner);

        assertEquals(1, result.size());
        verify(projectRepo).findByOwnerId(owner.getId());
    }

    @Test
    void createProject_shouldGenerateShortnameAndSave() {
        ProjectRequest req = new ProjectRequest();
        req.setName("My Project");
        req.setDes("Description");

        when(projectRepo.existsByOwnerIdAndShortname(eq(owner.getId()), anyString()))
                .thenReturn(false);

        when(projectRepo.save(any(Project.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Project project = projectService.createProject(owner, req);

        assertEquals("my-project", project.getShortname());
        assertEquals("My Project", project.getName());
        assertEquals(owner, project.getOwner());

        verify(projectRepo).save(any(Project.class));
    }

    @Test
    void createProject_shouldAppendNumberWhenShortnameExists() {
        ProjectRequest req = new ProjectRequest();
        req.setName("My Project");

        when(projectRepo.existsByOwnerIdAndShortname(owner.getId(), "my-project"))
                .thenReturn(true);
        when(projectRepo.existsByOwnerIdAndShortname(owner.getId(), "my-project-1"))
                .thenReturn(false);

        when(projectRepo.save(any(Project.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Project project = projectService.createProject(owner, req);

        assertEquals("my-project-1", project.getShortname());
    }

    @Test
    void getProject_shouldReturnProject() {
        Project project = Project.builder()
                .id(1L)
                .owner(owner)
                .build();

        when(projectRepo.findByIdAndOwnerId(1L, owner.getId()))
                .thenReturn(Optional.of(project));

        Project result = projectService.getproject(owner, 1L);

        assertNotNull(result);
    }

    @Test
    void getProject_shouldThrowWhenNotFound() {
        when(projectRepo.findByIdAndOwnerId(1L, owner.getId()))
                .thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class,
                () -> projectService.getproject(owner, 1L));
    }

    @Test
    void updateProject_shouldUpdateFields() {
        Project project = Project.builder()
                .id(1L)
                .name("Old")
                .des("Old desc")
                .owner(owner)
                .build();

        ProjectRequest req = new ProjectRequest();
        req.setName("New");
        req.setDes("New desc");

        when(projectRepo.findByIdAndOwnerId(1L, owner.getId()))
                .thenReturn(Optional.of(project));
        when(projectRepo.save(project)).thenReturn(project);

        Project updated = projectService.updateProject(owner, 1L, req);

        assertEquals("New", updated.getName());
        assertEquals("New desc", updated.getDes());
    }

    @Test
    void deleteProject_shouldDelete() {
        Project project = Project.builder()
                .id(1L)
                .owner(owner)
                .build();

        when(projectRepo.findByIdAndOwnerId(1L, owner.getId()))
                .thenReturn(Optional.of(project));

        projectService.deleteProject(owner, 1L);

        verify(projectRepo).delete(project);
    }
}

