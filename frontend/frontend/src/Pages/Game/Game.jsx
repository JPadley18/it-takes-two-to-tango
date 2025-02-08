import "./Game.css";

import Board from "../../Components/Board/Board";
import gamedata from "./game.json";
import gamedata2 from "./game2.json";
import WSService from "../../../Services/WSService";
import { useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();
  console.log(id);

  const ws = new WSService(id);

  const printBothBoards = () => {
    console.log(gamedata.data.board.symbols);
    console.log(gamedata2.data.board.symbols);
  };

  return (
    <div>
      <h1>Game</h1>
      <div id="games">
        <Board gamestate={gamedata} />
        <Board gamestate={gamedata2} />
      </div>
      <button className="button-19" onClick={printBothBoards}>
        Print Both Games
      </button>
    </div>
  );
}
