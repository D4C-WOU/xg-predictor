from pydantic import BaseModel


class ShotFeatures(BaseModel):

    minute: int 
    period: int 

    x: float 
    y: float 

    end_x: float
    end_y: float

    shot_distance: float
    shot_angle: float 
    distance_from_center: float

    body_part_name: str 
    technique_name: str 
    play_pattern_name: str 

    under_pressure: bool 
    shot_first_time: bool 
    shot_one_on_one: bool 
    shot_open_goal: bool 
    shot_deflected: bool 