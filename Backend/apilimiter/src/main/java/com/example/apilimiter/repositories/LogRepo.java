package com.example.apilimiter.repositories;

import java.time.Instant;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import com.example.apilimiter.dto.Api_KeyUsageDto;
import com.example.apilimiter.dto.UsageDto;
import com.example.apilimiter.entities.Log;
import io.lettuce.core.dynamic.annotation.Param;

@Repository
public interface LogRepo extends JpaRepository<Log,Long>{
    
List<Log> findByProjectIdOrderByTimestampDesc(Long projectId);


@Query("""
    Select new com.example.apilimiter.dto.Api_KeyUsageDto(
    k.id,
    k.keyValue,
    COUNT(l.id),
    MAX(l.timestamp)
    )
    from Log l
    Join l.api_Key k
    where l.projectId=:projectId
    Group By k.id,k.keyValue  
        """)
List<Api_KeyUsageDto> getusagebyProject(@Param("projectId") Long projectId);



@Query(
value = """
SELECT 
    DATE_FORMAT(l.timestamp, '%Y-%m-%d %H:00:00') AS bucket,
    COUNT(l.id) AS count
FROM visit_logs l
WHERE l.api_key = :id
  AND l.timestamp >= :fromTs
GROUP BY bucket
ORDER BY bucket
""",
nativeQuery = true
)
List<Object[]> hourlyusageByApikeyNative(
    @Param("id") Long id,
    @Param("fromTs") Instant fromTs
);

@Query(
value = """
SELECT 
  DATE(timestamp) AS day,
  COUNT(id) AS count
FROM visit_logs
WHERE project_id = :id
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp)
""",
nativeQuery = true
)
List<UsageDto> dailyUsageByProject(@Param("id") Long id);

}
