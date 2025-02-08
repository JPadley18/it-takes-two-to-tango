import "./Game.css";
import Board from "../../Components/Board/Board";
import gamedata from "./game.json";
import gamedata2 from "./game2.json";

export default function Game() {
  return (
    <div>
      <h1>Game</h1>
      <div id="games">
        <Board gamestate={gamedata} />
        <Board gamestate={gamedata2} />
      </div>
    </div>
  );
}
