package com.example.apilimiter.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.apilimiter.entities.Project;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long>{
    
    List<Project> findByOwnerId(Long ownerid);

    Optional<Project> findByIdandOwnerId(Long projectId,Long ownerId);

    boolean existsByOwnerandShortname(Long ownerId,String shortname);



}
