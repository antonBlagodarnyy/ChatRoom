package com.ChatRoomWS.ChatRoomWs.DTOs;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;

@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = MessageNotSavedDTO.class, name = "SENT"),
        @JsonSubTypes.Type(value = MessageConnectionDTO.class, name = "CONNECTION"),
})
public interface BaseMessageDTO {
}
