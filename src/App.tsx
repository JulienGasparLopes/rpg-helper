import React, { useEffect } from "react";
import "./App.css";
import { Gauge } from "./gauge";

type Player = {
  name: string;
  life: number;
  maxLife: number;
  mana: number;
  maxMana: number;
};

const DEFAULT_PLAYERS: Player[] = [
  { name: "Player 1", life: 10, maxLife: 100, mana: 30, maxMana: 100 },
  { name: "Player 2", life: 50, maxLife: 100, mana: 50, maxMana: 100 },
  { name: "Player 3", life: 36, maxLife: 100, mana: 0, maxMana: 100 },
  { name: "Player 4", life: 22, maxLife: 100, mana: 43, maxMana: 100 },
];

const updatePlayerValue = (player: Player): Player => {
  const life = Math.min(player.life + 0.02, player.maxLife);
  const mana = Math.min(player.mana + 0.05, player.maxMana);
  return { ...player, life, mana };
};

function App() {
  const [players, updatePlayers] = React.useState(DEFAULT_PLAYERS);

  useEffect(() => {
    const newPlayers = localStorage.getItem("players");
    if (newPlayers) updatePlayers(JSON.parse(newPlayers));
    console.log(newPlayers);

    const interval = setInterval(() => {
      updatePlayers((prevuePlayers) => {
        const playersToSave = prevuePlayers.map(updatePlayerValue);
        localStorage.setItem("players", JSON.stringify(playersToSave));
        return playersToSave;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App" style={{ padding: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        {players.map((player: Player) => (
          <div style={{ gap: 8, display: "flex", flexDirection: "column" }}>
            <div>{player.name}</div>
            <Gauge maxValue={player.maxLife} value={player.life} color="red" />
            <Gauge maxValue={player.maxMana} value={player.mana} color="blue" />
          </div>
        ))}
      </div>
      <button onClick={() => updatePlayers(DEFAULT_PLAYERS)}>Reset</button>
    </div>
  );
}

export default App;
