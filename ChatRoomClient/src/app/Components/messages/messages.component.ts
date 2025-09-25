import { Component, input } from '@angular/core';
import { IMessage } from '../../Interfaces/IMessage';
import { NgForOf } from '../../../../node_modules/@angular/common/common_module.d-NEF7UaHr';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-messages',
  imports: [NgForOf, MessageComponent],
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
