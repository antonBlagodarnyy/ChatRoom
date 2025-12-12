package com.ChatRoomWS.ChatRoomWs.Interceptors;

import com.ChatRoomWS.ChatRoomWs.Controllers.WsMessageHandler;
import com.ChatRoomWS.ChatRoomWs.Services.SessionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

@Component
public class ConnectionLimitInterceptor implements HandshakeInterceptor {

    private static final Logger LOG = LoggerFactory.getLogger(ConnectionLimitInterceptor.class);

    @Autowired
    private SessionService sessionService;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (sessionService.countSessions() > sessionService.CONCURRENT_SESSIONS){
            response.setStatusCode(HttpStatus.TOO_MANY_REQUESTS);

            return false;
        }

        else return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {

    }
}
