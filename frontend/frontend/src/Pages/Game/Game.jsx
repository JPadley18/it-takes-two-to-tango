import "./Game.css";
import Board from "../../Components/Board/Board";
import gamedata from "./game.json";

export default function Game() {
  return (
    <div>
      <h1>Game</h1>
      <Board gamestate={gamedata} />
    </div>
  );
}
