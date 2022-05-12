import React, { useState, useContext } from "react";
import { UsersContext } from "../contexts/UsersContext";
import styles from "../css/Filter.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Filter = () => {
  const [filterString, setFilterString] = useState(null);
  const { setIsFilter, setBirdsCopy, birdsMaster, setMsg, setBirdCount } =
    useContext(UsersContext);

  const filter = (e) => {
    e.preventDefault();
    setBirdsCopy(
      birdsMaster.filter(
        (bird) =>
          bird.name.includes(filterString) ||
          bird.latinName.includes(filterString)
      )
    );
    setIsFilter(true);
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setIsFilter(false);
    document.querySelector(".filterInput").value = "";
    setFilterString("");
    setBirdsCopy(null);
    setBirdCount(0);
    setMsg(null);
  };

  return (
    <div>
      <form onSubmit={(e) => filter(e)} className={`${styles.searchContainer}`}>
        <label className="d-block">Sök efter fågel</label>
        <input
          className={`${styles.filterInput} filterInput`}
          placeholder="Sök efter fågel"
          onChange={(e) => setFilterString(e.target.value.toLowerCase())}
        ></input>
        <div className={`d-flex justify-content-between`}>
          <button className={`${styles.btn}`} type="submit">
            Sök
          </button>
          <button className={`${styles.btn}`} onClick={(e) => resetFilter(e)}>
            Visa alla fåglar
          </button>
        </div>
      </form>
    </div>
  );
};
