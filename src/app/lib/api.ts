import type { IWorkout } from "@/types/workout";

const API_BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      `FitLog API error: ${response.status} ${response.statusText}${
        errorText ? ` - ${errorText}` : ""
      }`,
    );
  }

  return response.json();
};

export const getWorkouts = async (): Promise<IWorkout[]> => {
  return request<IWorkout[]>(API_BASE_URL);
};

export const getWorkout = async (id: string): Promise<IWorkout> => {
  return request<IWorkout>(`${API_BASE_URL}/${id}`);
};
