import "./App.css";
import { motion } from "motion/react";

function skibidiah() {
  localStorage.username = document.getElementById("name-box").value;
  window.location.href="/lobby";
}

function App() {
  return (
    <>
      <div>
        <motion.h1 animate={{ rotate: 360 }}>It Takes Two to Tango!</motion.h1>
      </div>
      <div id="buttons">
        <input id="name-box" className="name-box" placeholder="Choose a name..." type="text"></input>
        <div onClick={skibidiah}>
          <motion.button whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.8 }}
          className="button-19" id="play">
            Play
          </motion.button>
        </div>
      </div>
    </>
  );
}

export default App;
