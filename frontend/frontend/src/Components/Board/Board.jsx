import "./Board.css";
import { useState, useEffect } from "react";
import propTypes from "prop-types";

export default function Board(props) {
  const [currentGame, setCurrentGame] = useState([]);

  useEffect(() => {
    if (props.gamestate != undefined) {
      console.log(props.gamestate.spaces);
      setCurrentGame(props.gamestate.spaces);
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
    var x = parseInt(e.target.parentNode.id);
    var y = parseInt(e.target.id);

    console.log(props);

    props.moveCallBack({
      command: "place_symbol",
      placementPosition: { x: x, y: y, symbol: val },
    });

    var newGame = currentGame;

    newGame[x][y] = val;
    setCurrentGame((currentGame) => [...newGame]);
  };

  const printBoard = () => {
    console.log(currentGame);
  };

  return (
    <div>
      {currentGame.map((row, i) => (
        <div key={i} className="row" id={i}>
          {row.map((cell, j) => (
            <div key={j} className="cell" id={j} onClick={updateCell}>
              {cell}
            </div>
          ))}
        </div>
      ))}
      <button className="button-19" onClick={printBoard}>
        print
      </button>
    </div>
  );
}
Board.propTypes = {
  gamestate: propTypes.json,
  moveCallBack: propTypes.func,
};
