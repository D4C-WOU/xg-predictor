from fastapi import FastAPI

from routes.predict import router as predict_router


app = FastAPI(
    title="World Cup xG Predictor"
)


@app.get("/")
def home():

    return {
        "message": "xG Predictor API Running"
    }


app.include_router(predict_router)