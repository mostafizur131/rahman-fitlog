"use client";

import Link from "next/link";
import { Bookmark, CalendarPlus } from "lucide-react";

import { useFitLog } from "@/components/providers/FitLogProvider";

interface WorkoutActionsProps {
  workoutId: number;
}

const WorkoutActions = ({ workoutId }: WorkoutActionsProps) => {
  const { addToPlan, saveWorkout, canAddToPlan } = useFitLog();

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => addToPlan(workoutId)}
        disabled={!canAddToPlan}
        className="
          inline-flex
          min-h-11
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#ccff00]
          px-5
          text-sm
          font-bold
          text-black
          transition-all
          hover:bg-[#b8e600]
          hover:shadow-[0_0_20px_rgba(204,255,0,0.15)]
          disabled:cursor-not-allowed
          disabled:bg-[#34383f]
          disabled:text-[#777a83]
          disabled:shadow-none
        "
      >
        <CalendarPlus size={17} />

        {canAddToPlan ? "Add to Today's Plan" : "Plan Full"}
      </button>

      <button
        type="button"
        onClick={() => saveWorkout(workoutId)}
        className="
          inline-flex
          min-h-11
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-[#343945]
          bg-transparent
          px-5
          text-sm
          font-medium
          text-[#d7d9de]
          transition-all
          hover:border-[#555b68]
          hover:text-white
        "
      >
        <Bookmark size={16} />
        Save for Later
      </button>

      <Link
        href="/my-plan"
        className="
          inline-flex
          min-h-11
          items-center
          justify-center
          rounded-lg
          border
          border-[#343945]
          px-5
          text-sm
          font-medium
          text-[#999da8]
          transition
          hover:text-white
        "
      >
        My Plan
      </Link>
    </div>
  );
};

export default WorkoutActions;
