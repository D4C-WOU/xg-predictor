import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const predictXG = async (shotData) => {
  const response = await API.post("/predict-xg", shotData);

  return response.data;
};
