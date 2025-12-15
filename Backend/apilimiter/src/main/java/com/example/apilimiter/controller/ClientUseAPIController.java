package com.example.apilimiter.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.apilimiter.entities.Api_Key;
import com.example.apilimiter.entities.Project;
import com.example.apilimiter.repositories.ProjectRepo;
import com.example.apilimiter.service.Api_KeyService;
import com.example.apilimiter.service.ClientUseAPIService;
import com.example.apilimiter.service.LogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/apilimiter")
@RequiredArgsConstructor
public class ClientUseAPIController {
    private final ClientUseAPIService clientUseAPIService;
    private final LogService logService;
    private final ProjectRepo projectRepo;
    private final Api_KeyService api_KeyService;

    @GetMapping("/{shortname}")
    public ResponseEntity<?> publicApiResult(
            @PathVariable String shortname,
            @RequestHeader(value = "Authorization", required = false) String apiheader,
            HttpServletRequest request) {

        System.out.println("========================================");
        System.out.println("🎯 CONTROLLER REACHED!");
        System.out.println("Shortname: " + shortname);
        System.out.println("Authorization header: " + apiheader);
        System.out.println("========================================");

        if (apiheader == null || apiheader.isEmpty()) {
            System.out.println("❌ No Authorization header!");
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No Authorization header provided");
        }

        try {
            String apikey = apiheader.replace("apik_", "");
            System.out.println("Extracted API key: " + apikey);

            Api_Key key = api_KeyService.validatkey(apikey);
            System.out.println("✅ API Key validated - ID: " + key.getId());
            
            Project project = projectRepo.findByShortname(shortname)
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            System.out.println("✅ Project found - ID: " + project.getId() + ", Name: " + project.getName());

            System.out.println("Key's project ID: " + key.getProject().getId());
            System.out.println("Request project ID: " + project.getId());

            if (!key.getProject().getId().equals(project.getId())) {
                System.out.println("❌ PROJECT MISMATCH!");
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("This api_key doesn't belong to this project.");
            }

            String ip = request.getRemoteAddr();
            System.out.println("Logging visit from IP: " + ip);
            logService.logvisit(project.getId(), ip);

            System.out.println("Fetching from: " + project.getApi_url());
            Object result = clientUseAPIService.fetch(project.getApi_url());
            
            System.out.println("✅✅✅ SUCCESS! ✅✅✅");

            return ResponseEntity.ok(result);
            
        } catch (Exception e) {
            System.out.println("❌❌❌ EXCEPTION: " + e.getClass().getName());
            System.out.println("❌ MESSAGE: " + e.getMessage());
            e.printStackTrace();
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}