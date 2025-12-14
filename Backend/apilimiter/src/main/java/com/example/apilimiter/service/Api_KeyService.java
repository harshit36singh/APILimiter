package com.example.apilimiter.service;

import java.net.ResponseCache;
import java.time.Instant;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.apilimiter.dto.Api_KeyResponse;
import com.example.apilimiter.entities.Api_Key;
import com.example.apilimiter.entities.Project;
import com.example.apilimiter.entities.User;
import com.example.apilimiter.repositories.Api_KeyRepo;
import com.example.apilimiter.repositories.ProjectRepo;
import com.example.apilimiter.util.Api_Key_Generator;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class Api_KeyService {

    private final Api_KeyRepo api_KeyRepo;
    private final ProjectRepo projectRepo;
    private final Api_Key_Generator api_Key_Generator;

    public ResponseEntity<Api_KeyResponse> createkey(User owner, Long pid) {
        Project project = projectRepo.findById(pid)
                .orElseThrow(() -> new IllegalArgumentException("Can't find this project ."));

        if (!project.getOwner().getId().equals(owner.getId())) {
            throw new IllegalArgumentException("Unauthorized");
        }

        Api_Key api_key = Api_Key.builder().keyValue(api_Key_Generator.generateapikey()).project(project)
                .createdAt(Instant.now()).build();

    api_KeyRepo.save(api_key);

    return ResponseEntity.ok(new Api_KeyResponse(
        api_key.getId(),
        api_key.getKeyValue(),
        api_key.getCreatedAt()
    ));
    }

    public List<Api_Key> getallapikeyforaparticularproject(User owner, Long projectid) {
        return api_KeyRepo.findByProjectId(projectid);

    }

    public void disablekey(User owner, Long keyid) {
        Api_Key apikey = api_KeyRepo.findById(keyid)
                .orElseThrow(() -> new IllegalArgumentException("No such apikey exists"));

        apikey.setActive(false);
        api_KeyRepo.save(apikey);

    }

    public Api_Key validatkey(String key) {
        return api_KeyRepo.findByKeyValue(key).filter(Api_Key::isActive)
                .orElseThrow(() -> new IllegalArgumentException("Invalid Api key"));
    }

}
