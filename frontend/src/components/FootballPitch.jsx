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

      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white -translate-x-1/2" />

      {/* CENTER CIRCLE */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          w-28
          h-28
          border-4
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
          w-32
          h-48
          border-2
          border-white
          -translate-y-1/2
        "
      />

      {/* LABEL */}

      <p
        className="
  absolute
  right-10
  top-[calc(50%-115px)]
  text-xs
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
          w-16
          h-28
          border-2
          border-white
          -translate-y-1/2
        "
      />

      {/* LABEL */}

      <p className="
  absolute
  right-2
  top-[calc(50%-70px)]
  text-xs
  font-semibold
  text-white
">
        Goal Area
      </p>
      {/* GOAL */}

      <div
        className="
          absolute
          right-0
          top-1/2
          w-2
          h-16
          bg-white
          -translate-y-1/2
        "
      />

      {/* PENALTY SPOT */}

      <div
        className="
          absolute
          right-[82px]
          top-1/2
          w-3
          h-3
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
            w-5
            h-5
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
