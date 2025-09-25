import { Component, OnInit, signal } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { MessagesComponent } from '../../Components/messages/messages.component';
import { InputBoxComponent } from '../../Components/messages/input-box/input-box.component';
import { IMessage } from '../../Interfaces/IMessage';
import { Message } from '@stomp/stompjs';
@Component({
  selector: 'app-chat',
  imports: [MessagesComponent, InputBoxComponent],
  template: `<app-messages [messages]="messages()" /><app-input-box />`,
})
export class ChatComponent implements OnInit {
  messages = signal<IMessage[] | undefined>(undefined);
  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.getNickname();
    this.chatService
      .connect()
      ?.watch('/topic/messages')
      .subscribe((message: Message) => {
        const msg = JSON.parse(message.body);
        if (this.messages)
          this.messages.update((messages) => [msg, ...(messages ?? [])]);
      });
  }
}
