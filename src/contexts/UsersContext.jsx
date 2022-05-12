import { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import {
  setDoc,
  doc,
  updateDoc,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "../initFirebase";

export const UsersContext = createContext();

const UsersProvider = (props) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [userBirds, setUserBirds] = useState(null);
  const [userBirdsCopy, setUserBirdsCopy] = useState(null);
  const [usersAddedBirds, setUsersAddedBirds] = useState(null);
  const [isChanges, setIsChanges] = useState(false);

  const [birdsMaster, setBirdsMaster] = useState(null);
  const [birds, setBirds] = useState(null);

  const [newName, setNewName] = useState();
  const [latinName, setLatinName] = useState();

  const [isFilter, setIsFilter] = useState(false);
  const [birdsCopy, setBirdsCopy] = useState(null);

  const [birdCount, setBirdCount] = useState(0);
  const [msg, setMsg] = useState(null);

  // Get complete list of birds
  const getAllBirds = async () => {
    const colRef = collection(db, "birds");
    const q = query(colRef, orderBy("name"));
    onSnapshot(q, (snapshot) => {
      const birdsArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setBirds(birdsArray);
    });
  };

  // Get list of users added birds
  const getUsersAddedBirds = async () => {
    const colRef = collection(db, `users/${userUid}/myBirds`);

    const q = query(colRef, orderBy("name"));
    onSnapshot(q, (snapshot) => {
      const birdsArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsersAddedBirds(birdsArray);
    });
  };

  useEffect(() => {
    getUsersAddedBirds();
  }, [userUid]);

  useEffect(() => {
    getAllBirds();
  }, []);

  useEffect(() => {
    if (usersAddedBirds && birds) {
      setBirdsMaster(birds.concat(usersAddedBirds));
    }
  }, [usersAddedBirds, birds]);

  // Add new bird
  const addBird = async (newBird) => {
    // Check user
    if (userUid) {
      const colRef = collection(db, "users", userUid, "myBirds");
      await addDoc(colRef, newBird);
      alert("Fågeln är skapad!");
      console.log("Bird has been created");
      // Empty fields
      const inputs = document.querySelectorAll(".input");
      inputs.forEach((input) => {
        input.value = null;
      });
    } else {
      alert("Du måste vara inloggad för att lägga till en fågel.");
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserUid(user.uid);
      setUserEmail(user.email);
    } else {
      setUserUid(null);
      setUserBirdsCopy(null);
      setUserEmail(null);
    }
  });

  useEffect(() => {
    if (userUid) {
      const docRef = doc(db, "users", userUid);
      onSnapshot(docRef, (doc) => {
        setUserBirds(doc.data());
      });
    }
  }, [userUid]);

  useEffect(() => {
    console.log("userBirds:", userBirds);
    if (userBirds) {
      setUserBirdsCopy(userBirds);
    }
  }, [userBirds]);

  const updateBirds = async () => {
    if (userUid) {
      const docRef = doc(db, "users", userUid);
      console.log(userBirdsCopy);
      const inputsToEmpty = document.querySelectorAll(".commentInputField");
      inputsToEmpty.forEach((input) => {
        input.value = "";
      });
      await updateDoc(docRef, userBirdsCopy);
      setIsChanges(false);
    } else {
      alert("Du måste vara inloggad.");
    }
  };

  const signup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        const colRef = doc(db, "users", cred.user.uid);

        const userObject = {
          birdsLists: [],
          birdsMaster: [],
          birds: [],
        };

        setDoc(colRef, userObject);
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Kunde ej skapa konto: ${err.message}`);
      });
  };

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("User logged in:", cred.user);
      })
      .catch((err) => {
        console.log(err.message);
        alert(`Inloggningen misslyckades: ${err.message}`);
      });
  };

  const logout = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("User signed out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const removeBird = async (e, bird) => {
    e.preventDefault();
    console.log(bird.id);
    //Remove from users own collection
    await deleteDoc(doc(db, `users/${userUid}/myBirds`, bird.id));

    const docRef = doc(db, "users", userUid);

    const arrayToKeep = {};
    arrayToKeep.birds = userBirdsCopy.birds.filter(
      (userBird) => userBird.birdId !== bird.id
    );

    await updateDoc(docRef, arrayToKeep);

    // await deleteDoc(doc(db, `users/${userUid}/birds`, bird));
  };

  const values = {
    addBird,
    getAllBirds,
    birds,
    setNewName,
    newName,
    setLatinName,
    latinName,
    signup,
    setEmail,
    setPassword,
    login,
    logout,
    userUid,
    userBirds,
    updateBirds,
    userBirdsCopy,
    setUserBirdsCopy,
    userEmail,
    isChanges,
    setIsChanges,
    isFilter,
    setIsFilter,
    birdsCopy,
    setBirdsCopy,
    birdsMaster,
    setBirdsMaster,
    removeBird,
    birdCount,
    setBirdCount,
    msg,
    setMsg,
  };

  return (
    <UsersContext.Provider value={values}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
