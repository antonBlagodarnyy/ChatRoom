package com.ChatRoomWS.ChatRoomWs.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="messages")
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	

	private String sender;
	private String text;
	
public Message() {
		super();
	}
	public Message(String text, String sender) {
		super();
		this.sender = sender;
		this.text = text;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getSender() {
		return sender;
	}

	public void setSender(String from) {
		this.sender = from;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

}
