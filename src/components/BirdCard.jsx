import React, { useContext } from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { UsersContext } from "../contexts/UsersContext";
import styles from "../css/BirdCard.module.css";

export const BirdCard = ({ bird, myBirds }) => {
  const { userBirdsCopy, setUserBirdsCopy, setIsChanges, removeBird, userUid } =
    useContext(UsersContext);

  const isChecked = (checkType) => {
    let bool = false;
    if (userBirdsCopy) {
      userBirdsCopy.birds.forEach((userBird) => {
        if (userBird.birdId === bird.id) {
          if (userBird.hasOwnProperty(checkType)) {
            bool = userBird[checkType];
          }
        }
      });
    }
    return bool;
  };

  const saveComment = (commentToSave) => {
    if (userUid) {
      const updatedBird = userBirdsCopy.birds.find(
        (myBird) => myBird.birdId === bird.id
      );
      let newBird = {};
      if (updatedBird) {
        updatedBird.comment = commentToSave;
      } else {
        newBird.birdId = bird.id;
        newBird.comment = commentToSave;
      }

      let index = getIndex(bird.id);
      if (updatedBird) {
        insertBird(updatedBird, index);
      } else {
        insertBird(newBird, index);
      }

      setUserBirdsCopy(myBirds);
      setIsChanges(true);
    } else {
      alert("Du måste vara inloggad.");
    }
  };

  const saveDate = (dateToSave) => {
    if (userUid) {
      const updatedBird = userBirdsCopy.birds.find(
        (myBird) => myBird.birdId === bird.id
      );
      let newBird = {};
      if (updatedBird) {
        updatedBird.date = dateToSave;
      } else {
        newBird.birdId = bird.id;
        newBird.date = dateToSave;
      }

      let index = getIndex(bird.id);
      if (updatedBird) {
        insertBird(updatedBird, index);
      } else {
        insertBird(newBird, index);
      }

      setUserBirdsCopy(myBirds);
      setIsChanges(true);
    } else {
      alert("Du måste vara inloggad.");
    }
  };

  const check = (e) => {
    if (userUid) {
      //get data-function-type
      const typeClicked = e.target.getAttribute("data-function-type");

      // find bird in userBirds
      const updatedBird = userBirdsCopy.birds.find(
        (myBird) => myBird.birdId === bird.id
      );
      let newBird = {};
      if (updatedBird) {
        // invert status (or set status to true)
        if (typeClicked in updatedBird) {
          //set typeClicked to opposite existing value
          updatedBird[typeClicked] = !updatedBird[typeClicked];
        } else {
          //typeClicked does not exist in bird - create and set typeClicked
          updatedBird[typeClicked] = true;
        }
      } else {
        // add bird to userBirds
        newBird.birdId = bird.id;
        newBird[typeClicked] = true;
      }
      // replace old bird with new updated bird
      let index = getIndex(bird.id);

      if (updatedBird) {
        insertBird(updatedBird, index);
      } else {
        insertBird(newBird, index);
      }
      setUserBirdsCopy(myBirds);
      setIsChanges(true);
    } else {
      alert("Du måste vara inloggad.");
    }
  };

  const insertBird = (theBird, index) => {
    if (index !== -1) {
      myBirds.birds[index] = theBird;
    } else {
      myBirds.birds.push(theBird);
    }
  };

  const getIndex = (id) => {
    return userBirdsCopy.birds.findIndex(function (myBird) {
      return myBird.birdId === id;
    });
  };

  const isComment = () => {
    let string = "";
    if (userBirdsCopy) {
      userBirdsCopy.birds.forEach((userBird) => {
        if (userBird.birdId === bird.id) {
          if (userBird.hasOwnProperty("comment")) {
            string = userBird.comment;
          }
        }
      });
    }
    return string;
  };

  const isDate = () => {
    let string = "";
    if (userBirdsCopy) {
      userBirdsCopy.birds.forEach((userBird) => {
        if (userBird.birdId === bird.id) {
          if (userBird.hasOwnProperty("date")) {
            string = userBird.date;
          }
        }
      });
    }
    return string;
  };

  const removeComment = () => {
    if (userUid) {
      const updatedBird = userBirdsCopy.birds.find(
        (myBird) => myBird.birdId === bird.id
      );
      delete updatedBird.comment;
      let index = getIndex(bird.id);
      insertBird(updatedBird, index);
      setUserBirdsCopy(myBirds);
      setIsChanges(true);
    } else {
      alert("Du måste vara inloggad.");
    }
  };

  const checkComment = () => {
    let theComment;
    if (userBirdsCopy) {
      const birdWithComment = userBirdsCopy.birds.find(
        (myBird) => myBird.birdId === bird.id && myBird.comment
      );
      if (birdWithComment) {
        theComment = <p className={`${styles.commentBox}`}>{isComment()}</p>;
      }
    }

    return theComment;
  };

  return (
    <Card className={`${styles.card} m-1`}>
      <Card.Body>
        {bird.hasOwnProperty("creater") && (
          <button
            onClick={(e) => removeBird(e, bird)}
            className={`${styles.deleteBtn}`}
          >
            X
          </button>
        )}

        <Card.Title className={`${styles.birdName}`} id={bird.id}>
          {bird.name.charAt(0).toUpperCase() + bird.name.slice(1)}
        </Card.Title>
        <Card.Subtitle className={`mb-2 text-muted fst-italic`}>
          {bird.latinName.charAt(0).toUpperCase() + bird.latinName.slice(1)}
        </Card.Subtitle>
        <div className="d-flex justify-content-between">
          <div>
            <h6>Sverige</h6>
            <div className="form-check">
              <label>Sett</label>
              <input
                className="form-check-input"
                type="checkbox"
                data-function-type="seenSwe"
                onChange={(e) => check(e)}
                checked={isChecked("seenSwe")}
              ></input>
            </div>
            <div className="form-check">
              <label>Hört</label>
              <input
                className="form-check-input"
                type="checkbox"
                data-function-type="heardSwe"
                onChange={(e) => check(e)}
                checked={isChecked("heardSwe")}
              ></input>
            </div>
            <div className="form-check">
              <label>Ringmärkt</label>
              <input
                className="form-check-input"
                type="checkbox"
                data-function-type="ringedSwe"
                onChange={(e) => check(e)}
                checked={isChecked("ringedSwe")}
              ></input>
            </div>
          </div>
          <div>
            <h6>Utomlands</h6>
            <div className="form-check">
              <label>Sett</label>
              <input
                className="form-check-input"
                type="checkbox"
                data-function-type="seenInt"
                onChange={(e) => check(e)}
                checked={isChecked("seenInt")}
              ></input>
            </div>
            <div className="form-check">
              <label>Hört</label>
              <input
                className="form-check-input"
                type="checkbox"
                data-function-type="heardInt"
                onChange={(e) => check(e)}
                checked={isChecked("heardInt")}
              ></input>
            </div>
            <div className="form-check">
              <label>Ringmärkt</label>
              <input
                className="form-check-input"
                type="checkbox"
                data-function-type="ringedInt"
                onChange={(e) => check(e)}
                checked={isChecked("ringedInt")}
              ></input>
            </div>
          </div>
        </div>
        <input
          className={`${styles.date} mt-3`}
          type="date"
          onChange={(e) => saveDate(e.target.value)}
          value={isDate()}
        ></input>
        <div className="comment">
          <label className={`${styles.bold} mt-2`}>
            <h6>Kommentar:</h6>
          </label>
          {checkComment()}
          <input
            className={`${styles.commentInput} commentInputField`}
            type="text"
            onChange={(e) => saveComment(e.target.value)}
          ></input>
          <button
            className={`${styles.deleteCommentBtn}`}
            onClick={removeComment}
          >
            Ta bort kommentar
          </button>
        </div>
      </Card.Body>
    </Card>
  );
};
