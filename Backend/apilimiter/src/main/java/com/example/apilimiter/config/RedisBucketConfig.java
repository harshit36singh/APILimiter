package com.example.apilimiter.config;
import io.github.bucket4j.distributed.proxy.ProxyManager;
import io.github.bucket4j.redis.lettuce.cas.LettuceBasedProxyManager;

import io.lettuce.core.RedisClient;
import io.lettuce.core.api.StatefulRedisConnection;
import io.lettuce.core.api.async.RedisAsyncCommands;
import io.lettuce.core.codec.StringCodec;
import io.lettuce.core.codec.ByteArrayCodec;
import io.lettuce.core.codec.RedisCodec;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class RedisBucketConfig {

    @Bean
    public RedisClient redisClient() {
        return RedisClient.create("redis://localhost:6379");
    }

    @Bean
    public RedisAsyncCommands<String, byte[]> redisAsyncCommands(RedisClient redisClient) {
    RedisCodec<String, byte[]> codec =
                RedisCodec.of(new StringCodec(), new ByteArrayCodec());

        StatefulRedisConnection<String, byte[]> connection =
                redisClient.connect(codec);

        return connection.async();
    }

    @Bean
    public ProxyManager<String> proxyManager(
            RedisAsyncCommands<String, byte[]> redisAsyncCommands) {

        return LettuceBasedProxyManager
                .builderFor(redisAsyncCommands)
                .build();
    }
}

