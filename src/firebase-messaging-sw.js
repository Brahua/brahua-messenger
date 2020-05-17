// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.3/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: 'AIzaSyBlpIOhsv5kUPcUzZiNmnxlKwrzkWwdii8',
  authDomain: 'brahua-messenger.firebaseapp.com',
  databaseURL: 'https://brahua-messenger.firebaseio.com',
  projectId: 'brahua-messenger',
  storageBucket: 'brahua-messenger.appspot.com',
  messagingSenderId: '371891906953',
  appId: '1:371891906953:web:eb2aa788d00db116101958'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
