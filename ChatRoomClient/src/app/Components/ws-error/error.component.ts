import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../Services/chat.service';
import { MatInput } from '@angular/material/input';

type DialogData = {
  reason: string;
  code: number;
};
@Component({
  selector: 'app-ws-error',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInput,
    FormsModule,
  ],
  template: `<mat-card>
    <mat-card-header><h2>Disconnected</h2></mat-card-header>
    <mat-card-content
      ><p>{{ this.reason }}</p>
      @if(this.code == 1008){
      <mat-form-field class="form-field" appearance="outline">
        <mat-label>Nickname</mat-label>
        <input matInput required name="nickname" [(ngModel)]="nickname" />
        <mat-hint>Choose a nickname</mat-hint>
      </mat-form-field>

      }
    </mat-card-content>
    <mat-card-actions>
      <span>Retry?</span>
      @if(this.showReset()){
      <button mat-icon-button (click)="closeDialog(true)">
        <mat-icon fontIcon="check"></mat-icon>
      </button>
      }@else{
      <mat-spinner diameter="30"></mat-spinner>
      }
      <button mat-icon-button (click)="closeDialog(false)">
        <mat-icon fontIcon="cancel"></mat-icon>
      </button>
    </mat-card-actions>
  </mat-card>`,
  styles: `
mat-card-actions{
  margin:2vh;
  padding:1vh;
  width: fit-content;
  border-radius:10px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--mat-sys-outline);
}
 button, mat-spinner{
  margin-left: 3vh;
}
  `,
})
export class ErrorComponent implements OnInit {
  private chatService = inject(ChatService);
  private data = inject<DialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ErrorComponent>);

  showReset = signal<boolean>(false);
  reason: string | null | number = null;
  code = this.data.code;

  nickname: string | null = null;

  ngOnInit(): void {
    setTimeout(() => {
      this.showReset.set(true);
    }, 5000);

    const { reason } = this.data;
    if (!reason) {
      this.reason =
        'Server is unavailable or there are too many users connected. Please try again later.';
    } else if (Number(reason) === 409) {
      this.reason =
        'The number of requests to the server was too high. Try again later.';
    } else if (Number(reason) === 500)
      this.reason = 'Something went wrong in the server';
    else this.reason = reason;
  }

  closeDialog(retry: boolean) {
    if (this.nickname) {
      const trimmed = this.nickname.trim();
      this.chatService.setNickname(trimmed);
    }
    this.dialogRef.close(retry);
  }
}
