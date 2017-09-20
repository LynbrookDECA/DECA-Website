 var config = {
    apiKey: "AIzaSyBdf755F2RHw5-IUsMR1rYUyCGvpdvKSOk",
    authDomain: "lynbrook-deca.firebaseapp.com",
    databaseURL: "https://lynbrook-deca.firebaseio.com",
    storageBucket: "lynbrook-deca.appspot.com",
    messagingSenderId: "105997057044"
  };
  firebase.initializeApp(config);

  const messaging = firebase.messaging();
  messaging.requestPermission()
  .then(function() {
    console.log('Notification permission granted.');
  // TODO(developer): Retrieve an Instance ID token for use with FCM.
  // ...
})
  .catch(function(err) {
    console.log('Unable to get permission to notify.', err);
  });
