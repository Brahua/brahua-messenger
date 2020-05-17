import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { MessageService } from './services/message/message.service';
import { ConversationService } from './services/conversation/conversation.service';
import { RequestService } from './services/request/request.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireMessagingModule
  ],
  providers: [AuthService, UserService, MessageService, ConversationService, RequestService],
  exports: [
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireMessagingModule
  ]
})
export class CoreModule { }
