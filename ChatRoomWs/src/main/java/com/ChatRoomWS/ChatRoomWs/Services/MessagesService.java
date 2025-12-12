package com.ChatRoomWS.ChatRoomWs.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;
import com.ChatRoomWS.ChatRoomWs.Repositories.MessageRepository;
import org.springframework.web.socket.TextMessage;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.Optional;

@Service
public class MessagesService {

    private static final Logger LOG = LoggerFactory.getLogger(MessagesService.class);

    @Autowired
    private MessageRepository messageRepository;

    private static final ObjectMapper objectMapper = createObjectMapper();

    private static ObjectMapper createObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }



    public Iterable<Message> getMessages() {
        return messageRepository.findAll();
    }

    @Transactional
    public Optional<TextMessage> processMessage(TextMessage rawMessage) {
        return parseMessage(rawMessage)
                .filter(this::isValidMessage)
                .flatMap(this::saveAndConvertToBroadcastMessage);
    }

    private Optional<Message> parseMessage(TextMessage rawMessage) {
        try {
            Message message = objectMapper.readValue(rawMessage.getPayload(), Message.class);
            return Optional.of(message);
        } catch (JsonProcessingException e) {
            LOG.error("[MessageService] Failed to parse message: {}", rawMessage.getPayload(), e);
            return Optional.empty();
        }
    }

    private boolean isValidMessage(Message message) {
        return message.getSender() != null && !message.getSender().isBlank() && message.getText() != null && !message.getText().isBlank();
    }

    private Optional<TextMessage> saveAndConvertToBroadcastMessage(Message message) {
        try {
            Message savedMessage = messageRepository.save(message);
            String jsonPayload = objectMapper.writeValueAsString(savedMessage);
            return Optional.of(new TextMessage(jsonPayload));
        } catch (JsonProcessingException e) {
            LOG.error("[MessageService] Failed to serialize message for broadcast", e);
            return Optional.empty();
        }
    }

}
