package com.example.apilimiter.service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Service;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.BucketConfiguration;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import com.example.apilimiter.entities.Api_Key;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RateLimitingService {

    private final ProxyManager<String> proxyManager;

    public boolean tryConsume(Api_Key apiKey) {

        String redisKey = "rate_limit:apikey:" + apiKey.getId();

        BucketConfiguration config = BucketConfiguration.builder()
                .addLimit(Bandwidth.classic(
                        apiKey.getRatelimit(),
                        Refill.intervally(
                                apiKey.getRatelimit(),
                                Duration.ofSeconds(apiKey.getRatelimitwindow())
                        )
                ))
                .build();

        Bucket bucket = proxyManager.builder()
                .build(redisKey, config);

        return bucket.tryConsume(1);
    }
}
