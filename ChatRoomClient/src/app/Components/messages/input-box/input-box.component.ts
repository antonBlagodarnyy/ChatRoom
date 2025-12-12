import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-input-box',
  imports: [MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  template: ` <form (submit)="onMsgSent()">
    <div class="container-input-box">
      <mat-form-field class="form-field" appearance="outline">
        <mat-label>Send smth</mat-label>
        <input
          name="inputContent"
          maxlength="100"
          matInput
          [(ngModel)]="inputContent"
        />
      </mat-form-field>
      <button class="button-enter" type="submit" mat-stroked-button>
        Enter
      </button>
    </div>
  </form>`,
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
  onMsgSentEvent = output<string>();

  onMsgSent() {
    const trimmed = this.inputContent?.trim();
    if (trimmed && trimmed.length <= 100) {
      this.onMsgSentEvent.emit(trimmed);
      this.inputContent = '';
    }
  }
}
