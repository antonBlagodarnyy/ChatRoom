package com.ChatRoomWS.ChatRoomWs.Services;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;
import com.ChatRoomWS.ChatRoomWs.Repositories.MessageRepository;

@Service
public class MessagesService {

	@Autowired
	private MessageRepository messageRepository;

	public Iterable<Message> getMessages() {
		return  messageRepository.findAll();
	}

	public void saveMessage(Message message) {
		messageRepository.save(message);
	}
}
