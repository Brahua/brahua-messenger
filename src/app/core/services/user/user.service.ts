import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { UsuarioModel } from '@core/models/user.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable()
export class UserService {

  userCollection: AngularFirestoreCollection<UsuarioModel>;

  constructor(
    private fireStore: AngularFirestore
  ) {
    this.userCollection = this.fireStore.collection('users');
  }

  addUser(user: UsuarioModel) {
    return this.userCollection.doc(user.id).set({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email
    });
  }

  getUsers() {
    return this.userCollection.valueChanges();
  }

  getUser(id: string) {
    return this.userCollection.doc(id).valueChanges();
  }

  updateUser(user: UsuarioModel) {
    return this.userCollection.doc(user.id).update({ ...user });
  }

  addFriend(id: string, idFriend: string) {
    return this.userCollection.doc(id).collection('friends').doc(idFriend).set({ idFriend });
  }

  getFriends(id: string) {
    return this.userCollection.doc(id).collection('friends').valueChanges();
  }
}
