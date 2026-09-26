"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface FitLogContextType {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];

  planCount: number;
  savedCount: number;

  canAddToPlan: boolean;
  hydrated: boolean;

  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;

  saveWorkout: (id: number) => void;
  removeSaved: (id: number) => void;

  markAsDone: (id: number) => void;

  toast: string | null;
}

const FitLogContext = createContext<FitLogContextType | null>(null);

export const FitLogProvider = ({ children }: { children: ReactNode }) => {
  const [planIds, setPlanIds] = useState<number[]>([]);
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);

  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedPlan = localStorage.getItem("fitlog-plan");
        const storedSaved = localStorage.getItem("fitlog-saved");
        const storedDone = localStorage.getItem("fitlog-done");

        if (storedPlan) {
          const parsed = JSON.parse(storedPlan);

          if (Array.isArray(parsed)) {
            setPlanIds(parsed);
          }
        }

        if (storedSaved) {
          const parsed = JSON.parse(storedSaved);

          if (Array.isArray(parsed)) {
            setSavedIds(parsed);
          }
        }

        if (storedDone) {
          const parsed = JSON.parse(storedDone);

          if (Array.isArray(parsed)) {
            setDoneIds(parsed);
          }
        }
      } catch (error) {
        console.error("Failed to load FitLog storage:", error);
      } finally {
        setHydrated(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-plan", JSON.stringify(planIds));
  }, [planIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-saved", JSON.stringify(savedIds));
  }, [savedIds, hydrated]);

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
  }, [doneIds, hydrated]);

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  const addToPlan = (id: number) => {
    if (planIds.includes(id)) {
      showToast("Already in today's plan");
      return;
    }

    if (planIds.length >= 5) {
      showToast("Today's plan is full");
      return;
    }

    setPlanIds((prev) => [...prev, id]);
    showToast("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    setPlanIds((prev) => prev.filter((item) => item !== id));
    setDoneIds((prev) => prev.filter((item) => item !== id));

    showToast("Removed from today's plan");
  };

  const saveWorkout = (id: number) => {
    if (savedIds.includes(id)) {
      showToast("Already saved");
      return;
    }

    setSavedIds((prev) => [...prev, id]);
    showToast("Saved for later");
  };

  const removeSaved = (id: number) => {
    setSavedIds((prev) => prev.filter((item) => item !== id));

    showToast("Removed from saved");
  };

  const markAsDone = (id: number) => {
    if (doneIds.includes(id)) {
      return;
    }

    setDoneIds((prev) => [...prev, id]);
    showToast("Workout marked as done");
  };

  return (
    <FitLogContext.Provider
      value={{
        planIds,
        savedIds,
        doneIds,
        planCount: planIds.length,
        savedCount: savedIds.length,
        canAddToPlan: planIds.length < 5,
        hydrated,
        addToPlan,
        removeFromPlan,
        saveWorkout,
        removeSaved,
        markAsDone,
        toast,
      }}
    >
      {children}

      {toast && (
        <div className="toast toast-end toast-bottom z-9999">
          <div className="alert border-[#ccff00] bg-[#15171c] text-white shadow-xl">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};
