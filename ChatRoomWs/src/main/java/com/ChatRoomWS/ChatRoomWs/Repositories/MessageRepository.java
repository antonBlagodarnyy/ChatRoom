package com.ChatRoomWS.ChatRoomWs.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ChatRoomWS.ChatRoomWs.Entities.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

}
