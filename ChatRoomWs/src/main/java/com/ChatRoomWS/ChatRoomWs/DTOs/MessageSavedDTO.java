package com.ChatRoomWS.ChatRoomWs.DTOs;

import java.time.Instant;

public record MessageSavedDTO(String type, String sender, String text, Instant ts){
}
