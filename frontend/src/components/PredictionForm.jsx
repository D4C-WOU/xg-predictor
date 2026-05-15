import { useState, useEffect } from "react";

import { predictXG } from "../services/api";


function PredictionForm({
  setXg,
  shotPosition,
}) {

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({

    minute: 55,
    period: 2,

    // These will now be AUTO-CALCULATED
    x: 112,
    y: 40,

    shot_distance: 7.5,
    angle: 0.9,
    centrality: 0.5,

    body_part_name: "Right Foot",
    technique_name: "Normal",
    play_pattern_name: "Regular Play",

    under_pressure: false,
    shot_first_time: false,
    shot_one_on_one: false,
    shot_open_goal: false,
    shot_deflected: false,
    is_penalty: false
  });


  // =========================
  // AUTO UPDATE DATA
  // WHEN USER CLICKS PITCH
  // =========================

  useEffect(() => {

    if (!shotPosition) return;

    // Convert screen coords → StatsBomb coords

    const statsbombX =
      (shotPosition.x / shotPosition.width) * 120;

    const statsbombY =
      (shotPosition.y / shotPosition.height) * 80;

    // Goal center coordinates

    const goalX = 120;
    const goalY = 40;


    // Distance calculation

    const dx = goalX - statsbombX;
    const dy = goalY - statsbombY;

    let shotDistance =
      Math.sqrt(dx * dx + dy * dy);

    // Prevent impossible near-zero visual mismatch

    if (shotDistance < 4) {
      shotDistance = 4;
    }
    // Angle calculation

    const angle = Math.abs(
      Math.atan2(
        7.32 * dx,
        (
          dx * dx +
          dy * dy -
          (7.32 / 2) ** 2
        )
      )
    );
    // Prevent Impossible Angle Spikes
    if (angle > 1.5) {
      angle = 1.5;
    }

    // Centrality

    const centrality =
      Math.abs(goalY - statsbombY);


    // Update form data

    setFormData((prev) => ({

      ...prev,

      x: Number(statsbombX.toFixed(1)),
      y: Number(statsbombY.toFixed(1)),

      shot_distance:
        Number(shotDistance.toFixed(2)),

      angle:
        Number(angle.toFixed(2)),

      centrality:
        Number(centrality.toFixed(2)),
    }));

  }, [shotPosition]);


  // =========================
  // HANDLE INPUT CHANGES
  // =========================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData({

      ...formData,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };


  // =========================
  // SUBMIT PREDICTION
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!shotPosition) {

      alert("Please click on the pitch first");

      return;
    }

    try {

      if (formData.is_penalty) {
        setXg(0.76)
        return
      }
      const data =
        await predictXG(formData);

      setXg(data.predicted_xg);

    } catch (error) {

      console.error(error);

      alert("Prediction failed");
    }
  };

  const availableTechniques =
    formData.body_part_name === "Head"
      ? ["Normal"]
      : ["Normal", "Volley", "Half Volley", "Backheel"];


  // =========================
  // UI
  // =========================

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-slate-800 p-6 rounded-xl shadow-lg w-full"
    >

      <h2 className="text-2xl font-bold mb-6">
        Shot Input
      </h2>


      {/* ========================= */}
      {/* LIVE SHOT DATA PANEL */}
      {/* ========================= */}

      <div className="bg-slate-700 p-4 rounded-xl mb-6 space-y-2 text-sm" >

        <p>
          <span className="font-bold">
            X Coordinate:
          </span>
          {" "}
          {formData.x}
        </p>

        <p>
          <span className="font-bold">
            Y Coordinate:
          </span>
          {" "}
          {formData.y}
        </p>

        <p>
          <span className="font-bold">
            Shot Distance:
          </span>
          {" "}
          {formData.shot_distance} m
        </p>

        <p>
          <span className="font-bold">
            Shot Angle:
          </span>
          {" "}
          {formData.angle}
        </p>

        <p>
          <span className="font-bold">
            Centrality:
          </span>
          {" "}
          {formData.centrality}
        </p>

      </div>


      <div className="space-y-5">


        {/* ========================= */}
        {/* BODY PART */}
        {/* ========================= */}

        <div>

          <label className="block mb-2 font-semibold">
            Body Part
          </label>

          <select
            name="body_part_name"
            value={formData.body_part_name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          >

            <option>Right Foot</option>
            <option>Left Foot</option>
            <option>Head</option>

          </select>

        </div>


        {/* ========================= */}
        {/* SHOT TECHNIQUE */}
        {/* ========================= */}

        <div>

          <label className="block mb-2 font-semibold">
            Shot Technique
          </label>

          <select
            name="technique_name"
            value={formData.technique_name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          >

            {
              availableTechniques.map((technique) => (

                <option key={technique}>
                  {technique}
                </option>

              ))
            }

          </select>

        </div>


        {/* ========================= */}
        {/* PLAY PATTERN */}
        {/* ========================= */}

        <div>

          <label className="block mb-2 font-semibold">
            Play Pattern
          </label>

          <select
            name="play_pattern_name"
            value={formData.play_pattern_name}
            onChange={handleChange}
            className="w-full p-3 rounded bg-slate-700"
          >

            <option>Regular Play</option>
            <option>From Corner</option>
            <option>Counter Attack</option>
            <option>Free Kick</option>

          </select>

        </div>


        {/* ========================= */}
        {/* CHECKBOX FEATURES */}
        {/* ========================= */}

        <div className="grid grid-cols-2 gap-4 text-sm">

          <label>

            <input
              type="checkbox"
              name="under_pressure"
              checked={formData.under_pressure}
              onChange={handleChange}
              className="mr-2"
            />

            Under Pressure

          </label>
          <label>

            <input
              type="checkbox"
              name="is_penalty"
              checked={formData.is_penalty}
              onChange={handleChange}
              className="mr-2"
            />

            Penalty

          </label>

          <label>

            <input
              type="checkbox"
              name="shot_first_time"
              checked={formData.shot_first_time}
              onChange={handleChange}
              className="mr-2"
            />

            First Time Shot
            <span className="text-xs text-slate-400 block">
              Shot taken without controlling the ball first
            </span>


          </label>


          <label>

            <input
              type="checkbox"
              name="shot_one_on_one"
              checked={formData.shot_one_on_one}
              onChange={handleChange}
              className="mr-2"
            />

            One on One

          </label>


          <label>

            <input
              type="checkbox"
              name="shot_open_goal"
              checked={formData.shot_open_goal}
              onChange={handleChange}
              className="mr-2"
            />

            Open Goal

          </label>


          <label>

            <input
              type="checkbox"
              name="shot_deflected"
              checked={formData.shot_deflected}
              onChange={handleChange}
              className="mr-2"
            />

            Deflected Shot

          </label>

        </div>


        {/* ========================= */}
        {/* SUBMIT BUTTON */}
        {/* ========================= */}

        <button
          type="submit"
          className="w-full bg-green-500 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition"
        >

          Predict xG

        </button>

      </div>

    </form >
  );
}


export default PredictionForm;