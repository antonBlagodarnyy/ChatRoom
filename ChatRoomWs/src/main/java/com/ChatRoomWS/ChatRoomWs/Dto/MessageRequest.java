package com.ChatRoomWS.ChatRoomWs.Dto;

public class MessageRequest {

	private String Sender;
	private String text;
	
	public MessageRequest(String sender, String text) {
		super();
		this.Sender = sender;
		this.text = text;
	}
	public String getSender() {
		return Sender;
	}
	public void setSender(String from) {
		this.Sender = from;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	
	@Override
	public String toString() {
		return "MessageRequest [from=" + Sender + ", text=" + text + "]";
	}
	
}
