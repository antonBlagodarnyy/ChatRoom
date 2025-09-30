import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChatService } from '../../../Services/chat.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-box',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  template: ` <div class="container-input-box">
    <mat-form-field class="form-field" appearance="outline">
      <mat-label>Send smth</mat-label>
      <textarea matInput required [(ngModel)]="inputContent"></textarea>
    </mat-form-field>

    <button class="button-enter" (click)="onMsgSent()" mat-fab>Enter</button>
  </div>`,
  styles: `
  .container-input-box{
    display: flex;
    justify-content:center;
    width:100%;

  }
  .form-field{
    padding: 2vh;
    width:90%;
  }
  .button-enter{
    margin-top: 2vh;
  }`,
})
export class InputBoxComponent {
  inputContent?: string;
  constructor(private chatService: ChatService) {}
  onMsgSent() {
    if (this.inputContent) this.chatService.sendMsg(this.inputContent);
  }
}
