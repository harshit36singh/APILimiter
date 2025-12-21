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



@Query("""
    Select new com.example.apilimiter.dto.UsageDto(
    Function('DATE_FORMAT',l.timestamp, '%Y-%m-%d %H:00:00'),
    Count(l.id)
    )
    from Log l
    where l.api_Key.id=:id
    and l.timestamp>=:when
    Group By Function('DATE_FORMAT','l.timestamp','%Y-%m-%d %H')
    Order By Function("DATE_FORMAT",l.timestamp,'%Y-%m-%d %H')    
        """)
List<UsageDto> hourlyusageByApikey(
    @Param("id") Long apikeyid,
    @Param("when") Instant tlong
);




@Query("""
        Select new com.example.apilimiter.dto.UsageDto(
        Function("DATE" ,l.timestamp),
        Count(l.id))
        from Log l
        where l.projectId=:id
        group by function('DATE',l.timestamp)
        order by function('DATE',l.timestamp)
        """)
List<UsageDto> dailyUsageByProject(@Param("id") Long projectid);
}
