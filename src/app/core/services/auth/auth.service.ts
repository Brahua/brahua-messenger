import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '@core/models/user.model';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {

  private user$: BehaviorSubject<UsuarioModel>;
  currentUser: Observable<UsuarioModel>;

  constructor(
    private fireAuth: AngularFireAuth,
    private userService: UserService
  ) {
    this.user$ = new BehaviorSubject(JSON.parse(localStorage.getItem('user')));
    this.currentUser = this.user$.asObservable();
  }

  signUp(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  setCurrentUser(id: string) {
    this.userService.getUser(id)
      .subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.user$.next(user);
        this.currentUser = this.user$.asObservable();
      });
  }

  signOut() {
    localStorage.removeItem('user');
    return this.fireAuth.signOut();
  }

  isAuth() {
    return this.fireAuth.authState;
  }

}
