import "./Board.css";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import Cassette from "../../assets/imgs/cassette.png";
import Vinyl from "../../assets/imgs/vinyl.png";

export default function Board(props) {
  const [currentGame, setCurrentGame] = useState([]);
  const [modifierList, setModifierList] = useState([]);

  useEffect(() => {
    if (props.gamestate !== undefined) {
      setModifierList(props.gamestate.modifiers);
      // validateBoard();
    }
  }, [props.gamestate]);

  const updateCell = (e) => {
    //var val = parseInt(e.target.innerText);

    var y = parseInt(e.target.parentNode.id);
    var x = parseInt(e.target.id);

    var val = currentGame[y][x];

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
    console.log(currentGame);
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
                <img src={Cassette} />
              ) : (
                <img src={Vinyl} />
              )}
              <img src="" alt="" />
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
