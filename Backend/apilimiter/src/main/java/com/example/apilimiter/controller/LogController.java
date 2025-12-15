package com.example.apilimiter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.apilimiter.entities.Project;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.ProjectRepo;
import com.example.apilimiter.service.LogService;
import com.example.apilimiter.util.UserAuthHelper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/logs")
@RequiredArgsConstructor
public class LogController extends UserAuthHelper {
    private final LogService logService;
    private final ProjectRepo projectRepo;

    @GetMapping("{shortname}")
    public ResponseEntity<?> getprojectlogs(@PathVariable String shortname, Authentication auth) {
        User owner = getUser(auth);

        Project project = projectRepo.findByShortname(shortname)
                .orElseThrow(() -> new IllegalArgumentException("No such projct found ."));

        if (!project.getOwner().getId().equals(owner.getId())) {
            throw new IllegalArgumentException("Unauthorized user");
        }

        return ResponseEntity.ok(logService.getlogsprojectwise(project.getId()));

    }

}
