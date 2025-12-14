package com.example.apilimiter.controller;

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
                        @RequestHeader("Authorization") String apiheader,
                        HttpServletRequest request) {

                String apikey = apiheader.replace("apik_", "");

                Api_Key key = api_KeyService.validatkey(apikey);
                Project project = projectRepo.findByShortname(shortname)
                                .orElseThrow(() -> new RuntimeException("Project not found"));

                if (!key.getProject().getId().equals(project.getId())) {
                        throw new IllegalArgumentException("This api_key doesn't belong to this project .");
                }

                String ip = request.getRemoteAddr();
                logService.logvisit(project.getId(), ip);

                Object result = clientUseAPIService.fetch(project.getApi_url());

                return ResponseEntity.ok(result);
        }

}
