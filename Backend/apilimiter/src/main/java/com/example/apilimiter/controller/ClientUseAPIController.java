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
import com.example.apilimiter.service.RateLimitingService;
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
    private final RateLimitingService rateLimitingService;
    @GetMapping("/{shortname}")
    public ResponseEntity<?> publicApiResult(
            @PathVariable String shortname,
            @RequestHeader(value = "Authorization", required = false) String apiheader,
            HttpServletRequest request) {

        if (apiheader == null || apiheader.isEmpty()) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("No Authorization header provided");
        }

        try {
            String apikey = apiheader.replace("apik_", "");
            Api_Key key = api_KeyService.validatkey(apikey);
            Project project = projectRepo.findByShortname(shortname)
                    .orElseThrow(() -> new RuntimeException("Project not found"));
            if (!key.getProject().getId().equals(project.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("This api_key doesn't belong to this project.");
            }

            if(!rateLimitingService.tryConsume(key)){
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate Limit Exceeded");
            }
            String ip = request.getRemoteAddr();
            logService.logvisit(project.getId(), key, ip);
            Object result = clientUseAPIService.fetch(project.getApi_url());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());
        }
    }
}