package com.ChatRoomWS.ChatRoomWs.Controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;

import com.ChatRoomWS.ChatRoomWs.Services.MessagesService;

@Controller
@RequestMapping(path = "/messages")
@RestController
public class RestMessageController {

	@Autowired
	MessagesService messagesService;

	@CrossOrigin(originPatterns="http://localhost:*")
	@GetMapping(path = "/all")
	public @ResponseBody Iterable<Message> getAllUsers() {
		// This returns a JSON or XML with the users
		return messagesService.getMessages();
	}

}
