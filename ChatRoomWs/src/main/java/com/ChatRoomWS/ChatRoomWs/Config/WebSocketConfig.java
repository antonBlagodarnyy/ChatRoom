package com.ChatRoomWS.ChatRoomWs.Config;

import com.ChatRoomWS.ChatRoomWs.Controllers.WsMessageHandler;
import com.ChatRoomWS.ChatRoomWs.Interceptors.ConnectionLimitInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.*;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Value("${client.url}")
    private String clientUrl;

    @Autowired
    private WsMessageHandler wsMessageHandler;

    @Autowired
    private ConnectionLimitInterceptor connectionLimitInterceptor;

    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(wsMessageHandler, "/ws")
                .addInterceptors(connectionLimitInterceptor)
                .setAllowedOriginPatterns(clientUrl);
    }
}
