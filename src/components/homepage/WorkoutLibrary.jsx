import React from "react";
import WorkoutCard from "@/components/homepage/WorkoutCard";

const getWorkouts = async () => {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const data = await response.json();
  return data;
};

const WorkoutLibrary = async () => {
  const workoutData = await getWorkouts();
  // console.log(workoutData);
  return (
    <section
      id="library"
      className="
        mx-auto
        w-full
        max-w-360
        px-4
        py-10
        sm:px-6
        sm:py-12
        lg:px-8
        lg:py-14
      "
    >
      {/* ================= SECTION HEADER ================= */}
      <div className="mb-6 sm:mb-7">
        <h2
          className="
            font-oswald
            text-3xl
            font-bold
            uppercase
            leading-none
            tracking-tight
            text-white
            sm:text-4xl
          "
        >
          The Library
        </h2>

        <p className="mt-1.5 text-[11px] text-[#777a83] sm:text-xs">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* ================= WORKOUT GRID ================= */}
      <div
        className="
          grid
          grid-cols-1
          gap-4
          sm:grid-cols-2
          lg:grid-cols-3
          lg:gap-5
        "
      >
        {workoutData.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
};

export default WorkoutLibrary;
