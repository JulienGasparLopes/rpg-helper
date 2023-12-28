import React, { useEffect } from "react";
import { Gauge } from "./gauge";

type Player = {
  name: string;

  life: number;
  max_life: number;
  life_per_hour: number;

  mana: number;
  max_mana: number;
  mana_per_hour: number;
};

const App = () => {
  const [players, updatePlayers] = React.useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8765");
    // socket.addEventListener("open", function (event) {});

    socket.addEventListener("message", function (event) {
      const playersInfo = JSON.parse(event.data);
      updatePlayers(playersInfo.map((info: string) => JSON.parse(info)));
    });

    const interval = setInterval(() => {
      socket.readyState && socket.send("ask players");
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={{ padding: "24px 20%" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
        {players.map((player: Player) => (
          <div key={player.name} style={{ gap: 8, display: "flex", flexDirection: "column" }}>
            <div style={{ textAlign: "center" }}>{player.name}</div>
            <Gauge maxValue={player.max_life} value={player.life} color="red" />
            <Gauge maxValue={player.max_mana} value={player.mana} color="blue" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
