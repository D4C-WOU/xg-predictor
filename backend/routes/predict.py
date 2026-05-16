from fastapi import APIRouter

from schemas.shot import ShotFeatures

from model.predictor import predict_xg


router = APIRouter()


@router.post("/predict-xg")
def predict_shot_xg(shot: ShotFeatures):

    prediction = predict_xg(shot.dict())

    return {
        "predicted_xg": round(prediction, 4)
    }