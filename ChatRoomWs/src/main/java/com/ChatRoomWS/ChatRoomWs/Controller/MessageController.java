package com.ChatRoomWS.ChatRoomWs.Controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;

@Controller
public class MessageController {

	@MessageMapping("/hello")
	@SendTo("/topic/messages")
	public Message message(Message message) {
		return message;
	}
}
