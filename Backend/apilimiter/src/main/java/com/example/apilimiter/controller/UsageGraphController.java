package com.example.apilimiter.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.apilimiter.service.UsageGraphService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/usagegraph")
public class UsageGraphController {
    private final UsageGraphService usageGraphService;

    @GetMapping("/apikey/24/{id}")
    public ResponseEntity<?> apikeyusagelast24hrs(@PathVariable("id") Long id) {
        return ResponseEntity.ok(usageGraphService.apikeyusedlast24hrs(id));
    }

    @GetMapping("project/daily/{id}")
    public ResponseEntity<?> projectdailyreport(@PathVariable("id") Long projectid) {
        return ResponseEntity.ok(usageGraphService.dailyprojectreport(projectid));
    }
}
