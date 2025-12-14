import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, EMPTY, forkJoin, Subject, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingComponent } from '../Components/loading/loading.component';
import {
  MessageConnectedUsersDto,
  MessageDto,
  MessageReceivedDto,
} from '../Interfaces/message.dto';
@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}
  private messagesSubject = new BehaviorSubject<MessageReceivedDto[]>([]);
  readonly messages$ = this.messagesSubject.asObservable();

  nickname = signal(sessionStorage.getItem('nickname'));
  usersConnected = signal(0);
  private errorHappened = new Subject<{
    reason: string | null;
    code: number | null;
  }>();
  readonly errorHappened$ = this.errorHappened.asObservable();

  private wsSubject: WebSocketSubject<MessageDto> | null = null;

  private wsClosedManually = false;

  setMessages(messages: MessageReceivedDto[]) {
    this.messagesSubject.next(messages);
  }

  connect$() {
    if (this.nickname()) {
      var spinnerRef: MatDialogRef<LoadingComponent>;
      const spinnerTimeout = setTimeout(() => {
        spinnerRef = this.dialog.open(LoadingComponent);
      }, 2000);

      this.wsClosedManually = false;

      return (this.wsSubject = webSocket<MessageDto>({
        url: environment.wsUrl,
        openObserver: {
          next: () => {
            const nickname = this.nickname();
            if (nickname) {
              this.wsSubject?.next({ type: 'CONNECTION', username: nickname });
              clearTimeout(spinnerTimeout);
              if (spinnerRef) spinnerRef.close();
              this.getServerData$().subscribe({
                error: (err) => {
                  const code = err.code || err.status || 500;
                  this.errorHappened.next({ reason: null, code: code });
                },
              });
            } else this.wsSubject?.complete();
          },
        },
        closeObserver: {
          next: (ev) => {
            console.log(ev);
            clearTimeout(spinnerTimeout);
            if (spinnerRef) spinnerRef.close();
            if (!this.wsClosedManually)
              this.errorHappened.next({ reason: ev.reason, code: ev.code });
          },
        },
      }));
    } else return EMPTY;
  }
  private getServerData$() {
    return forkJoin({
      storedMsgs: this.getStoredMsgs$(),
      connectedUsers: this.getConnectedUsers$(),
    });
  }
  private getStoredMsgs$() {
    return this.http
      .get<MessageReceivedDto[]>(environment.apiUrl + 'messages/all', {
        observe: 'response',
      })
      .pipe(
        tap((res) => {
          if (res.body) this.setMessages(res.body);
        })
      );
  }
  private getConnectedUsers$() {
    return this.http
      .get<MessageConnectedUsersDto>(
        environment.apiUrl + 'messages/connectedUsers',
        {
          observe: 'response',
        }
      )
      .pipe(
        tap((res) => {
          if (res.body) this.usersConnected.set(res.body.connectedUsers);
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
      this.wsSubject.next({ type: 'SENT', sender: nickname, text: msgText });
    }
  }
  onMessageReceived(msg: MessageReceivedDto) {
    this.messagesSubject.next([...this.messagesSubject.value, msg]);
  }

  setNickname(newNickname: string) {
    sessionStorage.setItem('nickname', newNickname);
    this.nickname.set(newNickname);
  }
}
