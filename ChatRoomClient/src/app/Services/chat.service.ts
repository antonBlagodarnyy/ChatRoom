import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { IMessage } from '../Interfaces/IMessage';
import { RxStomp } from '@stomp/rx-stomp';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  nickname: string | undefined;
  constructor() {}
  ws: RxStomp | undefined;

  connect() {
    this.ws = new RxStomp();
    this.ws?.configure({ brokerURL: 'ws://localhost:8081/ws-connection' });
    this.ws?.activate();
    console.log(this.ws);
    return this.ws;
  }
  sendMsg(msgText: string) {
    console.log(this.ws + '||' + this.nickname);
    if (this.ws && this.nickname) {
      this.ws.publish({
        destination: '/ws/hello',
        body: JSON.stringify({ from: this.nickname, text: msgText }),
      });
    }
  }
  saveNickname(nickname: string) {
    this.nickname = nickname;
    localStorage.setItem('nickname', nickname);
  }
  getNickname() {
    const nick = localStorage.getItem('nickname');
    if (nick) this.nickname = nick;
  }
}
