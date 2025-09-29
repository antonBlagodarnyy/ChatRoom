import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { IMessage } from '../Interfaces/IMessage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  nickname: string | undefined;
  ws: RxStomp | undefined;

  connect() {
    this.ws = new RxStomp();
    this.ws?.configure({ brokerURL: environment.wsUrl + 'ws-connection' });
    this.ws?.activate();

    return this.ws;
  }
  sendMsg(msgText: string) {
    console.log(this.ws + '||' + this.nickname);
    if (this.ws && this.nickname) {
      this.ws.publish({
        destination: '/ws/hello',
        body: JSON.stringify({ sender: this.nickname, text: msgText }),
      });
    }
  }

  getMsgs() {
    return this.http.get<IMessage[]>(environment.apiUrl + 'messages/all');
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
