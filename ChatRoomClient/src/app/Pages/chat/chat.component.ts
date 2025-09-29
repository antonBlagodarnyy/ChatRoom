import { Component, OnInit, signal } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { MessagesComponent } from '../../Components/messages/messages.component';
import { InputBoxComponent } from '../../Components/messages/input-box/input-box.component';
import { IMessage } from '../../Interfaces/IMessage';
import { Message } from '@stomp/stompjs';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../../Components/loading/loading.component';
import { config, delay, retry } from 'rxjs';

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

  constructor(private chatService: ChatService, private dialogRef: MatDialog) {}

  ngOnInit(): void {
    let spinnerRef: any;
    let spinnerTimeout: ReturnType<typeof setTimeout>;

    // wait 300ms before showing spinner
    spinnerTimeout = setTimeout(() => {
      spinnerRef = this.dialogRef.open(LoadingComponent, {
        disableClose: true,
      });
    }, 300);

    this.chatService.getNickname();
    const ws = this.chatService.connect();

    ws.connected$.subscribe(() => {
      // connection established
      clearTimeout(spinnerTimeout);
      if (spinnerRef) {
        spinnerRef.close();
      }
    });
    ws?.watch('/topic/messages').subscribe((message: Message) => {
      const msg = JSON.parse(message.body);
      if (this.messages)
        this.messages.update((messages) => [...(messages ?? []), msg]);
    });
    this.chatService
      .getMsgs()
      .pipe(
        retry({ delay: 100 }) // retry up to 3 times before failing
      )
      .subscribe((messages) => {
        this.messages.set(messages);
      });
  }
}
