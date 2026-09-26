"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Star } from "lucide-react";

import type { IWorkout } from "@/types/workout";
import { getWorkout } from "@/app/lib/api";
import WorkoutActions from "@/components/workouts/WorkoutActions";

interface WorkoutDetailsClientProps {
  id: string;
}

const WorkoutDetailsClient = ({ id }: WorkoutDetailsClientProps) => {
  const [workout, setWorkout] = useState<IWorkout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadWorkout = async () => {
      try {
        const data = await getWorkout(id);

        if (!cancelled) {
          setWorkout(data);
        }
      } catch (error) {
        console.error("Failed to load workout:", error);

        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadWorkout();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0b0c0f] text-white">
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-[#ccff00]" />
            <p className="mt-4 text-sm text-[#777a83]">Loading workout…</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !workout) {
    return (
      <main className="min-h-screen bg-[#0b0c0f] px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-[#999da8]
              transition
              hover:text-[#ccff00]
            "
          >
            <ArrowLeft size={16} />
            Back to workouts
          </Link>

          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <h1 className="font-oswald text-4xl font-bold uppercase">
                Workout Not Found
              </h1>

              <p className="mt-3 text-sm text-[#777a83]">
                The workout you are looking for does not exist.
              </p>

              <Link
                href="/"
                className="
                  mt-6
                  inline-flex
                  rounded-md
                  bg-[#ccff00]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-black
                  transition
                  hover:bg-[#b8e600]
                "
              >
                Back to Workouts
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0c0f] text-white">
      <section
        className="
          mx-auto
          w-full
          max-w-352
          px-4
          py-8
          sm:px-6
          sm:py-10
          lg:px-8
          lg:py-12
        "
      >
        <Link
          href="/"
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-xs
            font-medium
            text-[#777a83]
            transition-colors
            hover:text-[#ccff00]
            sm:mb-8
          "
        >
          <ArrowLeft size={15} />
          Back to workouts
        </Link>

        <div
          className="
            grid
            grid-cols-1
            gap-8
            lg:grid-cols-[1fr_0.95fr]
            lg:items-start
            lg:gap-12
            xl:gap-14
          "
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-xl border border-[#24272e] bg-[#15171c]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="
                  (max-width: 1023px) 100vw,
                  50vw
                "
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1
              className="
                font-oswald
                text-4xl
                font-bold
                uppercase
                leading-[0.95]
                tracking-tight
                text-white
                sm:text-5xl
                lg:text-[44px]
                xl:text-5xl
              "
            >
              {workout.name}
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#999da8] sm:text-[15px]">
              {workout.description}
            </p>

            {/* Tags */}
            <div className="mt-5 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscle) => (
                <span
                  key={muscle}
                  className="
                    rounded-full
                    bg-[#ccff00]
                    px-4
                    py-1.5
                    text-[10px]
                    font-extrabold
                    uppercase
                    tracking-wide
                    text-black
                  "
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specs */}
            <div className="mt-7 overflow-hidden rounded-xl border border-[#292d36] bg-[#15171c]">
              <div className="divide-y divide-[#24272e]">
                <SpecRow label="Equipment" value={workout.equipment} />
                <SpecRow label="Difficulty" value={workout.difficulty} />
                <SpecRow label="Sets" value={String(workout.sets)} />
                <SpecRow label="Reps" value={workout.reps} />
                <SpecRow label="Duration" value={`${workout.duration} min`} />
                <SpecRow
                  label="Calories"
                  value={`${workout.caloriesBurned} kcal`}
                />

                <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-[#999da8]">
                    Rating
                  </span>

                  <span className="flex items-center gap-1.5 text-sm text-[#e4e5e8]">
                    <Star
                      size={14}
                      className="text-[#ccff00]"
                      fill="currentColor"
                    />
                    {workout.rating}
                  </span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2
                className="
                  font-oswald
                  text-lg
                  font-bold
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                Instructions
              </h2>

              <ol className="mt-4 space-y-4">
                {workout.instructions.map((instruction, index) => (
                  <li
                    key={`${instruction}-${index}`}
                    className="flex gap-3 text-sm leading-6 text-[#c3c5cb]"
                  >
                    <span className="shrink-0 text-[#777a83]">
                      {index + 1}.
                    </span>

                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Actions */}
            <WorkoutActions workoutId={workout.id} />
          </div>
        </div>
      </section>
    </main>
  );
};

interface SpecRowProps {
  label: string;
  value: string;
}

const SpecRow = ({ label, value }: SpecRowProps) => {
  return (
    <div className="flex items-center justify-between gap-6 px-5 py-4 sm:px-6">
      <span className="text-[10px] font-bold uppercase tracking-wide text-[#999da8]">
        {label}
      </span>

      <span className="text-right text-sm text-[#e4e5e8]">{value}</span>
    </div>
  );
};

export default WorkoutDetailsClient;
