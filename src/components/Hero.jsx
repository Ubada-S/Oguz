import React, { useState, useEffect } from "react";
import TeamMemberCard from "./other/TeamMemberCard";
import PixelBlast from "./other/PixelBlast";
import SplitText from "./other/SplitText";
import AnimatedMenu from "./ui/AnimatedMenu";
import { teamMembers } from "./other/constants";
import { AnimatedTooltip } from "./ui/animated-tooltip";

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
      {/* ─── LAYER 1: BLENDED TEXT (z-40) ────────────────────────────── */}
      <nav className="fixed font-inter top-0 left-0 right-0 z-40 h-[60px] bg-transparent mix-blend-difference pointer-events-none">
        <div className="max-w-[1920px] mx-auto h-full px-6 md:px-12 lg:px-20 grid grid-cols-4 items-center">
          {/* Left — Logo */}
          <div className="flex items-center justify-start max-md:hidden pointer-events-auto">
            <a
              href="/"
              className="text-white text-[20px] font-bold tracking-tight select-none hover:opacity-70 transition-opacity duration-200"
            >
              OGUZ<sup className="text-[8px] align-super ml-[2px]">®</sup>
            </a>
          </div>

          {/* Center — City + Clock */}
          <div className="flex items-center justify-center gap-2 text-[14.5px] tracking-wide select-none max-md:hidden pointer-events-auto">
            <span className="text-white font-medium">Mumbai (IN)</span>
            <span className="text-white/80 font-medium tabular-nums">
              {time}
            </span>
          </div>

          {/* Right — Work + Menu (Menu is INVISIBLE here to maintain gap) */}
          <div className="flex items-center justify-end gap-6 pointer-events-auto">
            <a
              href="#work"
              className="hidden sm:flex items-center gap-1.5 max-md:hidden text-[14.5px] font-medium tracking-wide text-white hover:opacity-70 transition-opacity duration-200"
            >
              <span>Our Work</span>
              <span className="text-white/60">[12]</span>
            </a>

            {/* INVISIBLE Menu placeholder */}
            <div className="invisible pointer-events-none select-none">
              <AnimatedMenu />
            </div>
          </div>
        </div>
      </nav>

      {/* ─── LAYER 2: NORMAL MENU (z-50) ─────────────────────────────── */}
      <nav className="fixed font-inter top-0 left-0 right-0 z-50 h-[60px] bg-transparent pointer-events-none">
        <div className="max-w-[1920px] mx-auto h-full px-6 md:px-12 lg:px-20 grid grid-cols-4 items-center">
          {/* Left — Logo (INVISIBLE) */}
          <div className="flex items-center justify-start max-md:hidden invisible">
            <a href="/" className="text-[20px] font-bold tracking-tight">
              OGUZ<sup className="text-[8px] align-super ml-[2px]">®</sup>
            </a>
          </div>

          {/* Center — City + Clock (INVISIBLE) */}
          <div className="flex items-center justify-center gap-2 text-[14.5px] tracking-wide max-md:hidden invisible">
            <span className="font-medium">Mumbai (IN)</span>
            <span className="font-medium tabular-nums">{time}</span>
          </div>

          {/* Right — Work (INVISIBLE) + Menu (VISIBLE) */}
          <div className="flex items-center justify-end gap-6">
            <a
              href="#work"
              className="hidden sm:flex items-center gap-1.5 max-md:hidden text-[14.5px] font-medium tracking-wide invisible"
            >
              <span>Our Work</span>
              <span>[12]</span>
            </a>

            {/* VISIBLE Menu */}
            <div className="pointer-events-auto">
              <AnimatedMenu />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-screen overflow-hidden bg-black">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <PixelBlast
            variant="square"
            pixelSize={5}
            color="#262626"
            patternScale={2}
            patternDensity={1}
            enableRipples
            rippleSpeed={0.25}
            rippleThickness={0.15}
            rippleIntensityScale={1}
            speed={0.5}
            transparent
            edgeFade={0.25}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1920px] mx-auto pointer-events-none">
          <div className="flex flex-col justify-start h-[900px] px-6 md:px-12 lg:px-20">
            {/* ── Headline block ──
                The card and avatars live INSIDE this relative div so their
                absolute positions are percentage-based relative to the h1,
                which itself scales with 15.83vw. Everything moves together.
            */}
            <div className="relative font-inter mb-10 mt-[4rem]">
              <h1 className="text-[clamp(5rem,15.83vw,19rem)] select-none font-bold tracking-tight leading-none font-inter">
                <span className="block text-white text-left">OGUZ</span>
                <span className="block text-gray-300 text-right -mt-4 sm:-mt-6 md:-mt-10">
                  STUDIO
                </span>
              </h1>

              <h6 className="text-start text-white lg:absolute top-[19rem] left-10">
                © Since — 2024
              </h6>

              {/*
                TeamMemberCard — anchored to STUDIO text via % offsets.
                `top: 53%` = just into the second line (STUDIO).
                `left: 34%` = roughly where STUDIO starts on most viewports.
                Both scale with the headline's own dimensions, so the card
                stays locked on STUDIO as the window resizes.
              */}
              <div
                className="hidden lg:block absolute pointer-events-auto"
                style={{ top: "70%", left: "35%" }}
              >
                <TeamMemberCard />
              </div>

              {/*
                AnimatedTooltip — anchored to bottom-left of headline block.
                `bottom: -18%` keeps it just below the h1 baseline.
                `left: 0` aligns with the left padding of the page.
              */}
              <div className="absolute pointer-events-auto left-0 bottom-[-10%] lg:bottom-[-40%] hidden lg:block">
                <AnimatedTooltip items={teamMembers} />
              </div>
            </div>

            {/* Mobile-only: card + tooltips in flow */}
            <div className="flex justify-start pt-10 lg:hidden pointer-events-auto">
              <TeamMemberCard />
            </div>
            <div className="flex justify-start pt-24 lg:hidden pointer-events-auto">
              <AnimatedTooltip items={teamMembers} />
            </div>

            {/* Bottom-right body copy */}
            <div className="hidden lg:block w-[34rem] absolute bottom-16 right-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
              <SplitText
                text="We've reimagined how great design happens. No pitches. No proposals. No project management theater. Just exceptional work from senior designers who become an extension of your team."
                className="text-2xl text-center text-white"
                delay={50}
                duration={1.25}
                ease="power3.out"
                splitType="lines"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
                showCallback={false}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Hero;
