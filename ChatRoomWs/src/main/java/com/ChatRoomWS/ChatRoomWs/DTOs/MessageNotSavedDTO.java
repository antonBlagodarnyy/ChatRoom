package com.ChatRoomWS.ChatRoomWs.DTOs;


public record MessageNotSavedDTO(String type, String sender, String text) implements BaseMessageDTO {
}
