import { Component, input } from '@angular/core';
import { IMessage } from '../../Interfaces/IMessage';
import { MessageComponent } from './message/message.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-messages',
  imports: [NgFor, MessageComponent],
  template: `<div class="container-messages" *ngFor="let msg of messages()">
    <app-message [message]="msg"></app-message>
  </div>`,
  styles: `.container-messages{
    height: 60vh;
    overflow: auto;
  }`,
})
export class MessagesComponent {
  messages = input<IMessage[] | undefined>();
}
