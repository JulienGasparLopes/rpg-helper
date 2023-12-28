import asyncio
import json
import threading
from time import sleep
import time
from websockets.server import serve
import pickle

from player import Player

DEBUG = True

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
            delta_ms = time.time() * 1000 - last_update_ms
            delta_multiplier = delta_ms / (1000 * 3600) * (60 if DEBUG else 1)
            for player in self.players:
                player.update(delta_multiplier)
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
                        if player_name == "all" or player.name == player_name:
                            setattr(player, attribut, float(mana))

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