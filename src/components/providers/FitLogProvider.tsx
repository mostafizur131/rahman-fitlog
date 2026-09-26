"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const DONE_KEY = "fitlog-done";

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

  const [toast, setToast] = useState<string | null>(null);

  const [hydrated, setHydrated] = useState(false);

  /* ================= LOAD ================= */

  useEffect(() => {
    try {
      const plan = localStorage.getItem(PLAN_KEY);
      const saved = localStorage.getItem(SAVED_KEY);
      const done = localStorage.getItem(DONE_KEY);

      if (plan) {
        setPlanIds(JSON.parse(plan));
      }

      if (saved) {
        setSavedIds(JSON.parse(saved));
      }

      if (done) {
        setDoneIds(JSON.parse(done));
      }
    } catch {
      setPlanIds([]);
      setSavedIds([]);
      setDoneIds([]);
    }

    setHydrated(true);
  }, []);

  /* ================= SAVE ================= */

  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(PLAN_KEY, JSON.stringify(planIds));

    localStorage.setItem(SAVED_KEY, JSON.stringify(savedIds));

    localStorage.setItem(DONE_KEY, JSON.stringify(doneIds));
  }, [planIds, savedIds, doneIds, hydrated]);

  /* ================= TOAST ================= */

  const showToast = (message: string) => {
    setToast(message);

    window.setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  /* ================= PLAN ================= */

  const addToPlan = (id: number) => {
    if (planIds.includes(id)) {
      showToast("Already added to today's plan");
      return;
    }

    if (planIds.length >= 5) {
      showToast("Today's plan is limited to 5 lifts");
      return;
    }

    setPlanIds((current) => [...current, id]);

    showToast("Added to today's plan");
  };

  const removeFromPlan = (id: number) => {
    setPlanIds((current) => current.filter((item) => item !== id));

    showToast("Removed from today's plan");
  };

  /* ================= SAVED ================= */

  const saveWorkout = (id: number) => {
    if (savedIds.includes(id)) {
      showToast("Already saved");
      return;
    }

    setSavedIds((current) => [...current, id]);

    showToast("Saved for later");
  };

  const removeSaved = (id: number) => {
    setSavedIds((current) => current.filter((item) => item !== id));

    showToast("Removed from saved");
  };

  /* ================= DONE ================= */

  const markAsDone = (id: number) => {
    if (!doneIds.includes(id)) {
      setDoneIds((current) => [...current, id]);
    }

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
        <div
          role="status"
          className="
            fixed
            bottom-5
            left-1/2
            z-9999
            -translate-x-1/2
            rounded-lg
            border
            border-[#343943]
            bg-[#17191e]
            px-5
            py-3
            text-sm
            font-medium
            text-white
            shadow-2xl
          "
        >
          {toast}
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
