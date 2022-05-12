import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { UsersContext } from "../contexts/UsersContext";
import { BirdCard } from "../components/BirdCard";
import styles from "../css/HomePage.module.css";
import { Filter } from "../components/Filter";

export const HomePage = () => {
  const {
    userBirds,
    updateBirds,
    userBirdsCopy,
    isChanges,
    userUid,
    isFilter,
    birdsCopy,
    setBirdsCopy,
    birdsMaster,
    setIsFilter,
    msg,
    setMsg,
    birdCount,
    setBirdCount,
  } = useContext(UsersContext);
  const [myBirds, setMyBirds] = useState(null);

  useEffect(() => {
    if (userBirdsCopy) {
      setMyBirds({ birds: [...userBirdsCopy.birds] });
    }
  }, [userBirdsCopy]);

  useEffect(() => {
    setBirdCount(0);
  }, [userUid]);

  const count = (type, myMsg) => {
    if (userUid) {
      filterByCheck(type);
      setBirdCount(0);
      myMsg = myMsg.toLowerCase();
      setMsg(` ${myMsg}`);
      let localBirdCount = 0;
      userBirds.birds.forEach((bird) => {
        if (bird.hasOwnProperty(type)) {
          if (bird[type] === true) {
            localBirdCount++;
          }
        }
      });
      setBirdCount(localBirdCount);
    } else {
      alert("Du måste vara inloggad för att lägga till en fågel.");
    }
  };

  const filterByCheck = (type) => {
    const userBirdsLocal = userBirdsCopy.birds.filter(
      (bird) => bird.hasOwnProperty(type) && bird[type] === true
    );

    let localMatches = [];
    userBirdsLocal.forEach((birdU) => {
      birdsMaster.forEach((birdM) => {
        if (birdU.birdId === birdM.id) {
          localMatches.push(birdM);
        }
      });
    });

    localMatches.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    setBirdsCopy(localMatches);
    setIsFilter(true);
  };

  return (
    <div className={`${styles.margin}`}>
      <div className={`${styles.stickyContainer}`}>
        <button className={`${styles.saveBtn}`} onClick={() => updateBirds()}>
          Spara ändringar
        </button>
        {isChanges ? (
          <p className={`${styles.alertRed}`}>
            Glöm inte att spara dina ändringar!
          </p>
        ) : (
          <p className={`${styles.alertGreen}`}>
            Du har inga ändringar att spara
          </p>
        )}
        <button
          className={`${styles.upBtn}`}
          onClick={() => window.scrollTo(0, 0)}
        >
          ↑
        </button>
      </div>
      <div className={`${styles.dropdown}`}>
        {msg && (
          <button className={`${styles.dropbtn}`}>
            Antal{msg}: {birdCount}
          </button>
        )}
        {!msg && <button className={`${styles.dropbtn}`}>Visa kryss</button>}

        <div className={`${styles.dropdownContent}`}>
          <button onClick={(e) => count("seenSwe", e.target.textContent)}>
            Sedda i Sverige
          </button>
          <button onClick={(e) => count("heardSwe", e.target.textContent)}>
            Hörda i Sverige
          </button>
          <button onClick={(e) => count("ringedSwe", e.target.textContent)}>
            Ringmärkta i Sverige
          </button>
          <button onClick={(e) => count("seenInt", e.target.textContent)}>
            Sedda utomlands
          </button>
          <button onClick={(e) => count("heardInt", e.target.textContent)}>
            Hörda utomlands
          </button>
          <button onClick={(e) => count("ringedInt", e.target.textContent)}>
            Ringmärkta utomlands
          </button>
        </div>
      </div>
      <Filter />
      <div className="d-flex flex-wrap justify-content-center">
        {birdsMaster &&
          !isFilter &&
          birdsMaster.map((bird, i) => (
            <BirdCard key={i} bird={bird} myBirds={myBirds} />
          ))}
        {birdsCopy &&
          isFilter &&
          birdsCopy.map((bird, i) => (
            <BirdCard key={i} bird={bird} myBirds={myBirds} />
          ))}
        {birdsCopy && birdsCopy.length === 0 && isFilter && (
          <p>Inga sökträffar</p>
        )}
      </div>
    </div>
  );
};
