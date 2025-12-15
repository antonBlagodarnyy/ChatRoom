import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { MessagesComponent } from '../../Components/messages/messages.component';
import { InputBoxComponent } from '../../Components/messages/input-box/input-box.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../Components/ws-error/error.component';
import { MessageDto, MessageReceivedDto } from '../../Interfaces/message.dto';

@Component({
  selector: 'app-chat',
  imports: [MessagesComponent, InputBoxComponent],
  template: `
    <div class="container">
      <h2>
        Current username:
        <span class="nickname">{{ this.chatService.nickname() }}</span>
      </h2>
      <h3>
        Currently connected users: {{ this.chatService.usersConnected() }}/50
      </h3>
      <app-messages [messages]="this.messages" />
      <app-input-box (onMsgSentEvent)="onMsgSent($event)" />
    </div>
  `,
  styles: `.container{
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .nickname{
    color: var(--mat-sys-primary)
  }
  h2{
    padding-top: 4vh;
  }
  app-messages{
    width:80%;
  }
  app-input-box{
    width:90%;
  }`,
})
export class ChatComponent implements OnInit, OnDestroy {
  protected chatService = inject(ChatService);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  messages: Signal<MessageReceivedDto[]> = toSignal(
    this.chatService.messages$,
    {
      initialValue: [],
    }
  );

  errorSub = this.chatService.errorHappened$.subscribe((data) => {
    this.dialog
      .open(ErrorComponent, { data: { reason: data.reason, code: data.code } })
      .afterClosed()
      .subscribe((retry) => {
        retry ? this.connect() : this.router.navigate(['']);
      });
  });

  ngOnInit() {
    this.connect();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.chatService.disconnect();
  }

  connect() {
    this.chatService.connect$().subscribe({
      next: (msg: MessageDto) => {
        switch (msg.type) {
          case 'CONNECTED_USERS':
            this.chatService.usersConnected.set(msg.connectedUsers);
            break;
          case 'RECEIVED':
            this.chatService.onMessageReceived(msg);
            break;
        }
      },
    });
  }
  onMsgSent(newMsg: string) {
    this.chatService.sendMsg(newMsg);
  }
}
