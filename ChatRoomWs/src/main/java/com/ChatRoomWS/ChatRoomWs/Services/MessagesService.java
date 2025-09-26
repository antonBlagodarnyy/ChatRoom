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

	public ArrayList<Message> getMessages() {
		return new ArrayList<Message>((Collection<? extends Message>) messageRepository.findAll());
	}

	public void saveMessage(Message message) {
		messageRepository.save(message);
	}
}
