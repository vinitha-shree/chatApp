import {Component} from '@angular/core';
import {ChatEngine} from './chatengine';
@Component({
  selector: 'app-chats',
  templateUrl: './app.chats.html'
})
export class AppChatsComponent {
  private ce: any;
  constructor(private chatEngine: ChatEngine) {
    this.ce = chatEngine;
    
  }
  
}