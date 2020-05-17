import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IConversation } from '@core/interfaces/conversation.interface';
import { map, timestamp } from 'rxjs/operators';

@Injectable()
export class ConversationService {

  conversationCollection: AngularFirestoreCollection<IConversation>;

  constructor(private fireStore: AngularFirestore) {
    this.conversationCollection = this.fireStore.collection('conversation');
  }

  createConversation(conversation: IConversation) {
    return this.conversationCollection.doc(conversation.id)
      .collection('messages').doc(`${conversation.timestamp}`).set(conversation);
  }

  getConversation(id: string) {
    return this.conversationCollection.doc(id)
      .collection('messages', ref => ref.orderBy('timestamp', 'asc')).valueChanges();
  }

  setConversation(conversation: IConversation) {
    return this.conversationCollection.doc(conversation.id)
      .collection('messages').doc(`${conversation.timestamp}`).update(conversation);
  }
}
