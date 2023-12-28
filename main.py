import asyncio
import json
import threading
from time import sleep
import time
from websockets.server import serve
import pickle

DEBUG = True

class Player:
    name: str

    life: float = 180
    max_life: float = 180
    life_per_hour: float = 100

    mana: float = 130
    max_mana: float  = 150
    mana_per_hour: float = 100

    mana_buff_per_hour: float = 0

    def __init__(self, name: str):
        self.name = name

    def to_message(self) -> str:
        return json.dumps({
            "name": self.name,
            "life": self.life,
            "max_life": self.max_life,
            "mana": self.mana,
            "max_mana": self.max_mana,
        })
    

class Server:
    players: list[Player] = []

    def __init__(self):
        self.load_players()

    def load_players(self):
        try: 
            with open("players.json", "rb") as player_file:
                self.players = pickle.load(player_file)
        except:
            self.players = [Player("Grusfrut"), Player("Jannnus")]


    def save_players(self):
        with open("players.json", "wb") as player_file:
            pickle.dump(self.players, player_file)

    def update_player(self):
        print("Update players thread started")
        last_update_ms = time.time() * 1000
        while True:
            for player in self.players:
                delta_ms = time.time() * 1000 - last_update_ms
                delta_multiplier = delta_ms / (1000 * 3600) * (60 if DEBUG else 1)
                player.life = max(0, min(player.life + player.life_per_hour * delta_multiplier, player.max_life))
                mana_delta = (player.mana_buff_per_hour if player.mana_buff_per_hour != 0 else player.mana_per_hour) * delta_multiplier
                player.mana = max(0, min(player.mana + mana_delta, player.max_mana))
            last_update_ms = time.time() * 1000
            sleep(0.1)

    def start(self):
        async def echo(websocket):
            async for message in websocket:
                if message == "ask players":
                    await websocket.send(json.dumps([p.to_message() for p in self.players]))
                elif message.startswith("set|"):
                    _, attribut, player_name, mana = message.split("|")
                    for player in self.players:
                        if player.name == player_name:
                            setattr(player, attribut, float(mana))
                            break

        async def main_ws():
            async with serve(echo, "localhost", 8765):
                await asyncio.Future()

        update_thread = threading.Thread(target=self.update_player)
        update_thread.start()

        print("Server running on port 8765")
        asyncio.run(main_ws())


def main():
    server = Server()
    server.start()

if __name__ == "__main__":
    main()