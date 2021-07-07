import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9Dn3zsUojtHWP-avFR93-bF3ugbuK9Tw",
  authDomain: "formulario-de-usuarios.firebaseapp.com",
  projectId: "formulario-de-usuarios",
  storageBucket: "formulario-de-usuarios.appspot.com",
  messagingSenderId: "223190514357",
  appId: "1:223190514357:web:ed5eb0bf225565a365dcfc",
  measurementId: "G-YJHT4GKX41"
};
// Initialize Firebase
const fire= firebase.initializeApp(firebaseConfig);
const store=fire.firestore()

export {store}






