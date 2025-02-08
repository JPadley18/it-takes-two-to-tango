import "./Game.css";
import Board from "../../Components/Board/Board";
import gamedata from "./game.json";
import gamedata2 from "./game2.json";
import WSService from "../../../Services/WSService";

export default function Game() {
  const printBothBoards = () => {
    console.log(gamedata.data.board.symbols);
    console.log(gamedata2.data.board.symbols);
  };

  //WebSocket
  WSService.ws.onopen = (arg) => {
    console.log("Connection opened");
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
