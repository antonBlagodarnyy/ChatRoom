package com.ChatRoomWS.ChatRoomWs.Repositories;

import org.springframework.data.repository.CrudRepository;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;

public interface MessageRepository extends CrudRepository<Message, Integer> {

}
