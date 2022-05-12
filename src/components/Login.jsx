import React, { useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";
import styles from "../css/Login.module.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const { login, setEmail, setPassword } = useContext(UsersContext);
  return (
    <>
      <form
        className={`${styles.containerInput} login`}
        onSubmit={(e) => login(e)}
      >
        <h3>Logga in</h3>

        <div className={`${styles.margin}`}>
          <label className={`${styles.input} d-block`} htmlFor="email">
            Email:
          </label>
          <input
            className={`${styles.input} d-block`}
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div className={`${styles.margin}`}>
          <label className={`${styles.input} d-block`} htmlFor="password">
            Lösenord:
          </label>
          <input
            className={`${styles.input} d-block`}
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <button className={`${styles.btn} d-block`}>Logga in</button>
        <Link className={`${styles.link} d-block mb-3`} to="/resetPassword">
          Glömt ditt lösenord? Klicka här!
        </Link>
        <Link className={`${styles.link} d-block`} to="/signup">
          Har du inget konto? Klicka här!
        </Link>
      </form>
    </>
  );
};
