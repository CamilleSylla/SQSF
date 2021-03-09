  
import firebase from 'firebase/app'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDBLBkW1JXG8_2TWbJOQ8rr7mtIsVfx0CI",
    authDomain: "store-image-e831c.firebaseapp.com",
    databaseURL: "https://store-image-e831c.firebaseio.com",
    projectId: "store-image-e831c",
    storageBucket: "store-image-e831c.appspot.com",
    messagingSenderId: "390047860766",
    appId: "1:390047860766:web:8abdcccbf283441725c60f"
  };
  
  if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}else {
   firebase.app(); // if already initialized, use that one
}

  const storage = firebase.storage();

  export {
      storage,
       firebase as default
    }