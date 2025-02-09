import "./Board.css";
import { useState, useEffect } from "react";
import propTypes from "prop-types";

export default function Board(props) {
  const [currentGame, setCurrentGame] = useState([]);
  const [modifierList, setModifierList] = useState([]);

  useEffect(() => {
    if (props.gamestate != undefined) {
      setCurrentGame(props.gamestate.spaces);
      setModifierList(props.gamestate.modifiers);
    } else {
      setCurrentGame([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
      ]);
    }
  }, [props.gamestate]);

  const updateCell = (e) => {
    var val = parseInt(e.target.innerText);

    val += 1;
    if (val > 2) {
      val = 0;
    }
    var y = parseInt(e.target.parentNode.id);
    var x = parseInt(e.target.id);

    props.moveCallBack({
      command: "place_symbol",
      placementPosition: { x: x, y: y, symbol: val },
    });

    x = parseInt(e.target.parentNode.id);
    y = parseInt(e.target.id);

    var newGame = currentGame;

    newGame[x][y] = val;
    setCurrentGame((currentGame) => [...newGame]);
  };

  const printBoard = () => {
    console.log(currentGame);
    console.log(modifierList);
  };

  return (
    <div>
      {currentGame.map((row, i) => (
        <div key={i} className="row" id={i}>
          {row.map((cell, j) => (
            <div key={j} className="cell" id={j} onClick={updateCell}>
              {cell}
              <Modifier position={[modifierList, j, i]} same={true} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
Board.propTypes = {
  gamestate: propTypes.json,
  moveCallBack: propTypes.func,
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
