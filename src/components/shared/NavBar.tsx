"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { Menu } from "lucide-react";
import { useFitLog } from "@/components/providers/FitLogProvider";

const NavBar = () => {
  const pathname = usePathname();

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workouts/");

  const isPlanActive =
    pathname === "/my-plan" || pathname.startsWith("/my-plan/");

  const { planCount, savedCount } = useFitLog();

  return (
    <header className="sticky top-0 z-50 border-b border-[#1b1d23] bg-[#0b0c0f]/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-360 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ================= Logo ================= */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="FitLog-Logo" />

          <span className="text-sm font-black tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        {/* ================= Desktop Navigation ================= */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 sm:flex">
          <Link
            href="/"
            className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${
              isWorkoutActive
                ? "bg-[#19230f] text-[#ccff00]"
                : "text-[#777a83] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-full px-4 py-1.5 text-[11px] font-medium transition ${
              isPlanActive
                ? "bg-[#19230f] text-[#ccff00]"
                : "text-[#777a83] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* ================= Right Section ================= */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] text-[#858891] transition hover:text-white sm:text-[11px]"
          >
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ccff00] px-1.5 text-[9px] font-bold text-black sm:text-[10px]">
              {planCount}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[10px] text-[#858891] transition hover:text-white sm:text-[11px]"
          >
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#363941] px-1.5 text-[9px] text-[#858891] sm:text-[10px]">
              {savedCount}
            </span>
          </Link>

          {/* ================= Mobile Menu ================= */}
          <div className="dropdown dropdown-end sm:hidden">
            <button
              tabIndex={0}
              className="btn btn-ghost btn-sm h-8 min-h-8 w-8 p-0 text-[#858891] hover:bg-[#17191e] hover:text-white"
              aria-label="Open navigation menu"
            >
              <Menu size={19} />
            </button>

            <ul
              tabIndex={0}
              className="menu dropdown-content z-1 mt-3 w-44 rounded-lg border border-[#252830] bg-[#15171c] p-2 shadow-xl"
            >
              <li>
                <Link
                  href="/"
                  className={
                    isWorkoutActive
                      ? "bg-[#19230f] text-[#ccff00]"
                      : "text-[#858891]"
                  }
                >
                  Workouts
                </Link>
              </li>

              <li>
                <Link
                  href="/my-plan"
                  className={
                    isPlanActive
                      ? "bg-[#19230f] text-[#ccff00]"
                      : "text-[#858891]"
                  }
                >
                  My Plan
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
