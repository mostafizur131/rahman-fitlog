import { notFound } from "next/navigation";

import WorkoutDetails from "@/components/workouts/WorkoutDetails";
import { getWorkouts } from "@/app/lib/api";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  const workouts = await getWorkouts();
  const workout = workouts.find((item) => item.id === Number(id));

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
};

export default WorkoutDetailsPage;
