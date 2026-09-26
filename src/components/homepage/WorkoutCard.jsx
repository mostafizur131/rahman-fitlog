import Image from "next/image";
import Link from "next/link";
import { Clock3, Flame, Star } from "lucide-react";
// import type { IWorkout } from "@/types/workout";

// interface WorkoutCardProps {
//   workout: IWorkout;
// }

const WorkoutCard = ({ workout }) => {
  return (
    <Link href={`/workouts/${workout.id}`} className="group block">
      <article
        className="
          h-full
          overflow-hidden
          rounded-xl
          border
          border-[#24272e]
          bg-[#15171c]
          transition-all
          duration-300
          hover:-translate-y-1
          hover:border-[#3a3e47]
          hover:shadow-lg
        "
      >
        {/* ================= IMAGE ================= */}
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1023px) 50vw,
              33vw
            "
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </div>

        {/* ================= CARD CONTENT ================= */}
        <div className="p-4 sm:p-5">
          {/* Muscle group tags */}
          <div className="flex min-h-5.5 flex-wrap gap-1.5">
            {workout.muscleGroups.map((muscle) => (
              <span
                key={muscle}
                className="
                  rounded-full
                  bg-[#ccff00]
                  px-2.5
                  py-1
                  text-[8px]
                  font-extrabold
                  uppercase
                  leading-none
                  tracking-wide
                  text-black
                  sm:text-[9px]
                "
              >
                {muscle}
              </span>
            ))}
          </div>

          {/* Workout name */}
          <h3
            className="
              mt-3
              font-oswald
              text-[17px]
              font-semibold
              uppercase
              leading-tight
              tracking-wide
              text-white
              transition-colors
              group-hover:text-[#ccff00]
              sm:text-lg
            "
          >
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-1 text-[10px] leading-4 text-[#777a83] sm:text-[11px]">
            {workout.equipment}
          </p>

          {/* Divider */}
          <div className="my-3.5 h-px bg-[#24272e]" />

          {/* ================= STATS ================= */}
          <div className="flex items-center gap-3 text-[9px] text-[#777a83] sm:gap-4 sm:text-[10px]">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <Clock3
                size={12}
                strokeWidth={1.8}
                className="shrink-0 text-[#777a83]"
              />

              <span>{workout.duration} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5">
              <Flame
                size={12}
                strokeWidth={1.8}
                className="shrink-0 text-[#777a83]"
              />

              <span>{workout.caloriesBurned} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <Star
                size={12}
                strokeWidth={1.8}
                className="shrink-0 text-[#777a83]"
              />

              <span>{workout.rating}</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default WorkoutCard;
