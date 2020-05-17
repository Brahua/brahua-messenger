import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { switchMap, timestamp } from 'rxjs/operators';
import { UserService } from '@core/services/user/user.service';
import { UsuarioModel } from '@core/models/user.model';
import { AuthService } from '@core/services/auth/auth.service';
import { ConversationService } from '@core/services/conversation/conversation.service';
import { IConversation } from '@core/interfaces/conversation.interface';
import { MessageUtil } from '@core/utils/util';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  user: UsuarioModel;
  friend: UsuarioModel;
  textMessage: string;
  conversationId: string;
  messages: IConversation[];
  element: any;
  zumbido = false;
  audioMessage = new Audio('/assets/sounds/new_message.mp3');
  audioZumbido = new Audio('/assets/sounds/zumbido.mp3');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private conversationService: ConversationService,
  ) {
    this.activatedRoute.params
      .pipe(switchMap(params => this.userService.getUser(params.id)))
      .pipe(switchMap(friend => {
        this.friend = friend;
        return this.authService.currentUser;
      }))
      .subscribe(user => {
        this.user = user;
        this.conversationId = [this.friend.id, this.user.id].sort().join('-');
        this.getConversation();
      });
  }

  ngOnInit() {
  }

  sendMessage(e: Event) {
    const message: IConversation = {
      id: this.conversationId,
      timestamp: Date.now(),
      text: this.textMessage,
      sender: this.user.id,
      receiver: this.friend.id,
      viewed: false,
      type: 'text'
    };

    this.conversationService.createConversation(message)
      .then(() => this.textMessage = '')
      .catch(error => MessageUtil.error(error.message));
  }

  getConversation() {
    this.conversationService.getConversation(this.conversationId)
      .subscribe((messages: IConversation[]) => {
        this.messages = messages;
        this.messages.forEach(message => {
          if (!message.viewed && message.receiver === this.user.id) {
            message.viewed = true;
            this.conversationService.setConversation(message);
            if (message.type === 'text') {
              this.audioMessage.play();
            } else if (message.type === 'zumbido') {
              this.audioZumbido.play();
              this.zumbido = true;
              setTimeout(() => {
                this.zumbido = false;
              }, 800);
            }
          }
        });
        /* this.element = document.getElementById('app-messages');
        this.element.scrollTop = this.element.scrollHeight + 500;
        console.log('scrollTop', this.element.scrollTop);
        console.log('scrollHeight', this.element.scrollHeight); */
      });
  }

  sendZumbido() {
    const message: IConversation = {
      id: this.conversationId,
      timestamp: Date.now(),
      sender: this.user.id,
      receiver: this.friend.id,
      type: 'zumbido'
    };

    const audio = new Audio('/assets/sounds/zumbido.mp3');
    audio.play();
    this.zumbido = true;
    this.conversationService.createConversation(message)
      .then(() => {
        setTimeout(() => {
          this.zumbido = false;
        }, 500);
      })
      .catch(error => MessageUtil.error(error.message));
  }

}
