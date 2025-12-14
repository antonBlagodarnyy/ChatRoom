package com.ChatRoomWS.ChatRoomWs.Controllers;


import com.ChatRoomWS.ChatRoomWs.DTOs.ConnectedUsersDTO;
import com.ChatRoomWS.ChatRoomWs.Services.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ChatRoomWS.ChatRoomWs.Entities.Message;
import com.ChatRoomWS.ChatRoomWs.Services.MessagesService;

@RestController

@RequestMapping(path = "/messages")
public class RestMessageController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private MessagesService messagesService;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Message> getAllUsers() {
        return messagesService.getMessages();
    }

    @GetMapping(path = "/connectedUsers")
    public @ResponseBody ConnectedUsersDTO getConnectedUsers() {
        return new ConnectedUsersDTO("CONNECTED_USERS", sessionService.countSessions());
    }

}
