import type { IWorkout } from "@/types/workout";

const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

export const getWorkouts = async (): Promise<IWorkout[]> => {
  const response = await fetch(API_BASE_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return response.json();
};

export const getWorkout = async (id: string): Promise<IWorkout> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Workout not found");
  }

  return response.json();
};
