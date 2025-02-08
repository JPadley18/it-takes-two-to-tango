import "./Board.css";
import { useState, useEffect } from "react";
import propTypes from "prop-types";

export default function Board(props) {
  const [currentGame, setCurrentGame] = useState([]);

  useEffect(() => {
    if (props.gamestate != undefined) {
      console.log(props.gamestate.spaces);
      setCurrentGame(props.gamestate.spaces);
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

    var newGame = currentGame;

    newGame[x][y] = val;
    setCurrentGame((currentGame) => [...newGame]);
  };

  const printBoard = () => {
    console.log(currentGame);
    console.log(modifierList);
    // getModifier(modifierList,0,0)
  };

  return (
    <div>
      {currentGame.map((row, i) => (
        <div key={i} className="row" id={i}>
          {row.map((cell, j) => (
            <div key={j} className="cell" id={j} onClick={updateCell}>
              {cell}
              <Modifier position={[modifierList,i,j]} same={true}/>
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

function getModifier(modifierList,i, j) {
  // Iterate over each object in the array
  for (let item of modifierList) {
      // Check if the given i and j match x1-1 and y1-1
      if (i === item.x1 - 1 && j === item.y1 - 1) {
          if(i < item.x2-1){
            return ['right', item.type];
          }else if(i > item.x2-1){
            return ['left', item.type];
          }else if(j < item.y2-1){
            return ['bottom', item.type];
          }else{
            return ['top', item.type];
          }
      }
  }
  return null;  // Return false if no matching pair is found
}

export function Modifier(props){
  const side = getModifier(props.position[0], props.position[1], props.position[2]);
  
  console.log(side);
  if(side == null){
    return;
  }else{
    if(side[1] == 'same'){
      // use =
      return <a className={"modifier-symbol-"+side[0]}>{'='}</a>
    }else{
      return <a className={"modifier-symbol-"+side[0]} >{'✖'}</a>
    }
    
  }
  
}