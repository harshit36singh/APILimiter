package com.example.apilimiter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apilimiter.entities.Log;

@Repository
public interface LogRepo extends JpaRepository<Log,Long>{
    
List<Log> findByProjectIdOrderByTimestampDesc(Long projectId);

}
