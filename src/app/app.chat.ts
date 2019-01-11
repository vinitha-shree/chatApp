import {Component, Input, OnInit } from '@angular/core';
import {ChatEngine} from './chatengine';
@Component({
  selector: 'app-chat',
  templateUrl: './app.chat.html'
})
export class AppChatComponent implements OnInit {
  private ce: any;
  @Input() chat: any;
  @Input() index: number;
  users: any[] = [];
  messages: any[] = [];
  message: string;
  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
  }
  ngOnInit() {
    this.chat.on('message', (payload) => {
        // if the last message was sent from the same user
        payload.sameUser = this.messages.length > 0 && payload.sender.uuid === this.messages[this.messages.length - 1].sender.uuid;
        // if this message was sent by this client
        payload.isSelf = payload.sender.name === 'Me';
        // add the message to the array
        this.messages.push(payload);
      });
  }
  getUsers(obj) {
    let users: any = [];
    if (obj) {
      Object.keys(obj).forEach((key) => {
        users.push(obj[key]);
      });
    }
    return users;
  }

  send() {
    this.chat.emit('message', { text: this.message });
    this.message = '';
  }
  leave() {
    this.chat.leave();
    this.ce.chats.splice(this.index, 1);
    return false;
  }
}