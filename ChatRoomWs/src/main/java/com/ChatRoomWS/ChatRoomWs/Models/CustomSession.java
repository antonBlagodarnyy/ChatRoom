package com.ChatRoomWS.ChatRoomWs.Models;

import io.github.bucket4j.Bucket;
import org.springframework.web.socket.WebSocketSession;

import java.time.Duration;

public class CustomSession {
    private WebSocketSession webSocketSession;
    private Bucket bucket;
    private String username;

    public CustomSession(WebSocketSession session) {
        this.bucket = Bucket.builder()
                .addLimit(limit -> limit.capacity(5)
                        .refillGreedy(1, Duration.ofMinutes(1)))
                .build();
        this.webSocketSession = session;
    }

    public WebSocketSession getWebSocketSession() {
        return webSocketSession;
    }

    public Bucket getBucket() {
        return bucket;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }
}
