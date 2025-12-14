import {
  AfterViewChecked,
  Component,
  ElementRef,
  input,
  Signal,
  viewChild,
} from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MessageReceivedDto } from '../../Interfaces/message.dto';

@Component({
  selector: 'app-messages',
  imports: [MatCardModule, DatePipe],
  template: ` <div class="container-messages" #containerMessages>
    @for (msg of messages()(); track $index) {

    <mat-card>
      <mat-card-header>
        <span mat-card-title class="msg-sender">{{ msg.sender }}</span>
      </mat-card-header>

      <mat-card-content>
        <span>{{ msg.text }}</span>
      </mat-card-content>
      <mat-card-footer>
        <span class="msg-ts">{{ msg.ts | date : 'short' }}</span>
      </mat-card-footer>
    </mat-card>

    }
  </div>`,
  styles: `.container-messages{
    border: 1px solid black;
    border-radius:5vh;
    padding:2vh;
    height: 60vh;
    overflow-y: auto;
  }
  mat-card{
    max-width: 95%;
    margin: 2vh;
    padding: 0 2vh 0;
    width: fit-content;
  }
mat-card-header{
  padding-top:0;
  padding-left:0;
}
mat-card-content{
  overflow-wrap: break-word;
}
  .msg-sender{
    color: var(--mat-sys-primary);
  }
  .msg-ts{
    color: var(--mat-sys-secondary)
  }
  /* Hide scrollbar for Chrome, Safari and Opera */
.container-messages::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.container-messages {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}`,
})
export class MessagesComponent implements AfterViewChecked {
  chatContainer = viewChild<ElementRef>('containerMessages');
  messages = input.required<Signal<MessageReceivedDto[]>>();
  ngAfterViewChecked(): void {
    const chatContainer = this.chatContainer();
    if (chatContainer) {
      chatContainer.nativeElement.scrollTop =
        chatContainer.nativeElement.scrollHeight;
    }
  }
}
