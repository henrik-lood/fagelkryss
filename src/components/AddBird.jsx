import React, { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";
import styles from "../css/AddBird.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const AddBird = () => {
  const { addBird, setNewName, setLatinName, newName, latinName, userEmail } =
    useContext(UsersContext);

  const createNewBird = (e) => {
    e.preventDefault();
    const newBird = {
      name: newName,
      latinName: latinName,
      creater: userEmail,
    };
    console.log(newBird);
    addBird(newBird);
  };

  return (
    <form
      className={`${styles.container} mx-auto`}
      onSubmit={(e) => createNewBird(e)}
    >
      <h3>Lägg till fågel</h3>
      <div className={`${styles.inputContainer}`}>
        <label className="d-block" htmlFor="newName">
          Svenskt namn:
        </label>
        <input
          required
          className={`${styles.center} input d-block`}
          type="newName"
          name="newName"
          onChange={(e) => setNewName(e.target.value.toLowerCase())}
        ></input>
      </div>
      <div className={`${styles.inputContainer}`}>
        <label className="d-block" htmlFor="latinName">
          Latinskt namn:
        </label>
        <input
          required
          className={`${styles.center} input d-block`}
          type="latinName"
          name="latinName"
          onChange={(e) => setLatinName(e.target.value.toLowerCase())}
        ></input>
      </div>
      <button className={`${styles.btn} d-block`}>Lägg till fågel</button>
    </form>
  );
};
