"use client";

import { useEffect, useState } from "react";
import WorkoutCard from "@/components/homepage/WorkoutCard";
import { getWorkouts } from "@/app/lib/api";
import type { IWorkout } from "@/types/workout";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadWorkouts = async () => {
      try {
        const data = await getWorkouts();

        if (!cancelled) {
          setWorkouts(data);
          setError(null);
        }
      } catch (error) {
        console.error("Failed to load workouts:", error);

        if (!cancelled) {
          setError(
            error instanceof Error ? error.message : "Failed to load workouts.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWorkouts();

    return () => {
      cancelled = true;
    };
  }, []);

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
      {/* Section Header */}
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

      {/* Loading */}
      {loading && (
        <div className="flex min-h-72 items-center justify-center">
          <div className="text-center">
            <span className="loading loading-spinner loading-md text-[#ccff00]" />

            <p className="mt-4 text-sm text-[#777a83]">Loading workouts…</p>
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-900/40 bg-[#15171c] px-6 py-10 text-center">
          <h3 className="font-oswald text-xl font-bold uppercase text-white">
            Unable to load workouts
          </h3>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-[#858994]">
            {error}
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="
              mt-6
              rounded-full
              bg-[#ccff00]
              px-5
              py-2.5
              text-xs
              font-bold
              uppercase
              text-black
              transition
              hover:bg-[#d7ff43]
            "
          >
            Try Again
          </button>
        </div>
      )}

      {/* Workout Grid */}
      {!loading && !error && (
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
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;
