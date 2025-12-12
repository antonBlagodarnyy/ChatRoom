import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type DialogData = {
  reason: string;
};
@Component({
  selector: 'app-ws-error',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `<mat-card>
    <mat-card-header><h2>Disconnected</h2></mat-card-header>
    <mat-card-content>{{ this.reason }}</mat-card-content>
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
  private data = inject<DialogData>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ErrorComponent>);

  showReset = signal<boolean>(false);
  reason: string | null | number = null;

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
    } else this.reason = reason;
  }

  closeDialog(retry: boolean) {
    this.dialogRef.close(retry);
  }
}
