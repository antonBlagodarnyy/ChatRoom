import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { MessagesComponent } from '../../Components/messages/messages.component';
import { InputBoxComponent } from '../../Components/messages/input-box/input-box.component';
import { IMessage } from '../../Interfaces/IMessage';
import { Message } from '@stomp/stompjs';
@Component({
  selector: 'app-chat',
  imports: [MessagesComponent, InputBoxComponent],
  template: `
    <div class="container">
      <app-messages [messages]="messages()" /><app-input-box />
    </div>
  `,
  styles: `.container{
    padding-top:10vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  
  }`,
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
          this.messages.update((messages) => [...(messages ?? []), msg]);
      });
      this.chatService.getMsgs().subscribe((messages)=>{
        this.messages.set(messages);
      })
  }
}
