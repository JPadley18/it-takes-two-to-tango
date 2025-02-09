import "./OtherBoard.css";
import { useEffect, useState } from "react";
import propTypes from "prop-types";

export default function OtherBoard(props) {
  const [currentGame, setCurrentGame] = useState([]);

  useEffect(() => {
    if (props.gamestate != undefined) {
      console.log(props.gamestate);
      setCurrentGame(props.gamestate);
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
      <div className="otherboard">
        {currentGame.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {row.map((cell, cellIndex) => {
                return (
                  <div
                    key={cellIndex}
                    className={cell ? "cell filled" : "cell"}
                  ></div>
                );
              })}
            </div>
          );
        })}
      </div>
      <h2>Opponent</h2>
    </div>
  );
}
OtherBoard.propTypes = {
  gamestate: propTypes.array,
};
