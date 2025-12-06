package com.example.apilimiter.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.apilimiter.dto.ProjectRequest;
import com.example.apilimiter.dto.ProjectResponse;
import com.example.apilimiter.entities.Project;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.service.ProjectService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projects")
@RequiredArgsConstructor
public class ProjectController {

    private final ProjectService projectService;
    private final ModelMapper mapper;

    private User getUser(Authentication auth) {
        return (User) auth.getPrincipal();
    }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> list(Authentication auth) {
        User user = getUser(auth);
        List<Project> projects = projectService.listOfProjects(user);

        return ResponseEntity
                .ok(projects.stream().map(c -> mapper.map(c, ProjectResponse.class)).collect(Collectors.toList()));

    }

    @PostMapping
    public ResponseEntity<ProjectResponse> create(@RequestBody ProjectRequest req,Authentication auth){
        User user=getUser(auth);
        Project project=projectService.createProject(user, req);

        return ResponseEntity.ok(mapper.map(project, ProjectResponse.class));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> get(@PathVariable Long id,Authentication auth){
        User user=getUser(auth);
        Project p=projectService.getproject(user, id);
        return ResponseEntity.ok(mapper.map(p, ProjectResponse.class));

    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> update(@PathVariable Long id,@RequestBody ProjectRequest req,Authentication auth){
        User user=getUser(auth);
        Project project=projectService.updateProject(user, id, req);
        return ResponseEntity.ok(mapper.map(project, ProjectResponse.class));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id,Authentication auth){
        User user=getUser(auth);

        projectService.deleteProject(user, id);

        return ResponseEntity.noContent().build();
    }



}
