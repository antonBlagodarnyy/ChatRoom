import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { MessagesComponent } from '../../Components/messages/messages.component';

@Component({
  selector: 'app-chat',
  imports: [MessagesComponent],
  template: `<app-messages [messages]=""></app-messages>`,
})
export class ChatComponent implements OnInit {
  
  constructor(private chatService: ChatService) {}
  ngOnInit(): void {}
}
