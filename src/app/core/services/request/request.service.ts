import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IRequest } from '@core/interfaces/request.interface';

@Injectable()
export class RequestService {

  requestCollection: AngularFirestoreCollection;

  constructor(
    private fireStore: AngularFirestore
  ) {
    this.requestCollection = fireStore.collection('requests');
  }

  createRequest(request: IRequest) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.requestCollection.doc(cleanEmail).collection('request').doc(request.sender).set(request);
  }

  getRequests(email: string) {
    email = email.replace('.', ',');
    return this.requestCollection.doc(email).collection('request').valueChanges();
  }

  setRequest(request: IRequest) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.requestCollection.doc(cleanEmail).collection('request').doc(request.sender).update(request);
  }

  deleteRequest(request: IRequest) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.requestCollection.doc(cleanEmail).collection('request').doc(request.sender).delete();
  }
}
