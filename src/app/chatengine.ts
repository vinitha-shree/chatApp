import { Injectable } from '@angular/core';
import { ChatEngineCore } from 'chat-engine';
console.log(ChatEngineCore)
@Injectable()
export class ChatEngine {
  instance: any;
  create: any;
  plugin: any;
  me: any ={ state: {} };
  chat: any = {};
  chats: any[] = [];
  constructor() {
    this.instance = ChatEngineCore.create(
      {
        publishKey: 'pub-c-e34ed782-e5fb-4736-aa91-e8343dd89860',
        subscribeKey: 'sub-c-e7055ef8-14fd-11e9-a469-92940241a6b5'
      },
      {
        debug: true,
        globalChannel: 'chat-engine-angular2-simple'
      });
    this.create = ChatEngineCore.create.bind(this);
    this.plugin = ChatEngineCore.plugin;
  }
  newChat(user) {
    // define a channel
    let chat = new Date().getTime();
    // create a new chat with that channel
    let newChat = new this.instance.Chat(chat);
    // we need to auth ourselves before we can invite others
    newChat.on('$.connected', () => {
      // this fires a private invite to the user
      newChat.invite(user);
      // add the chat to the list
      this.chats.push(newChat);
    });
  }
}