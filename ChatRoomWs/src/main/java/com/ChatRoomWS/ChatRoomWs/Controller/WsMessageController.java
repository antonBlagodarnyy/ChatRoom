package com.ChatRoomWS.ChatRoomWs.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;
import com.ChatRoomWS.ChatRoomWs.Services.MessagesService;

@Controller
public class WsMessageController {

	@Autowired
	private MessagesService messagesService;

	@MessageMapping("/hello")
	@SendTo("/topic/messages")
	public Message message(Message message) {
		if (message.getSender().length() <= 25 && message.getText().length() <= 100) {
			messagesService.saveMessage(message);
			return message;
		}
		return null;
	}
}
