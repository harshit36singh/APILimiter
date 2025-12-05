package com.example.apilimiter.service;

import java.time.Instant;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.apilimiter.dto.ProjectRequest;
import com.example.apilimiter.entities.Project;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.ProjectRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepo projectRepo;
    private final ModelMapper modelmapperconfig;

    public List<Project> listOfProjects(User owner) {
        return projectRepo.findByOwnerId(owner.getId());

    }

    @Transactional
    public Project createProject(User owner, ProjectRequest req) {
        String shortname = (req.getShortname() == null || req.getShortname().isBlank())
                ? req.getName().toLowerCase().replaceAll("[^a-z0-9]", "-")
                : req.getShortname();
        int shortnameuniqueno = 1;
        String b = shortname;
        while (projectRepo.existsByOwnerandShortname(owner.getId(), shortname)) {
            shortname = b + "-" + shortnameuniqueno++;
        }

        Project project = Project.builder().name(req.getName()).shortname(shortname).desc(req.getDesc()).owner(owner)
                .createdAt(Instant.now()).updatedAt(Instant.now()).build();

        return projectRepo.save(project);

    }

    public Project getproject(User owner, Long projectId) {
        return projectRepo.findByIdandOwnerId(projectId, owner.getId())
                .orElseThrow(() -> new IllegalArgumentException("Project not found."));

    }

    public Project updateProject(User owner, Long id, ProjectRequest req) {
        Project project = getproject(owner, id);

        if (req.getName() != null)
            project.setName(req.getName());
        if (req.getDesc() != null)
            project.setDesc(req.getDesc());

        return projectRepo.save(project);

    }

    @Transactional
    public void deleteProject(User owner, Long id) {
        Project project = getproject(owner, id);
        projectRepo.delete(project);
    }

}
