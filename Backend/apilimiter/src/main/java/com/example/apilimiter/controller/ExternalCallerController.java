// package com.example.apilimiter.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// import org.springframework.web.client.RestTemplate;
// import com.example.apilimiter.entities.Project;
// import com.example.apilimiter.repositories.ProjectRepo;
// import com.example.apilimiter.service.LogService;
// import jakarta.servlet.http.HttpServletRequest;
// import lombok.RequiredArgsConstructor;


// @RestController
// @RequiredArgsConstructor
// @RequestMapping("/externalcaller")
// public class ExternalCallerController {

//     private final ProjectRepo projectRepo;
//     private final LogService logService;
//     private final RestTemplate restTemplate = new RestTemplate();

//     @GetMapping("/{id}")
//     public ResponseEntity<?> proxy(@PathVariable("id") String projectshortname, HttpServletRequest req,
//             Authentication auth) {
//         Project project = projectRepo.findByShortname(projectshortname)
//                 .orElseThrow(() -> new IllegalArgumentException("No such Api-Project found."));
//         String url = project.getApi_url();

//         String ipaddress=req.getRemoteAddr();

//         logService.logvisit(project.getId(),ipaddress);


//         String res;
//         try {
//             res = restTemplate.getForObject(url, String.class);
//         } catch (Exception e) {
//             return ResponseEntity.status(502).body("Failed to call external API : " + e.getMessage());
//         }
//         return ResponseEntity.ok(res);
//     }

// }
