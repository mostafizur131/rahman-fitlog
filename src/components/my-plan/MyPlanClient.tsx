"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Clock3, Flame, Star, X } from "lucide-react";

import type { IWorkout } from "@/types/workout";
import { useFitLog } from "@/components/providers/FitLogProvider";
import { getWorkouts } from "@/app/lib/api";

type Tab = "plan" | "saved";
type SortOption = "duration" | "calories" | "rating";

const MyPlanClient = () => {
  const {
    planIds,
    savedIds,
    doneIds,
    removeFromPlan,
    removeSaved,
    markAsDone,
    hydrated,
  } = useFitLog();

  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortOption>("duration");

  /* =====================================================
     FETCH WORKOUTS
  ===================================================== */

  useEffect(() => {
    let cancelled = false;

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await getWorkouts();

        if (!cancelled) {
          setWorkouts(data);
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

    fetchWorkouts();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =====================================================
     CURRENT IDS
  ===================================================== */

  const currentIds = tab === "plan" ? planIds : savedIds;

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const currentWorkouts = useMemo(() => {
    const filtered = workouts.filter((workout) =>
      currentIds.includes(workout.id),
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }

      return b.rating - a.rating;
    });
  }, [workouts, currentIds, sortBy]);

  /* =====================================================
     TODAY'S PLAN METRICS
     
     These metrics always represent Today's Plan,
     even when the Saved tab is selected.
  ===================================================== */

  const planWorkouts = useMemo(() => {
    return workouts.filter((workout) => planIds.includes(workout.id));
  }, [workouts, planIds]);

  const exercises = planWorkouts.length;

  const minutes = planWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );

  const calories = planWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading || !hydrated) {
    return (
      <main className="min-h-screen bg-[#0b0c0f]">
        <section
          className="
            mx-auto
            max-w-296
            px-4
            py-10
            sm:px-6
            lg:px-0
            lg:py-12
          "
        >
          <div className="flex min-h-105 items-center justify-center">
            <div className="text-center">
              <span className="loading loading-spinner loading-md text-[#ccff00]" />

              <p className="mt-4 text-sm text-[#858994]">Loading workouts…</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     ERROR
  ===================================================== */

  if (error) {
    return (
      <main className="min-h-screen bg-[#0b0c0f]">
        <section
          className="
            mx-auto
            w-full
            max-w-296
            px-4
            py-10
            sm:px-6
            lg:px-0
            lg:py-11
          "
        >
          <div className="flex min-h-105 items-center justify-center">
            <div className="max-w-lg text-center">
              <h1
                className="
                  font-oswald
                  text-3xl
                  font-bold
                  uppercase
                  text-white
                  sm:text-4xl
                "
              >
                Unable to Load Workouts
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#858994]">
                Something went wrong while loading your workout data.
              </p>

              <p className="mt-2 wrap-break-word text-xs text-[#5f636c]">
                {error}
              </p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="
                  mt-6
                  inline-flex
                  h-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#ccff00]
                  px-6
                  text-xs
                  font-bold
                  text-black
                  transition
                  hover:bg-[#d7ff43]
                "
              >
                Try Again
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =====================================================
     MAIN
  ===================================================== */

  return (
    <main className="min-h-screen bg-[#0b0c0f]">
      <section
        className="
          mx-auto
          w-full
          max-w-296
          px-4
          py-10
          sm:px-6
          lg:px-0
          lg:py-11
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div>
          <h1
            className="
              font-oswald
              text-[30px]
              font-bold
              uppercase
              leading-none
              tracking-tight
              text-white
              sm:text-[34px]
            "
          >
            My Plan
          </h1>

          <p className="mt-2 text-[13px] text-[#858994] sm:text-sm">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* =================================================
            METRICS
        ================================================= */}

        <div
          className="
            mt-7
            grid
            grid-cols-1
            overflow-hidden
            rounded-2xl
            border
            border-[#262a32]
            bg-[#14171d]
            sm:grid-cols-3
          "
        >
          <MetricCard label="Exercises" value={exercises} highlight />

          <MetricCard label="Minutes" value={minutes} bordered />

          <MetricCard label="Calories" value={calories} bordered />
        </div>

        {/* =================================================
            TABS + SORT
        ================================================= */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          {/* Tabs */}

          <div
            className="
              flex
              w-fit
              rounded-xl
              border
              border-[#272b33]
              bg-[#15181e]
              p-1
            "
          >
            <button
              type="button"
              onClick={() => setTab("plan")}
              className={`
                min-w-27.5
                rounded-lg
                px-4
                py-2
                text-xs
                font-semibold
                transition
                ${
                  tab === "plan"
                    ? "bg-[#272c35] text-white shadow-sm"
                    : "text-[#7e828c] hover:text-white"
                }
              `}
            >
              Todays Plan
            </button>

            <button
              type="button"
              onClick={() => setTab("saved")}
              className={`
                min-w-27
                rounded-lg
                px-4
                py-2
                text-xs
                font-semibold
                transition
                ${
                  tab === "saved"
                    ? "bg-[#272c35] text-white shadow-sm"
                    : "text-[#7e828c] hover:text-white"
                }
              `}
            >
              Saved
            </button>
          </div>

          {/* Sort */}

          <div className="flex items-center gap-3">
            <span className="text-xs text-[#7d818b]">Sort By</span>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="
                  h-9
                  appearance-none
                  rounded-lg
                  border
                  border-[#292e37]
                  bg-[#14171d]
                  px-3
                  pr-9
                  text-xs
                  text-[#e3e5e8]
                  outline-none
                  transition
                  focus:border-[#484f5b]
                "
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>

              <ChevronDown
                size={14}
                className="
                  pointer-events-none
                  absolute
                  right-2.5
                  top-1/2
                  -translate-y-1/2
                  text-[#8c9099]
                "
              />
            </div>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="mt-6">
          {currentWorkouts.length === 0 ? (
            <EmptyState tab={tab} />
          ) : (
            <div className="space-y-4">
              {currentWorkouts.map((workout) => (
                <PlanWorkoutCard
                  key={workout.id}
                  workout={workout}
                  tab={tab}
                  done={doneIds.includes(workout.id)}
                  onDone={() => markAsDone(workout.id)}
                  onRemove={() => {
                    if (tab === "plan") {
                      removeFromPlan(workout.id);
                    } else {
                      removeSaved(workout.id);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

/* =========================================================
   METRIC CARD
========================================================= */

interface MetricCardProps {
  label: string;
  value: number;
  highlight?: boolean;
  bordered?: boolean;
}

const MetricCard = ({
  label,
  value,
  highlight = false,
  bordered = false,
}: MetricCardProps) => {
  return (
    <div
      className={`
        px-6
        py-7
        sm:px-6
        sm:py-8
        ${bordered ? "border-t border-[#242830] sm:border-l sm:border-t-0" : ""}
      `}
    >
      <p className="text-[12px] text-[#7f838d]">{label}</p>

      <p
        className={`
          mt-2
          font-oswald
          text-4xl
          font-bold
          leading-none
          sm:text-[40px]
          ${highlight ? "text-[#ccff00]" : "text-white"}
        `}
      >
        {value}
      </p>
    </div>
  );
};

/* =========================================================
   WORKOUT CARD
========================================================= */

interface PlanWorkoutCardProps {
  workout: IWorkout;
  tab: Tab;
  done: boolean;
  onDone: () => void;
  onRemove: () => void;
}

const PlanWorkoutCard = ({
  workout,
  tab,
  done,
  onDone,
  onRemove,
}: PlanWorkoutCardProps) => {
  return (
    <article
      className="
        rounded-2xl
        border
        border-[#272b33]
        bg-[#14171d]
        p-4
        transition
        hover:border-[#343944]
      "
    >
      <div
        className="
          flex
          flex-col
          gap-5
          sm:flex-row
          sm:items-center
        "
      >
        {/* =================================================
            THUMBNAIL
        ================================================= */}

        <div
          className="
            relative
            h-40
            w-full
            shrink-0
            overflow-hidden
            rounded-xl
            sm:h-20
            sm:w-36
          "
        >
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="
              (max-width: 639px) 100vw,
              144px
            "
            className="object-cover"
          />
        </div>

        {/* =================================================
            INFORMATION
        ================================================= */}

        <div className="min-w-0 flex-1">
          <h3
            className="
              font-oswald
              text-[17px]
              font-bold
              uppercase
              leading-tight
              tracking-wide
              text-white
            "
          >
            {workout.name}
          </h3>

          <p className="mt-1 text-xs text-[#7d818b]">{workout.equipment}</p>

          {/* Stats */}

          <div
            className="
              mt-2.5
              flex
              flex-wrap
              items-center
              gap-4
              text-[11px]
              text-[#9b9fa8]
            "
          >
            <span className="flex items-center gap-1.5">
              <Clock3 size={13} strokeWidth={1.8} className="text-[#ccff00]" />
              {workout.duration} min
            </span>

            <span className="flex items-center gap-1.5">
              <Flame size={13} strokeWidth={1.8} className="text-[#ccff00]" />
              {workout.caloriesBurned} kcal
            </span>

            <span className="flex items-center gap-1.5">
              <Star size={13} strokeWidth={1.8} className="text-[#ccff00]" />

              {workout.rating}
            </span>
          </div>
        </div>

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
          "
        >
          {/* View Details */}

          <Link
            href={`/workouts/${workout.id}`}
            className="
              inline-flex
              h-8.75
              items-center
              justify-center
              rounded-full
              border
              border-[#3c424d]
              px-4
              text-[11px]
              font-medium
              text-[#e3e5e8]
              transition
              hover:border-[#606773]
              hover:bg-[#1a1d23]
            "
          >
            View Details
          </Link>

          {/* Mark as Done */}

          {tab === "plan" && (
            <button
              type="button"
              onClick={onDone}
              disabled={done}
              className={`
                inline-flex
                h-8.75
                items-center
                justify-center
                gap-1.5
                rounded-full
                px-4
                text-[11px]
                font-bold
                transition
                ${
                  done
                    ? "cursor-default bg-[#34383f] text-[#969aa4]"
                    : "bg-[#ccff00] text-black hover:bg-[#d7ff43]"
                }
              `}
            >
              <Check size={14} strokeWidth={2.5} />

              {done ? "Done" : "Mark as Done"}
            </button>
          )}

          {/* Remove */}

          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${workout.name}`}
            className="
              flex
              h-8.75
              w-7.5
              items-center
              justify-center
              rounded-full
              text-[#6f7480]
              transition
              hover:bg-[#1c1f25]
              hover:text-white
            "
          >
            <X size={17} />
          </button>
        </div>
      </div>
    </article>
  );
};

/* =========================================================
   EMPTY STATE
========================================================= */

interface EmptyStateProps {
  tab: Tab;
}

const EmptyState = ({ tab }: EmptyStateProps) => {
  const isPlan = tab === "plan";

  return (
    <div
      className="
        flex
        min-h-75
        flex-col
        items-center
        justify-center
        rounded-2xl
        border
        border-dashed
        border-[#2a2e36]
        bg-[#0d0f13]
        px-5
        text-center
      "
    >
      <h2
        className="
          font-oswald
          text-xl
          font-bold
          uppercase
          tracking-wide
          text-white
          sm:text-2xl
        "
      >
        {isPlan ? "NOTHING HERE YET" : "NO SAVED WORKOUTS"}
      </h2>

      <p className="mt-2 max-w-md text-xs text-[#81858f] sm:text-sm">
        {isPlan
          ? "Browse the library and add a lift to get today moving."
          : "Save workouts from the library and find them here later."}
      </p>

      <Link
        href="/"
        className="
          mt-6
          inline-flex
          h-9
          items-center
          justify-center
          rounded-full
          bg-[#ccff00]
          px-6
          text-xs
          font-bold
          text-black
          transition
          hover:bg-[#d7ff43]
        "
      >
        Go to Workouts
      </Link>
    </div>
  );
};

export default MyPlanClient;
