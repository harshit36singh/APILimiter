package com.example.apilimiter.service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;

import com.example.apilimiter.entities.Api_Key;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RateLimitingService {
    private final Map<Long, Bucket> buckets = new ConcurrentHashMap<>();

    public Bucket ratelimitusingbucket(Api_Key api_Key) {
        return buckets.computeIfAbsent(api_Key.getId(), id -> Bucket4j.builder()
                .addLimit(Bandwidth.classic(api_Key.getRatelimit(),
                        Refill.intervally(api_Key.getRatelimit(), Duration.ofSeconds(api_Key.getRatelimitwindow()))))
                .build());
    }

    public boolean chkandconsume(Api_Key api_Key){
        Bucket bucket=buckets.computeIfAbsent(api_Key.getId(), id->Bucket4j.builder().addLimit(Bandwidth.classic(api_Key.getRatelimit(), Refill.intervally(api_Key.getRatelimit(), Duration.ofSeconds(api_Key.getRatelimitwindow())))).build());

        return bucket.tryConsume(1);

    }
}
