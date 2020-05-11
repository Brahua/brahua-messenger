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
    private fireStore: AngularFirestore,
    private fireStorage: AngularFireStorage
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
    return this.userCollection.get()
      .pipe(
        map(querySnapshot => {
          const friends: UsuarioModel[] = [];
          querySnapshot.forEach((doc) => {
            friends.push(doc.data());
          });
          return friends;
        })
      );
  }

  getUser(id: string) {
    return this.userCollection.doc(id).get()
      .pipe(
        map(resp => resp.data())
      );
  }

  updateUser(user: UsuarioModel) {
    return this.userCollection.doc(user.id).update({ ...user });
  }
}
