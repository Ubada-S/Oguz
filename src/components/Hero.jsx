import React from "react";
import TeamMemberCard from "./other/TeamMemberCard";
import PixelBlast from "./other/PixelBlast";
import SplitText from "./other/SplitText";
import { teamMembers } from "./other/constants";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <main className="relative h-[900px] overflow-hidden bg-black ">
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

      {/* Content - higher z-index with pointer-events-none on wrapper */}
      <div className="relative z-10 max-w-[1920px] mx-auto pointer-events-none">
        <div className="flex flex-col justify-start h-[900px] px-6 md:px-12 lg:px-20">
          <div className="relative font-inter mb-10 mt-[4rem]">
            <h1 className="text-[clamp(5rem,15.83vw,19rem)] select-none font-bold tracking-tight leading-none font-inter">
              <span className="block text-white text-left">OGUZ</span>
              <span className="block text-gra text-right -mt-4 sm:-mt-6 md:-mt-10">
                STUDIO
              </span>
            </h1>
            <h6 className="text-start text-white lg:absolute top-[19rem] left-10">
              © Since — 2024
            </h6>
          </div>
          <div className="lg:absolute lg:top-[26rem] lg:left-[50rem] lg:-translate-x-[10rem] lg:translate-y-[3.7rem] flex justify-start pt-10 lg:pt-0 pointer-events-auto">
            <TeamMemberCard />
          </div>
          <div className="lg:absolute lg:top-[45rem] lg:left-[18rem] lg:-translate-x-[10rem] lg:translate-y-[3.7rem] flex justify-start pt-10 lg:pt-0 pointer-events-auto">
            <AnimatedTooltip items={teamMembers} />
          </div>
          <div className="hidden lg:block w-[34rem] absolute bottom-16 right-20 drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
            <SplitText
              text="We've reimagined how great design happens. No pitches. No
              proposals. No project management theater. Just exceptional work
              from senior designers who become an extension of your team."
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
  );
};

export default Hero;
