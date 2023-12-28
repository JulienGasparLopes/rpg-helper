import React, { useEffect } from "react";

const Admin = () => {
  let socket: any;

  useEffect(() => {
    socket = new WebSocket("ws://localhost:8765");
    // socket.addEventListener("open", function (event) {});

    socket.addEventListener("message", (event: any) => {});
  }, []);

  return (
    <div className="App" style={{ padding: "24px 20%" }}>
      Admin
      <button
        onClick={() => {
          socket.readyState && socket.send("set|mana_buff_per_hour|Jannnus|-2000");
        }}
      >
        Set Mana debuff
      </button>
      <button
        onClick={() => {
          socket.readyState && socket.send("set|mana_buff_per_hour|Jannnus|0");
        }}
      >
        Reset Mana debuff
      </button>
    </div>
  );
};

export default Admin;
