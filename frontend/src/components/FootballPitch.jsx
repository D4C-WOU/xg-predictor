import { useRef } from "react";

function FootballPitch({ shotPosition, setShotPosition }) {

  const pitchRef = useRef(null);

  const handlePitchClick = (e) => {

    const rect = pitchRef.current.getBoundingClientRect();

    const clickX = e.clientX - rect.left;

    const clickY = e.clientY - rect.top;

    setShotPosition({
      x: clickX,
      y: clickY,
      width: rect.width,
      height: rect.height,
    });
  };

  return (

    <div
      ref={pitchRef}
      onClick={handlePitchClick}
      className="
        relative
        w-full
        aspect-[7/4.5]
        bg-green-700
        rounded-xl
        overflow-hidden
        border-4
        border-white
        cursor-crosshair
      "
    >

      {/* OUTER BORDER */}

      <div className="absolute inset-0 border-4 border-white rounded-xl" />



      {/* HALF LINE */}

      <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white -translate-x-1/2" />



      {/* CENTER CIRCLE */}

      <div
        className="
          absolute
          left-1/2
          top-1/2

          w-16
          h-16

          sm:w-24
          sm:h-24

          md:w-28
          md:h-28

          border-[3px]
          border-white
          rounded-full
          -translate-x-1/2
          -translate-y-1/2
        "
      />



      {/* PENALTY AREA */}

      <div
        className="
          absolute
          right-0
          top-1/2

          w-20
          h-32

          sm:w-28
          sm:h-40

          md:w-32
          md:h-48

          border-2
          border-white
          -translate-y-1/2
        "
      />



      {/* PENALTY AREA LABEL */}

      <p
        className="
          absolute

          right-1
          top-[18%]

          text-[8px]

          sm:text-[10px]
          md:text-xs

          font-semibold
          text-white
        "
      >
        Penalty Area
      </p>



      {/* GOAL AREA */}

      <div
        className="
          absolute
          right-0
          top-1/2

          w-10
          h-16

          sm:w-14
          sm:h-24

          md:w-16
          md:h-28

          border-2
          border-white
          -translate-y-1/2
        "
      />



      {/* GOAL AREA LABEL */}

      <p
        className="
          absolute

          right-1
          top-[28%]

          text-[8px]

          sm:text-[10px]
          md:text-xs

          font-semibold
          text-white
        "
      >
        Goal Area
      </p>



      {/* GOAL */}

      <div
        className="
          absolute
          right-0
          top-1/2

          w-[3px]

          h-10
          sm:h-14
          md:h-16

          bg-white
          -translate-y-1/2
        "
      />



      {/* PENALTY SPOT */}

      <div
        className="
          absolute

          right-[52px]
          sm:right-[70px]
          md:right-[82px]

          top-1/2

          w-2
          h-2

          sm:w-2.5
          sm:h-2.5

          md:w-3
          md:h-3

          bg-white
          rounded-full
          -translate-y-1/2
        "
      />



      {/* SHOT MARKER */}

      {shotPosition && (

        <div
          className="
            absolute

            w-3
            h-3

            sm:w-4
            sm:h-4

            md:w-5
            md:h-5

            bg-red-500
            rounded-full
            border-2
            border-white
            shadow-lg
          "
          style={{
            left: shotPosition.x,
            top: shotPosition.y,
            transform: "translate(-50%, -50%)",
          }}
        />

      )}

    </div>
  );
}

export default FootballPitch;