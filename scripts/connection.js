const firebaseConfig = {
    apiKey: "AIzaSyBSr9k8flHX6YFjtgPI46wSqgE88lhI4UE",
    authDomain: "zeus-chat-1d5c2.firebaseapp.com",
    databaseURL: "https://zeus-chat-1d5c2-default-rtdb.firebaseio.com",
    projectId: "zeus-chat-1d5c2",
    storageBucket: "zeus-chat-1d5c2.appspot.com",
    messagingSenderId: "1094003248066",
    appId: "1:1094003248066:web:565ce4739f5e4cef00645b",
    measurementId: "G-P8TD8NFF5M"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };