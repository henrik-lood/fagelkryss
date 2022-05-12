import React, { useContext, useEffect } from "react";
import { UsersContext } from "../contexts/UsersContext";
import styles from "../css/Login.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const { signup, setEmail, setPassword, userUid } = useContext(UsersContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userUid) {
      navigate("/");
    }
  }, [userUid, navigate]);

  return (
    <form
      className={`${styles.containerInput} signup`}
      onSubmit={(e) => signup(e)}
    >
      <h3>Skapa konto</h3>

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
      <button className={`${styles.btn} d-block`}>Skapa konto</button>
      <Link className={`${styles.link} d-block`} to="/login">
        Har du redan ett konto? Klicka här!
      </Link>
    </form>
  );
};
