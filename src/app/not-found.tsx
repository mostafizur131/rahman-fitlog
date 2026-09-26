import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import Image from "next/image";
import logo from "@/assets/logo.png";

const NotFound = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0c0f] px-4 text-white">
      <div className="w-full max-w-2xl text-center">
        {/* Logo */}
        <Link href="/" className="mb-12 inline-flex items-center gap-2">
          <Image src={logo} alt="Fot Log" />

          <span className="text-sm font-black tracking-wide">FITLOG</span>
        </Link>

        {/* 404 */}
        <p className="font-oswald text-[100px] font-bold leading-none text-[#ccff00] sm:text-[140px] md:text-[180px]">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 font-oswald text-3xl font-bold uppercase tracking-tight sm:text-4xl md:text-5xl">
          Workout Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#858891] sm:text-base">
          Looks like this page skipped leg day. The workout or page you&apos;re
          looking for doesn&apos;t exist.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="btn mt-7 h-auto min-h-0 rounded-md border-0 bg-[#ccff00] px-5 py-3 text-[10px] font-extrabold uppercase text-black hover:bg-[#d9ff3f]"
        >
          <ArrowLeft size={14} strokeWidth={2.5} />
          Back to Workouts
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
