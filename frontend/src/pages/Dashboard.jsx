import { useState } from "react";

import Navbar from "../components/Navbar";
import FootballPitch from "../components/FootballPitch";
import PredictionForm from "../components/PredictionForm";
import XGCard from "../components/XGCard";
import ShotAnalysisCard from "../components/ShotAnalysisCard";

function Dashboard() {

  const [xg, setXg] = useState(null);

  const [shotPosition, setShotPosition] =
    useState(null);


  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Page Heading */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold mb-2">
            xG Shot Predictor
          </h1>

          <p className="text-slate-400">
            Click anywhere on the pitch
            to simulate a shot and
            predict expected goals (xG).
          </p>

        </div>


        {/* Main Layout */}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start">


          {/* LEFT SIDE */}

          <div className="space-y-4">

            <div className="bg-slate-900 p-5 rounded-2xl shadow-xl">

              <h2 className="text-2xl font-semibold mb-4">
                Shot Location
              </h2>

              <FootballPitch
                shotPosition={shotPosition}
                setShotPosition={setShotPosition}
              />

            </div>


            {/* Instructions */}

            <div className="bg-slate-900 p-5 rounded-2xl">

              <h3 className="text-lg font-semibold mb-3">
                How to Use
              </h3>

              <ul className="space-y-2 text-slate-300 text-sm">

                <li>
                  • Click on the football pitch
                  to place a shot
                </li>

                <li>
                  • Select shot details
                  like body part and technique
                </li>

                <li>
                  • Press Predict xG
                  to calculate scoring probability
                </li>

              </ul>

            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="space-y-6">

            <PredictionForm
              setXg={setXg}
              shotPosition={shotPosition}
            />

            <XGCard xg={xg} />
            <ShotAnalysisCard xg={xg} />

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;