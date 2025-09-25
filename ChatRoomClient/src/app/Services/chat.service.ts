import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IMessage } from '../Interfaces/IMessage';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  nickname: string | undefined;
  constructor() {}
  ws: WebSocketSubject<{ from: string; text: string }> | undefined;

  connect() {
    return (this.ws = webSocket('ws://localhost:8081'));
  }
  sendMsg(msg: IMessage) {
    if (this.ws) {
      this.ws.subscribe();
      this.ws.next({
        from: msg.from,
        text: msg.txt,
      });
      this.ws.complete();
      this.ws.error({ code: 4000, reason: 'Smth broke' });
    }
  }
}
