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
import com.example.apilimiter.service.UsageService;
import com.example.apilimiter.util.UserAuthHelper;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/usage")
@RequiredArgsConstructor
public class UsageController extends UserAuthHelper {

    private final UsageService usageService;
    private final ProjectRepo projectRepo;

    @GetMapping("/{name}")
    public ResponseEntity<?> usage(@PathVariable("name") String shortname, Authentication auth) {
        User owner = getUser(auth);
        Project project = projectRepo.findByShortname(shortname)
                .orElseThrow(() -> new IllegalArgumentException("No such project found"));
        if (!project.getOwner().getId().equals(owner.getId())) {
            throw new IllegalArgumentException("Unauthorized");
        }

        return ResponseEntity.ok(usageService.getallprojectsusage(project.getId()));
    }
}
