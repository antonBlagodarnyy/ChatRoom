import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

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
}
