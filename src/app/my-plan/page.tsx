import MyPlanClient from "@/components/my-plan/MyPlanClient";
import { getWorkouts } from "@/app/lib/api";

const MyPlanPage = async () => {
  const workouts = await getWorkouts();

  return <MyPlanClient workouts={workouts} />;
};

export default MyPlanPage;
