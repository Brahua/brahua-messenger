import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'brahua-messenger';

  constructor(
    private swUpdate: SwUpdate,
    private fireMessagin: AngularFireMessaging,
    private fireStore: AngularFirestore
  ) { }

  ngOnInit() {
    this.updatePWA();
    this.requestPermission();
    this.listenNotification();
  }

  updatePWA() {
    this.swUpdate.available
      .subscribe(value => {
        console.log(value);
        window.location.reload();
      });
  }

  requestPermission() {
    this.fireMessagin.requestToken
      .subscribe(token => {
        this.fireStore.collection('tokens').add({ token });
        console.log('token', token);
      });
  }

  listenNotification() {
    this.fireMessagin.messages
      .subscribe(message => console.log(message));
  }
}
