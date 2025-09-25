import { Component, input } from '@angular/core';
import { IMessage } from '../../../Interfaces/IMessage';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-message',
  imports: [MatChipsModule],
  template: `<div class="container-messages-message">
    <mat-chip>{{ message().from }}</mat-chip>
    <span>{{ message().txt }}</span>
  </div>`,
  styles: `
  .container-messages-message{
    display: flex;
    align-items: center;
  }
  `,
})
export class MessageComponent {
  message = input.required<IMessage>();
}
