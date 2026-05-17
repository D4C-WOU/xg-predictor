import joblib
import pandas as pd


model = joblib.load("../models/optimized_logistic_regression.pkl")
scaler = joblib.load("../models/scaler.pkl")
feature_columns = joblib.load("../models/feature_columns.pkl")


def preprocess_input(df):

    df = pd.get_dummies(
        df,
        columns=[
            "body_part_name",
            "technique_name",
            "play_pattern_name"
        ]
    )

    # rename to match training columns
    df.columns = [
        col.replace("body_part_name_", "shot_body_part_")
           .replace("technique_name_", "shot_technique_")
           .replace("play_pattern_name_", "play_pattern_")
        for col in df.columns
    ]

    return df


def predict_xg(data):

    df = pd.DataFrame([data])

    # preprocess input
    df = preprocess_input(df)

    # add missing columns
    for col in feature_columns:

        if col not in df.columns:
            df[col] = 0

    # reorder columns
    df = df[feature_columns]

    # scale
    df_scaled = scaler.transform(df)

    # predict
    prediction = model.predict_proba(df_scaled)[0][1]

    return float(prediction)
print(feature_columns)