importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBK6ERxBeqllVW70VwMYs5Pss9oMGhShX8",
  authDomain: "vidyut-b88c5.firebaseapp.com",
  projectId: "vidyut-b88c5",
  messagingSenderId: "552051945759",
  appId: "1:552051945759:web:79038ee244d63ba38bc02a"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload);
  const { title, body } = payload.notification;
  self.registration.showNotification(title, {
    body,
    icon: "maskable_icon.png"
  });
});
