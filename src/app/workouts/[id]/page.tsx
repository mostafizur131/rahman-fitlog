import WorkoutDetailsClient from "@/components/workouts/WorkoutDetailsClient";

interface WorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: WorkoutDetailsPageProps) => {
  const { id } = await params;

  return <WorkoutDetailsClient id={id} />;
};

export default WorkoutDetailsPage;
