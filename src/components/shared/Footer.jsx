import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[#1b1d23] bg-[#0b0c0f] sm:mt-16">
      <div className="mx-auto flex min-h-20 max-w-360 flex-col items-center justify-center gap-3 px-4 py-5 sm:flex-row sm:justify-between sm:px-6 sm:py-0 lg:px-8">
        {/* Logo */}
        <div className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="FitLog-Logo" />

          <span className="text-[10px] font-black tracking-wide text-white">
            FITLOG
          </span>
        </div>

        {/* Copyright */}
        <p className="text-center text-[9px] leading-4 text-[#5f626b] sm:text-right sm:text-[10px]">
          © {year} FitLog — Workout Library.
          <span className="hidden sm:inline"> Train hard, log honest.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
