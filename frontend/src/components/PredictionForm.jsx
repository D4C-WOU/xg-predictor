import { useState, useEffect } from "react";
import { predictXG } from "../services/api";

function PredictionForm({
  setXg,
  shotPosition,
}) {

  // =========================
  // LOADING STATE
  // =========================

  const [loading, setLoading] = useState(false);

  // =========================
  // FORM STATE
  // =========================

  const [formData, setFormData] = useState({

    minute: 55,
    period: 2,

    x: 112,
    y: 40,

    // REQUIRED BY MODEL
    end_x: 120,
    end_y: 40,

    shot_distance: 7.5,
    shot_angle: 0.9,
    distance_from_center: 0.5,

    body_part_name: "Right Foot",
    technique_name: "Normal",
    play_pattern_name: "Regular Play",

    under_pressure: false,
    shot_first_time: false,
    shot_one_on_one: false,
    shot_open_goal: false,
    shot_deflected: false,

    is_penalty: false,
    is_header: false,
  });

  // =========================
  // AUTO UPDATE DATA
  // WHEN USER CLICKS PITCH
  // =========================

  useEffect(() => {

    if (!shotPosition) return;

    const statsbombX =
      (shotPosition.x / shotPosition.width) * 120;

    const statsbombY =
      (shotPosition.y / shotPosition.height) * 80;

    const goalX = 120;
    const goalY = 40;

    const dx = goalX - statsbombX;
    const dy = goalY - statsbombY;

    let shotDistance =
      Math.sqrt(dx * dx + dy * dy);

    if (shotDistance < 4) {
      shotDistance = 4;
    }

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

    const centrality =
      Math.abs(goalY - statsbombY);

    setFormData((prev) => ({

      ...prev,

      x: Number(statsbombX.toFixed(1)),
      y: Number(statsbombY.toFixed(1)),

      // MODEL REQUIRES THESE
      end_x: 120,
      end_y: 40,

      shot_distance:
        Number(shotDistance.toFixed(2)),

      shot_angle:
        Number(angle.toFixed(2)),

      distance_from_center:
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

    // =========================
    // HEADER MODE LOGIC
    // =========================

    if (name === "is_header") {

      if (checked) {

        setFormData({
          ...formData,

          is_header: true,

          // HEADERS USE OTHER
          body_part_name: "Other",

          // AUTO FORCE DIVING HEADER
          technique_name: "Diving Header",
        });

      } else {

        setFormData({
          ...formData,

          is_header: false,

          body_part_name: "Right Foot",
          technique_name: "Normal",
        });
      }

      return;
    }


    // =========================
    // PENALTY MODE LOGIC
    // =========================

    if (name === "is_penalty") {

      if (checked) {

        setFormData({

          ...formData,

          is_penalty: true,

          // Disable all special situations
          under_pressure: false,
          shot_first_time: false,
          shot_one_on_one: false,
          shot_open_goal: false,
          shot_deflected: false,
          is_header: false,

          // Force standard penalty setup
          body_part_name: "Right Foot",
          technique_name: "Normal",
          play_pattern_name: "Regular Play",
        });

      } else {

        setFormData({

          ...formData,

          is_penalty: false,
        });
      }

      return;
    }

    // Prevent user from changing
    // technique/body part during header mode

    if (
      formData.is_header &&
      (
        name === "body_part_name" ||
        name === "technique_name"
      )
    ) {

      alert(
        "Disable Header mode to change body part or technique."
      );

      return;
    }

    // Prevent changing advanced options
    // during penalty mode

    if (
      formData.is_penalty &&
      (
        name === "under_pressure" ||
        name === "shot_first_time" ||
        name === "shot_one_on_one" ||
        name === "shot_open_goal" ||
        name === "shot_deflected" ||
        name === "is_header" ||
        name === "technique_name"
      )
    ) {

      alert(
        "Penalty mode disables other shot modifiers."
      );

      return;
    }

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

      setLoading(true);

      // PENALTY SHORTCUT

      if (formData.is_penalty) {

        setXg(0.76);
        return;
      }

      const data =
        await predictXG(formData);

      setXg(data.predicted_xg);

    } catch (error) {

      console.error(error);
      alert("Prediction failed");

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // AVAILABLE TECHNIQUES
  // =========================

  const availableTechniques = [
    "Normal",
    "Volley",
    "Half Volley",
    "Lob",
    "Overhead Kick",
    "Diving Header"
  ];

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
      {/* LIVE SHOT DATA */}
      {/* ========================= */}

      <div className="bg-slate-700 p-4 rounded-xl mb-6 space-y-2 text-sm">

        <p>
          <span className="font-bold">
            X Coordinate:
          </span>{" "}
          {formData.x}
        </p>

        <p>
          <span className="font-bold">
            Y Coordinate:
          </span>{" "}
          {formData.y}
        </p>

        <p>
          <span className="font-bold">
            Shot Distance:
          </span>{" "}
          {formData.shot_distance} m
        </p>

        <p>
          <span className="font-bold">
            Shot Angle:
          </span>{" "}
          {formData.shot_angle}
        </p>

        <p>
          <span className="font-bold">
            Distance From Center:
          </span>{" "}
          {formData.distance_from_center}
        </p>

      </div>

      <div className="space-y-5">

        {/* BODY PART */}

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
            {
              !formData.is_penalty &&
              <option>Other</option>
            }

          </select>

          <p className="text-xs text-slate-400 mt-2">
            "Other" includes headers, chest,
            knee, shoulder and uncommon finishes.
          </p>

        </div>

        {/* TECHNIQUE */}

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

          <div className="text-xs text-slate-400 mt-2 space-y-1">

            <p>
              <span className="font-bold">
                Lob:
              </span>{" "}
              Shot lifted over the goalkeeper.
            </p>

            <p>
              <span className="font-bold">
                Overhead Kick:
              </span>{" "}
              Bicycle/scissor kick attempt.
            </p>

            <p>
              <span className="font-bold">
                Half Volley:
              </span>{" "}
              Shot struck immediately after bounce.
            </p>

          </div>

        </div>

        {/* PLAY PATTERN */}

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
            <option>From Counter</option>
            <option>From Free Kick</option>
            <option>From Goal Kick</option>
            <option>From Keeper</option>
            <option>From Kick Off</option>
            <option>From Throw In</option>
            <option>Other</option>

          </select>

          <p className="text-xs text-slate-400 mt-2">
            "Other" includes unusual attacking
            sequences not covered above.
          </p>

        </div>

        {/* CHECKBOX FEATURES */}

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

          <label>
            <input
              type="checkbox"
              name="is_header"
              checked={formData.is_header}
              onChange={handleChange}
              className="mr-2"
            />
            Header
          </label>

        </div>

        {/* SUBMIT BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-green-500
            py-4
            rounded-xl
            font-bold
            text-lg
            hover:bg-green-600
            transition
            disabled:bg-slate-600
            disabled:cursor-not-allowed
          "
        >

          {loading
            ? "Calculating xG..."
            : "Predict xG"}

        </button>

      </div>

    </form>
  );
}

export default PredictionForm;