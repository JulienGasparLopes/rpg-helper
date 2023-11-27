import React, { useEffect } from "react";
import "./App.css";
import { Gauge } from "./gauge";

function App() {
  const [life, setLife] = React.useState(50);
  const [mana, setMana] = React.useState(25);

  useEffect(() => {
    const interval = setInterval(() => {
      setLife((prevueLife) => prevueLife + 2);
      setMana((prevueMana) => prevueMana + 5);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Gauge maxValue={100} value={life} color="red" />
      <Gauge maxValue={100} value={mana} color="blue" />
    </div>
  );
}

export default App;
