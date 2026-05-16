import { useRef } from "react";

function FootballPitch({
  shotPosition,
  setShotPosition,
}) {

  const pitchRef = useRef(null);

  const handlePitchClick = (e) => {

    const rect =
      pitchRef.current.getBoundingClientRect();

    // Mouse position inside pitch
    const clickX =
      e.clientX - rect.left;

    const clickY =
      e.clientY - rect.top;

    // Save click position
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

      {/* Pitch Lines */}

      {/* Outer Border */}
      <div className="absolute inset-0 border-4 border-white rounded-xl" />

      {/* Halfway Line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white -translate-x-1/2" />

      {/* Center Circle */}
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

      {/* Penalty Box */}
      <div
        className="
    absolute
    right-0
    top-1/2
    w-28
    h-44
    border-2
    border-white
    -translate-y-1/2
  "
      />

      {/* 6 Yard Box */}
      <div
        className="
    absolute
    right-0
    top-1/2
    w-14
    h-24
    border-2
    border-white
    -translate-y-1/2
  "
      />

      {/* Goal */}
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

      {/* Penalty Spot */}
      <div
        className="
    absolute
    right-[72px]
    top-1/2
    w-2.5
    h-2.5
    bg-white
    rounded-full
    -translate-y-1/2
  "
      />
      {/* Shot Marker */}
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