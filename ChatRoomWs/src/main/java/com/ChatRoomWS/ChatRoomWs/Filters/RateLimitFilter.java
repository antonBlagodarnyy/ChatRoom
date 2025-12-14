package com.ChatRoomWS.ChatRoomWs.Filters;

import com.ChatRoomWS.ChatRoomWs.Interceptors.ConnectionLimitInterceptor;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    private static final Logger LOG = LoggerFactory.getLogger(RateLimitFilter.class);

    private static Bucket bucket = Bucket.builder()
            .addLimit(limit -> limit.capacity(50).refillGreedy(10, Duration.ofMinutes(1)))
            .build();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    if(bucket.tryConsume(1)){
        filterChain.doFilter(request,response);
    } else{

        response.sendError(409);

    }

    }
}
