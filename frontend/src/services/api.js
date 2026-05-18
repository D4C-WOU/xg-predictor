import axios from "axios";

const API = axios.create({
  baseURL: "https://xg-predictor.onrender.com/",
});

export const predictXG = async (shotData) => {
  const response = await API.post("/predict-xg", shotData);

  return response.data;
};
