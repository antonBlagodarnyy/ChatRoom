import { Component, inject, OnDestroy, OnInit, Signal } from '@angular/core';
import { ChatService } from '../../Services/chat.service';
import { MessagesComponent } from '../../Components/messages/messages.component';
import { InputBoxComponent } from '../../Components/messages/input-box/input-box.component';
import { Message } from '../../Interfaces/Message';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ErrorComponent } from '../../Components/ws-error/error.component';

@Component({
  selector: 'app-chat',
  imports: [MessagesComponent, InputBoxComponent],
  template: `
    <div class="container">
      <h2>
        Current username:
        <span class="nickname">{{ this.chatService.nickname() }}</span>
      </h2>
      <app-messages [messages]="this.messages" />
      <app-input-box (onMsgSentEvent)="onMsgSent($event)" />
    </div>
  `,
  styles: `.container{
    height:100%;
    margin-top: 5vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .nickname{
    color: var(--mat-sys-primary)
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

  messages: Signal<Message[]> = toSignal(this.chatService.messages$, {
    initialValue: [],
  });

  errorSub = this.chatService.errorHappened$.subscribe((reason) => {
    this.dialog
      .open(ErrorComponent, { data: { reason: reason } })
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
      next: (msg) => {
        if (this.chatService.isMessage(msg))
          this.chatService.onMessageReceived(msg);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  onMsgSent(newMsg: string) {
    this.chatService.sendMsg(newMsg);
  }
}
