import "./App.css";
import { motion } from "motion/react";

function App() {
  return (
    <>
      <div>
        <motion.h1 animate={{ rotate: 360 }}>It Takes Two to Tango!</motion.h1>
      </div>
      <div id="buttons">
        <input className="name-box" placeholder="Choose a name..." type="text"></input>
        <a href="/lobby">
          <motion.button whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.8 }}
          className="button-19" id="play">
            Play
          </motion.button>
        </a>
      </div>
    </>
  );
}

export default App;
