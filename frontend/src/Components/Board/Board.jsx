import "./Board.css";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

export default function Board(props) {
  const [modifierList, setModifierList] = useState([]);

  const validateRowOrColumn = (rowOrColumn) => {
    var streak = 0;
    var prev = -1;
    var one = 0;
    var two = 0;
    for (let i = 0; i < rowOrColumn.length; i++) {
      if (rowOrColumn[i] === prev || (prev === -1 && rowOrColumn[i] !== 0)) {
        streak++;
        console.log("Streak is: " + streak);
        prev = rowOrColumn[i];
        if (streak >= 3) {
          console.log("Streak is too long: " + streak);
          return false;
        }
        if (rowOrColumn[i] === 0) {
          streak = 0;
        }
      } else {
        if (streak >= 3) {
          console.log("Streak is too long: " + streak);
          return false;
        }
        streak = 0;
      }
      if (streak >= 3) {
        console.log("Streak is too long outside: " + streak);

        return false;
      }

      if (rowOrColumn[i] === 1) {
        one++;
      }
      if (rowOrColumn[i] === 2) {
        two++;
      }
    }
    if (one > 3 || two > 3) {
      return false;
    }
    return true;
  };

  const highlightRowOrColumn = (type, rowOrColumn, i) => {
    //change color of row or column to red
    if (type === "row") {
      let rows = document.getElementsByClassName("row");
      console.log("Row " + i + " is invalid");
      for (let j = 0; j < rowOrColumn.length; j++) {
        rows[i].childNodes[j].style.backgroundColor = "pink";
        //document.getElementsByClassName("i")[j].style.backgroundColor = "red";
      }
    }
    if (type === "column") {
      let columns = document.getElementsByClassName("cell");
      console.log("Column " + i + " is invalid");
      for (let j = 0; j < rowOrColumn.length; j++) {
        columns[j * 6 + i].style.backgroundColor = "pink";
      }
    }
  };

  const highlightCell = (i, j) => {
    var columns = document.getElementsByClassName("cell");
    columns[j * 6 + i].style.backgroundColor = "pink";
  };

  const resetColour = () => {
    var columns = document.getElementsByClassName("cell");
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        columns[j * 6 + i].style.backgroundColor = "#d4d4fa";
      }
    }
  };

  const validateBoard = (gamestate) => {
    if (gamestate === undefined) {
      return;
    }
    var invalid = false;
    var game = gamestate;
    if (game) {
      // Check if blatant violation of modifier rules
      for (let i = 0; i < modifierList.length; i++) {
        var first = game[modifierList[i].y1][modifierList[i].x1];
        var second = game[modifierList[i].y2][modifierList[i].x2];
        if (modifierList[i].kind === 1) {
          if (first !== second && first !== 0 && second !== 0) {
            highlightCell(modifierList[i].x1, modifierList[i].y1);
            highlightCell(modifierList[i].x2, modifierList[i].y2);
            invalid = true;
          }
        } else {
          if (first === second && first !== 0 && second !== 0) {
            highlightCell(modifierList[i].x1, modifierList[i].y1);
            highlightCell(modifierList[i].x2, modifierList[i].y2);
            invalid = true;
          }
        }
      }
    }

    // Check if 3 or more consecutive symbols in a row or column
    // check if more than 3 in a row or column
    for (let i = 0; i < game.length; i++) {
      console.log(game[i]);
      console.log("validating row " + i);
      if (!validateRowOrColumn(game[i])) {
        highlightRowOrColumn("row", game[i], i);
        invalid = true;
      }
      let col = [];
      for (var j = 0; j < game[i].length; j++) {
        col.push(game[j][i]);
      }
      console.log("validating column " + i);
      if (!validateRowOrColumn(col)) {
        highlightRowOrColumn("column", col, i);
        invalid = true;
      }
    }

    if (!invalid) {
      resetColour();
    }
  };

  useEffect(() => {
    if (props.gamestate !== undefined) {
      setModifierList(props.gamestate.modifiers);
      validateBoard(props.gamestate.spaces);
    }
    console.log("here are the locked spaces");
    console.log(props.lockedSpaces);
    for (let i = 0; i < props.lockedSpaces.length; i++) {
      let x = props.lockedSpaces[i].A;
      let y = props.lockedSpaces[i].B;
      if (x !== -1 && y !== -1) {
        let columns = document.getElementsByClassName("cell");
        columns[y * 6 + x].style.backgroundColor = "darkgrey";
      }
    }
  }, [props.gamestate]);

  const updateCell = (e) => {
    //var val = parseInt(e.target.innerText);

    var y = parseInt(e.target.parentNode.id);
    var x = parseInt(e.target.id);
    console.log(props.gamestate);
    console.log(y);
    var val = props.gamestate.spaces[y][x];

    val += 1;
    if (val > 2) {
      val = 0;
    }

    props.moveCallBack({
      command: "place_symbol",
      placementPosition: { x, y, symbol: val },
    });

    x = parseInt(e.target.parentNode.id);
    y = parseInt(e.target.id);
  };

  const printBoard = () => {
    console.log(modifierList);
  };

  return (
    <div className="yourboard">
      {props.gamestate.spaces.map((row, i) => (
        <div key={i} className="row" id={i}>
          {row.map((cell, j) => (
            <div key={j} className="cell" id={j} onClick={updateCell}>
              {cell == 0 ? (
                <div></div>
              ) : cell == 1 ? (
                <FontAwesomeIcon
                  className="play-icon"
                  size="2x"
                  icon={faPlay}
                />
              ) : (
                <FontAwesomeIcon
                  className="pause-icon"
                  size="2x"
                  icon={faPause}
                />
              )}
              <Modifier position={[modifierList, j, i]} same={true} />
            </div>
          ))}
        </div>
      ))}
      <h2>You</h2>
    </div>
  );
}
Board.propTypes = {
  gamestate: propTypes.any,
  moveCallBack: propTypes.func,
  lockedSpaces: propTypes.any,
};

function getModifier(modifierList, i, j) {
  // Iterate over each object in the array
  for (let item of modifierList) {
    // Check if the given i and j match x1-1 and y1-1
    if (i == item.x1 && j == item.y1) {
      if (i < item.x2) {
        return ["right", item.kind];
      } else if (i > item.x2) {
        return ["left", item.kind];
      } else if (j < item.y2) {
        return ["bottom", item.kind];
      } else {
        return ["top", item.kind];
      }
    }
  }
  return null; // Return false if no matching pair is found
}

export function Modifier(props) {
  const side = getModifier(
    props.position[0],
    props.position[1],
    props.position[2]
  );

  if (side == null) {
    return;
  } else {
    if (side[1] == 1) {
      // use =
      return <a className={"modifier-symbol-" + side[0]}>{"="}</a>;
    } else {
      return <a className={"modifier-symbol-" + side[0]}>{"✖"}</a>;
    }
  }
}
