import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCRAXFuURYmnyY_srZ80zQ29e4Y-Z3zMPU",
    authDomain: "electura-auth.firebaseapp.com",
    projectId: "electura-auth",
    storageBucket: "electura-auth.appspot.com",
    messagingSenderId: "1070096999918",
    appId: "1:1070096999918:web:601070ddd5b5c799745aff",
    measurementId: "G-BFH1M504X2"
};

const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;