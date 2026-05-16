from pydantic import BaseModel


class ShotFeatures(BaseModel):

    minute: int = 55
    period: int = 2

    x: float = 112
    y: float = 40

    shot_distance: float = 7.5
    angle: float = 0.9
    centrality: float = 0.5

    body_part_name: str = "Right Foot"
    technique_name: str = "Normal"
    play_pattern_name: str = "Regular Play"

    under_pressure: bool = False
    shot_first_time: bool = False
    shot_one_on_one: bool = False
    shot_open_goal: bool = False
    shot_deflected: bool = False