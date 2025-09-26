import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { ChatService } from '../../Services/chat.service';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  template: `
    <div class="container">
      <h1>ChatRoom</h1>
      <div class="container-nickname">
        <mat-form-field class="form-field" appearance="outline">
          <mat-label>Nickname</mat-label>
          <input matInput required [(ngModel)]="nickname" />
          <mat-hint>Choose a nickname</mat-hint>
        </mat-form-field>

        <button class="button-enter" (click)="onEnter()" mat-fab>Enter</button>
      </div>
    </div>
  `,
  styles: `
  .container {
    height:90%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  
  }
  .container-nickname{
    display: flex;

  }
  .form-field{
    padding: 2vh;
  }
  .button-enter{
    margin-top: 2vh;
  }
  `,
})
export class WelcomeComponent {
  constructor(private router: Router, private chatService: ChatService) {}
  nickname?: string;
  onEnter() {
    if (this.nickname) {
      this.chatService.saveNickname(this.nickname);
      this.router.navigate(['chat']);
    }
  }
}
