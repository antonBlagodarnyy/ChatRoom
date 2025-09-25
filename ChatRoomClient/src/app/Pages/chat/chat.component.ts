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

  ngOnInit(): void {
    this.chatService.connect()?.subscribe({
      next: (value) => {
        //TODO Create a new message and push it to app-messages
        console.log('message received: ' + value);
      }, // Called whenever there is a message from the server.
      error: (err) => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete'), // Called when connection is closed (for whatever reason).
    });
  }
}
