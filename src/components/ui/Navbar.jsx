import { useState, useEffect } from "react";
import AnimatedMenu from "./AnimatedMenu";
import RollingLink from "./RollingLink";

// ─── Live Clock ───────────────────────────────────────────────────────────────
const useLiveClock = (timeZone = "Asia/Kolkata") => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    setTime(format());
    const id = setInterval(() => setTime(format()), 1000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const time = useLiveClock("Asia/Kolkata");
  return (
    <>
      <nav className="fixed font-inter top-0 left-0 right-0 z-40 h-[60px] bg-transparent mix-blend-difference pointer-events-none">
        <div className="max-w-[1920px] mx-auto h-full px-6 md:px-12 lg:px-20 grid grid-cols-4 items-center">
          <div className="flex items-center justify-start max-md:hidden pointer-events-auto">
            <a
              href="/"
              className="text-white text-[20px] font-bold tracking-tight select-none hover:opacity-70 transition-opacity duration-200"
            >
              OGUZ<sup className="text-[8px] align-super ml-[2px]">®</sup>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-[14.5px] tracking-wide select-none max-md:hidden pointer-events-auto">
            <span className="text-white font-medium">Mumbai (IN)</span>
            <span className="text-white/80 font-medium tabular-nums">
              {time}
            </span>
          </div>

          <div className="flex items-center justify-end gap-6 pointer-events-auto">
            {/* Visble Rolling Link */}
            <RollingLink
              to="/projects"
              label="Our Work"
              count="12"
              className="hidden sm:flex items-center gap-1.5 max-md:hidden text-[14.5px] font-medium tracking-wide text-white transition-opacity duration-200"
            />

            <div className="invisible pointer-events-none select-none">
              <AnimatedMenu />
            </div>
          </div>
        </div>
      </nav>

      <nav className="fixed font-inter top-0 left-0 right-0 z-50 h-[60px] bg-transparent pointer-events-none">
        <div className="max-w-[1920px] mx-auto h-full px-6 md:px-12 lg:px-20 grid grid-cols-4 items-center">
          <div className="flex items-center justify-start max-md:hidden invisible">
            <a href="/" className="text-[20px] font-bold tracking-tight">
              OGUZ<sup className="text-[8px] align-super ml-[2px]">®</sup>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-[14.5px] tracking-wide max-md:hidden invisible">
            <span className="font-medium">Mumbai (IN)</span>
            <span className="font-medium tabular-nums">{time}</span>
          </div>

          <div className="flex items-center justify-end gap-6">
            {/* Invisible Rolling Link (for layout spacing) */}
            <RollingLink
              to="/projects"
              label="Our Work"
              count="12"
              className="hidden sm:flex items-center gap-1.5 max-md:hidden text-[14.5px] font-medium tracking-wide invisible"
            />

            <div className="pointer-events-auto">
              <AnimatedMenu />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
