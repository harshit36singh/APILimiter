package com.example.apilimiter.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.apilimiter.entities.Api_Key;

public interface Api_KeyRepo  extends JpaRepository<Api_Key,Long>{

    Optional<Api_Key> findByKeyValue(String keyValue);

    List<Api_Key> findByProjectId(Long projectid);
    
}
