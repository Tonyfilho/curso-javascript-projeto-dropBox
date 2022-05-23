import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
getDatabase,
ref,
set,
child,
update,
remove,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js";

//  module.exports = class FirebaseDatabase {
//      DB = '';
     
//         constructor() {
//             initializeApp(firebaseStore);
//             this.DB = getDatabase();
//         } 
        
//     firebaseStore = {
//         apiKey: "AIzaSyDc0-3-4Qz3X8Hx2YCiXW93LD3R9QUquWY",
//         authDomain: "dropbox-clone-296f1.firebaseapp.com",
//         databaseURL:
//           "https://dropbox-clone-296f1-default-rtdb.europe-west1.firebasedatabase.app",
//         projectId: "dropbox-clone-296f1",
//         storageBucket: "dropbox-clone-296f1.appspot.com",
//         messagingSenderId: "868526418652",
//         appId: "1:868526418652:web:c26b84ba50608ebc0b2219",
//       };
// }
  class FirebaseDatabase {
     DB = '';
     
        constructor() {
            initializeApp(firebaseStore);
            this.DB = getDatabase();
        } 
        
    firebaseStore = {
        apiKey: "AIzaSyDc0-3-4Qz3X8Hx2YCiXW93LD3R9QUquWY",
        authDomain: "dropbox-clone-296f1.firebaseapp.com",
        databaseURL:
          "https://dropbox-clone-296f1-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "dropbox-clone-296f1",
        storageBucket: "dropbox-clone-296f1.appspot.com",
        messagingSenderId: "868526418652",
        appId: "1:868526418652:web:c26b84ba50608ebc0b2219",
      };
}