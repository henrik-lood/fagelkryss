import React, { useState } from "react";
import styles from "../css/Login.module.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export const ResetPasswordPage = () => {
  const auth = getAuth();

  const [resetEmail, setResetEmail] = useState(null);

  const resetPassword = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert("Ett mail med länk är nu skickat till din mailadress");
      })
      .catch((error) => {
        alert("Något gick fel, försök igen");
      });
  };

  return (
    <>
      <form
        className={`${styles.containerInput} login`}
        onSubmit={(e) => resetPassword(e)}
      >
        <h3>Återställ lösenord</h3>

        <div className={`${styles.margin}`}>
          <label className={`${styles.input} d-block`} htmlFor="email">
            Email:
          </label>
          <input
            className={`${styles.input} d-block`}
            type="email"
            name="email"
            onChange={(e) => setResetEmail(e.target.value)}
          ></input>
        </div>
        <button className={`${styles.btn} d-block`}>
          Återställ mitt lösenord
        </button>
      </form>
    </>
  );
};
