package com.ChatRoomWS.ChatRoomWs.Controllers;

import com.ChatRoomWS.ChatRoomWs.Models.CustomSession;
import com.ChatRoomWS.ChatRoomWs.Services.SessionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.ChatRoomWS.ChatRoomWs.Services.MessagesService;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.CompletableFuture;


@Component
public class WsMessageHandler extends TextWebSocketHandler {

    private static final Logger LOG = LoggerFactory.getLogger(WsMessageHandler.class);

    @Autowired
    private SessionService sessionService;

    @Autowired
    private MessagesService messagesService;

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {

        sessionService.getSession(session.getId())
                .ifPresentOrElse(
                        customSession -> handleMessageForSession(customSession, session, message),
                        () -> closeSessionWithStatus(session, CloseStatus.SESSION_NOT_RELIABLE));
    }

    private void handleMessageForSession(CustomSession customSession, WebSocketSession session, TextMessage message) {
        if (!customSession.getBucket().tryConsume(1)) {
            closeSessionWithStatus(session, CloseStatus.SERVICE_OVERLOAD.withReason("You sent too many messages. Try again later."));
        } else {
            messagesService.processMessage(message).ifPresentOrElse(
                    parsedMessage -> broadcastMessage(parsedMessage),
                    () -> closeSessionWithStatus(session, CloseStatus.BAD_DATA.withReason("The message received was malformed, you were disconnected."))
            );
        }
    }

    private void broadcastMessage(TextMessage message) {
        sessionService.getAllSessions().forEach(customSession -> {
            CompletableFuture.runAsync(() -> {
                        try {
                            customSession.getWebSocketSession().sendMessage(message);
                        } catch (IOException e) {
                            LOG.error("[WsMessageHandler] Failed to send message to session: {}",
                                    customSession.getWebSocketSession().getId(), e);
                        }
                    }
            );
        });
    }

    private void closeSessionWithStatus(WebSocketSession session, CloseStatus closeStatus) {
        try {
            LOG.info("[WsMessageHandler] CloseStatus triggered={}",closeStatus);
            session.close(closeStatus);
        } catch (IOException e) {
            LOG.error("[WsMessageHandler] Failed to close session", e);
        }
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessionService.addSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {


        sessionService.removeSession(session.getId());

    }
}
