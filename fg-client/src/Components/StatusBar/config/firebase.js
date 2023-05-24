// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgcmlPkBPF4BGS2QvnV0AqEWjjzVntZuo",
  authDomain: "flavorgram-fd31f.firebaseapp.com",
  projectId: "flavorgram-fd31f",
  storageBucket: "flavorgram-fd31f.appspot.com",
  messagingSenderId: "379923963947",
  appId: "1:379923963947:web:429830de4e913114dd4a6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);