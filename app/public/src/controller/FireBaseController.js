import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  child,
  update,
  remove,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";

const firebaseStore = {
  apiKey: "AIzaSyDc0-3-4Qz3X8Hx2YCiXW93LD3R9QUquWY",
  authDomain: "dropbox-clone-296f1.firebaseapp.com",
  databaseURL:
    "https://dropbox-clone-296f1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dropbox-clone-296f1",
  storageBucket: "dropbox-clone-296f1.appspot.com",
  messagingSenderId: "868526418652",
  appId: "1:868526418652:web:c26b84ba50608ebc0b2219",
};
initializeApp(firebaseStore);


//const db = getDatabase(initializeApp(firebaseStore));
let db = getDatabase();

window.app.DB = db; // mandando os FireBase globalmente;
// console.log("Global", window.app.DB);

// ----------------------------------insert data---------------------------------//
// tenho que passar o Knock e um Objeto ocm os dados, que chamamos de result
// function  insert(address, result) {
//   set(ref(db, `${address}/`), {
//     result
//   });
//}

class FireBaseController {
  constructor() {
    initializeApp(firebaseStore);
    console.log("DB", db);
    this.db = getDatabase();
  }

  static INSERT(address, result) {
    set(ref(this.db, `${address}/`), {
      result,
    });
  }
} //end class
