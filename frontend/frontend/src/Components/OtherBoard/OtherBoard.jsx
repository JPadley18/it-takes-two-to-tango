import "./OtherBoard.css";
import { useEffect, useState } from "react";
import propTypes from "prop-types";

export default function OtherBoard(props) {
  const [currentGame, setCurrentGame] = useState([]);

  useEffect(() => {
    if (props.gamestate != undefined) {
      console.log(props.gamestate.spaces);
      setCurrentGame(props.gamestate.spaces);
    } else {
      setCurrentGame([
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
        [false, false, false, false, false, false],
      ]);
    }
  }, [props.gamestate]);

  return (
    <div>
      {currentGame.map((row, i) => (
        <div key={i} className="row" id={i}>
          {row.map((cell, j) => (
            <div key={j} className="cell" id={j}>
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
OtherBoard.propTypes = {
  gamestate: propTypes.json,
};
