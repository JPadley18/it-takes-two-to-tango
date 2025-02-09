import "./WaitingForGame.css";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import propTypes from "prop-types";

export default function WaitingForGame(props) {
  const [players, setPlayers] = useState([]);
  useEffect(() => {
    setPlayers(props.players);
  }, [props.players]);
  return (
    <div>
      <h1>Waiting for game to start ({props.players.length}/2 players)</h1>
      {props.players.map((player, i) => (
        <motion.h3
        className="player-name"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        key={i}>{player.name}</motion.h3>
      ))}
    </div>
  );
}
WaitingForGame.propTypes = {
  players: propTypes.array,
};
