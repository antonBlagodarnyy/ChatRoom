import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../Services/chat.service';


@Component({
  selector: 'app-chat',
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit{
  constructor(private chatService: ChatService) {
 
    
  }
  ngOnInit(): void {
  
  }

}
