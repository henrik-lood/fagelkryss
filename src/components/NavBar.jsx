import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { UsersContext } from "../contexts/UsersContext";
import styles from "../css/NavBar.module.css";

export const NavBar = () => {
  const { logout, userUid, userEmail } = useContext(UsersContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className={`${styles.marginTitle} navbar-brand ml-2`} to="/">
        Fågelkryss
      </Link>

      <button
        className={`${styles.navDropDown} navbar-toggler`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {userEmail ? (
        <span className={`${styles.userTag}`}>{userEmail}</span>
      ) : (
        <span className={`${styles.userTag}`}>Du är inte inloggad</span>
      )}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            {userUid ? (
              <span
                onClick={(e) => logout(e)}
                className={`${styles.navLogout} nav-link`}
                to="/"
              >
                Logga ut
              </span>
            ) : (
              <Link className={`${styles.navLogout} nav-link`} to="/login">
                Logga in
              </Link>
            )}
          </li>
          <li className="nav-item active">
            <Link className={`${styles.navLogout} nav-link`} to="/addBird">
              Lägg till fågel
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
