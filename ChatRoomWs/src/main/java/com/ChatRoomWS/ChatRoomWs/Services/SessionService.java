package com.ChatRoomWS.ChatRoomWs.Services;

import com.ChatRoomWS.ChatRoomWs.Models.CustomSession;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Collection;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Service
public class SessionService {

    public final int CONCURRENT_SESSIONS = 50;
    private final ConcurrentHashMap<String, CustomSession> sessions = new ConcurrentHashMap<>();

    public void addSession(WebSocketSession session) {
        sessions.put(session.getId(), new CustomSession(session));
    }

    public void removeSession(String sessionId) {
        sessions.remove(sessionId);
    }

    public Optional<CustomSession> getSession(String sessionId) {
        return Optional.ofNullable(sessions.get(sessionId));
    }

    public Collection<CustomSession> getAllSessions() {
        return sessions.values();
    }

    public int countSessions() {
        return sessions.size();
    }

    public boolean tryToAddUsername(String id, String username) {
        if (sessions.values().stream()
                .filter(customSession -> customSession.getUsername() != null)
                .anyMatch(customSession ->
                        customSession.getUsername().equals(username))) {
            return false;
        }
        sessions.get(id).setUsername(username);
        return true;
    }
}
