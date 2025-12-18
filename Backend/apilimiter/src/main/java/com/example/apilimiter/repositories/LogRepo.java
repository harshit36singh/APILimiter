package com.example.apilimiter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.apilimiter.dto.Api_KeyResponseDto;
import com.example.apilimiter.entities.Log;

@Repository
public interface LogRepo extends JpaRepository<Log,Long>{
    
List<Log> findByProjectIdOrderByTimestampDesc(Long projectId);


@Query("""
    Select new com.example.apilimiter.dto.Api_keyResponseDto(
    k.id,
    k.apikey,
    COUNT(k.totalreq),
    MAX(k.lastusedtime)
    )
    from Log l
    Join l.api_key k
    where l.projectid=:projectid
    Group By k.id,k.keyValue  
        """)
List<Api_KeyResponseDto> getusagebyProject(@PathVariable("projectid") Long projectid);
}
