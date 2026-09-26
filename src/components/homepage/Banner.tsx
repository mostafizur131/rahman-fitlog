import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import BannerImage from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="mx-auto mt-5 w-full max-w-352 px-4 sm:mt-6 sm:px-6 lg:mt-8 lg:px-8 ">
      <div className="overflow-hidden rounded-xl border border-[#20232b] bg-[#15171c] py-5">
        <div className="grid min-h-80 grid-cols-1 md:grid-cols-[1.15fr_0.85fr]">
          {/* ================= Content ================= */}
          <div className="flex flex-col justify-center px-5 py-9 sm:px-8 sm:py-10 md:px-10 lg:px-14">
            {/* Eyebrow */}
            <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.12em] text-[#ccff00] sm:mb-4 sm:text-[10px]">
              Workout Library
            </p>

            {/* Heading */}
            <h1 className="max-w-170  text-[36px] font-bold font-oswald uppercase leading-[0.96] tracking-tight text-white xs:text-[40px] sm:text-5xl md:text-[48px] lg:text-[58px]">
              Train with intent. Log
              <br />
              every set.
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-150 text-[12px] leading-5 text-[#858891] sm:mt-5 sm:text-sm sm:leading-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* CTA */}
            <div className="mt-5 sm:mt-6">
              <Link
                href="#library"
                className="btn h-auto min-h-0 rounded-md border-0 bg-[#ccff00] px-4 py-2.5 text-[9px] font-extrabold uppercase text-black hover:bg-[#d9ff3f] sm:px-5 sm:py-3 sm:text-[10px]"
              >
                Browse Workouts
                <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </div>
          </div>

          {/* ================= Image ================= */}
          <div className="relative flex min-h-52.5 items-center justify-center md:min-h-80">
            <Image
              src={BannerImage}
              alt="Workout illustration"
              width={420}
              height={360}
              priority
              className="h-52.5 w-auto object-contain sm:h-62.5 md:h-70 lg:h-82.5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
