import Banner from "@/components/homepage/Banner";
import WorkoutLibrary from "@/components/homepage/WorkoutLibrary";
import { getWorkouts } from "@/app/lib/api";

const HomePage = async () => {
  const workouts = await getWorkouts();

  return (
    <>
      <Banner />

      <WorkoutLibrary workouts={workouts} />
    </>
  );
};

export default HomePage;
