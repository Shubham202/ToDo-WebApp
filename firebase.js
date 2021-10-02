const firebaseConfig = {
    apiKey: "AIzaSyBZ4MxZcfUU4Djm-zLI85CwSPHIE-DvfuM",
    authDomain: "to-do-app-e31e8.firebaseapp.com",
    projectId: "to-do-app-e31e8",
    storageBucket: "to-do-app-e31e8.appspot.com",
    messagingSenderId: "487769946636",
    appId: "1:487769946636:web:f97538b0234bc17ce2cc29",
    measurementId: "G-CNRF23NL1C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();