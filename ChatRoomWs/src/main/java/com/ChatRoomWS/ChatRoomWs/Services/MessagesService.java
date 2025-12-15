package com.ChatRoomWS.ChatRoomWs.Services;

import com.ChatRoomWS.ChatRoomWs.DTOs.BaseMessageDTO;
import com.ChatRoomWS.ChatRoomWs.DTOs.ConnectedUsersDTO;
import com.ChatRoomWS.ChatRoomWs.DTOs.MessageNotSavedDTO;
import com.ChatRoomWS.ChatRoomWs.DTOs.MessageSavedDTO;
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

import java.util.Optional;

import static com.fasterxml.jackson.databind.SerializationFeature.WRITE_DATES_AS_TIMESTAMPS;

@Service
public class MessagesService {

    private static final Logger LOG = LoggerFactory.getLogger(MessagesService.class);

    @Autowired
    private SessionService sessionService;

    @Autowired
    private MessageRepository messageRepository;

    private static final ObjectMapper objectMapper = createObjectMapper();

    private static ObjectMapper createObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(WRITE_DATES_AS_TIMESTAMPS);
        return mapper;
    }

    public Iterable<Message> getMessages() {
        return messageRepository.findAll();
    }

    public Optional<String> parseConnectedUsers() {
        int connectedUsersQuantity = sessionService.countSessions();
        try {
            String parsed = objectMapper.writeValueAsString(new ConnectedUsersDTO("CONNECTED_USERS", connectedUsersQuantity));
            return Optional.of(parsed);
        } catch (JsonProcessingException e) {
            LOG.error("[MessageService] Error parsing currently connected users={}", connectedUsersQuantity, e);
            return Optional.empty();
        }

    }


    @Transactional
    public Optional<TextMessage> processMessage(MessageNotSavedDTO message) {
        return isValidMessage(message) ? saveAndConvertToBroadcastMessage(message) : Optional.empty();
    }

    public Optional<BaseMessageDTO> parseMessage(TextMessage rawMessage) {
        try {
            BaseMessageDTO messageNotSaved = objectMapper.readValue(rawMessage.getPayload(), BaseMessageDTO.class);

            return Optional.of(messageNotSaved);
        } catch (JsonProcessingException e) {
            LOG.error("[MessageService] Failed to parse message: {}", rawMessage.getPayload(), e);
            return Optional.empty();
        }
    }


    private boolean isValidMessage(MessageNotSavedDTO message) {
        return message.sender() != null && !message.text().isBlank() && message.text() != null && !message.text().isBlank();
    }

    private Optional<TextMessage> saveAndConvertToBroadcastMessage(MessageNotSavedDTO message) {
        try {

            Message savedMessage = messageRepository.saveAndFlush(new Message(message.sender(), message.text()));
            String jsonPayload = objectMapper.writeValueAsString(
                    new MessageSavedDTO(
                            "RECEIVED",
                            savedMessage.getSender(),
                            savedMessage.getText(),
                            savedMessage.getTs()));
            return Optional.of(new TextMessage(jsonPayload));
        } catch (JsonProcessingException e) {
            LOG.error("[MessageService] Failed to serialize message for broadcast", e);
            return Optional.empty();
        }
    }

}
