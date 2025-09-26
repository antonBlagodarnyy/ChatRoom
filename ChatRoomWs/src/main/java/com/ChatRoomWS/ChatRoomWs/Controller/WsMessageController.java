package com.ChatRoomWS.ChatRoomWs.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.ChatRoomWS.ChatRoomWs.Dto.MessageRequest;
import com.ChatRoomWS.ChatRoomWs.Entities.Message;
import com.ChatRoomWS.ChatRoomWs.Services.MessagesService;

@Controller
public class WsMessageController {

	@Autowired
	private MessagesService messagesService;

	@MessageMapping("/hello")
	@SendTo("/topic/messages")
	public Message message(MessageRequest messageRequest) {
		
		if (messageRequest.getSender().length() <= 25 && messageRequest.getText().length() <= 100) {
			
			Message msg = new Message();
			
			msg.setSender(messageRequest.getSender());
			msg.setText(messageRequest.getText());
			messagesService.saveMessage(msg);
			return msg;
		}
		return null;
	}
}
