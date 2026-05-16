import joblib
import pandas as pd


model = joblib.load(
    "../models/xg_logistic_model.pkl"
)


def predict_xg(data):

    df = pd.DataFrame([data])

    prediction = model.predict_proba(df)[0][1]

    return prediction