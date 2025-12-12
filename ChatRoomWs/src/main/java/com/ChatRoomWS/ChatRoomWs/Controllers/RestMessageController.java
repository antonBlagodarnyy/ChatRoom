package com.ChatRoomWS.ChatRoomWs.Controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.ChatRoomWS.ChatRoomWs.Entities.Message;
import com.ChatRoomWS.ChatRoomWs.Services.MessagesService;

@RestController

@RequestMapping(path = "/messages")
public class RestMessageController {

    @Autowired
    MessagesService messagesService;

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Message> getAllUsers() {
        return messagesService.getMessages();
    }

}
