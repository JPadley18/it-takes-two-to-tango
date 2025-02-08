import "./Board.css";
import { useState, useEffect } from "react";
import propTypes from "prop-types";

export default function Board(props) {
  //console.log(props.gamestate);
  const [currentGame, setCurrentGame] = useState([]);
  useEffect(() => {
    setCurrentGame(props.gamestate.data.board.symbols);
  }, [props.gamestate]);

  const updateCell = (e) => {
    console.log(e.target);
    console.log(e.target.innerText);
    console.log(e.target.className);
    console.log(e.target.parentNode.className);
    var val = parseInt(e.target.innerText);

    val += 1;
    if (val > 2) {
      val = 0;
    }
    var x = parseInt(e.target.parentNode.id);
    var y = parseInt(e.target.id);

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
};
