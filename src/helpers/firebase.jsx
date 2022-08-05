import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";
import { useEffect, useState } from "react";
import Toastify from "../components/Toastify";


const firebaseConfig = {
  apiKey: "AIzaSyAmpr8ZfccnfROgsmEk6RHdixpTl_26qnI",
  authDomain: "fireblog-f7c76.firebaseapp.com",
  projectId: "fireblog-f7c76",
  databaseURL: "https://fireblog-f7c76-default-rtdb.firebaseio.com",
  storageBucket: "fireblog-f7c76.appspot.com",
  messagingSenderId: "413635915327",
  appId: "1:413635915327:web:b54a3ad791e956e7bc528a"
  };


  const firebase = initializeApp(firebaseConfig);

  export default firebase;
  
  const auth = getAuth(firebase);

export const createUser = async (email, password, displayName, navigate) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });
    navigate("/");
    
    Toastify("THE USER HAS CREATED! 🎉")
  } catch (error) {
    Toastify(error.message)
  }
};

export const loginUser = async (email, password, navigate) => {
  try {
    let user = await signInWithEmailAndPassword(auth, email, password);
    navigate("/");
    console.log(user);
    Toastify("THE USER HAS LOGED IN! 👍🏼")
  } catch (error) {
    Toastify(error.message)
  }
};

export const logOut = () => {
  signOut(auth);
  
  Toastify("THE USER HAS LOGED OUT! 👍🏼")
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);
    } else {
      setCurrentUser(false);
    }
  });
};

export const Additem = (initialValues, currentUser) => {
  
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date1 = new Date();

  const database = getDatabase();
  const itemRef = ref(database, "users");
  const newİtem = push(itemRef);

  set(newİtem, {
    
    title: initialValues.title,
    imgurl: initialValues.imgurl,
    content: initialValues.content,
    date: `${
      months[date1.getMonth()]
    } ${new Date().getDate()} , ${new Date().getFullYear()}`,
    email : currentUser.email
  });
  Toastify("THE ITEM HAS ADDED! ✅")
};

export const useFetch = () => {
  const [items, setItems] = useState();

  useEffect(() => {
    const database = getDatabase();
    const itemRef = ref(database, "users");

    onValue(itemRef, (snapshot) => {
      const data = snapshot.val();
      const myArray = [];
      for (let id in data) {
        myArray.push({ id, ...data[id] });
      }
      setItems(myArray);
    });
  }, []);

  return { items };
};

export const DeleteItem = (id) => {
  const database = getDatabase();
  remove(ref(database, "users/" + id))
  Toastify("THE ITEM HAS DELETED! ✅")
}
export const editItem1 = (initialValues) => {
  const database = getDatabase();
  const updates = {};
  updates["users/"+initialValues.id] = initialValues;
  Toastify("THE ITEM HAS UPDATED! ✅")

  return update(ref(database), updates)
}