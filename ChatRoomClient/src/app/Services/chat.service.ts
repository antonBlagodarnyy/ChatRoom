import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Message } from '../Interfaces/Message';
import { environment } from '../../environments/environment';
import { BehaviorSubject, concat, EMPTY, Observable, Subject, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from '../Components/loading/loading.component';
import { ErrorComponent } from '../Components/ws-error/error.component';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  readonly messages$ = this.messagesSubject.asObservable();

  nickname = signal(sessionStorage.getItem('nickname'));
  private errorHappened = new Subject<string>();
  readonly errorHappened$ = this.errorHappened.asObservable();

  private wsSubject: WebSocketSubject<
    Message | { sender: string; text: string }
  > | null = null;

  private wsClosedManually = false;

  setMessages(messages: Message[]) {
    this.messagesSubject.next(messages);
  }

  connect$() {
    if (this.nickname()) {
      var spinnerRef: MatDialogRef<LoadingComponent>;
      const spinnerTimeout = setTimeout(() => {
        spinnerRef = this.dialog.open(LoadingComponent);
      }, 2000);

      this.wsClosedManually = false;

      return (this.wsSubject = webSocket<
        Message | { sender: string; text: string }
      >({
        url: environment.wsUrl,
        openObserver: {
          next: () => {
            clearTimeout(spinnerTimeout);
            if (spinnerRef) spinnerRef.close();
            this.getStoredMsgs$().subscribe({
              error: (err) => {
                const code = err.code || err.status || 409;
                this.errorHappened.next(String(code));
              },
            });
          },
        },
        closeObserver: {
          next: (ev) => {
            clearTimeout(spinnerTimeout);
            if (spinnerRef) spinnerRef.close();
            if (!this.wsClosedManually) this.errorHappened.next(ev.reason);
          },
        },
      }));
    } else return EMPTY;
  }
  getStoredMsgs$() {
    return this.http
      .get<Message[]>(environment.apiUrl + 'messages/all', {
        observe: 'response',
      })
      .pipe(
        tap((res) => {
          if (res.body) this.setMessages(res.body);
        })
      );
  }
  disconnect() {
    if (this.wsSubject) {
      this.wsClosedManually = true;
      this.wsSubject.complete();
    }
  }
  sendMsg(msgText: string) {
    const nickname = this.nickname();
    if (this.wsSubject && nickname) {
      this.wsSubject.next({ sender: nickname, text: msgText });
    }
  }
  onMessageReceived(msg: Message) {
    this.messagesSubject.next([...this.messagesSubject.value, msg]);
  }

  setNickname(newNickname: string) {
    sessionStorage.setItem('nickname', newNickname);
    this.nickname.set(newNickname);
  }
  isMessage(msg: any): msg is Message {
    return msg && typeof msg === 'object' && 'text' in msg && 'ts' in msg;
  }
}
