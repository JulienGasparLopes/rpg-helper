import json


class Player:
    name: str

    life: float = 120
    max_life: float = 180
    life_per_hour: float = 100

    mana: float = 34
    max_mana: float  = 150
    mana_per_hour: float = 100

    mana_buff_per_hour: float = 0

    def __init__(self, name: str):
        self.name = name

    def update(self, delta_time: float):
        self.life = max(0, min(self.life + self.life_per_hour * delta_time, self.max_life))
        mana_delta = (self.mana_buff_per_hour if self.mana_buff_per_hour != 0 else self.mana_per_hour) * delta_time
        self.mana = max(0, min(self.mana + mana_delta, self.max_mana))


    def to_message(self) -> str:
        return json.dumps({
            "name": self.name,
            "life": self.life,
            "max_life": self.max_life,
            "mana": self.mana,
            "max_mana": self.max_mana,
        })
    