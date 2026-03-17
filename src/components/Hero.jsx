import TeamMemberCard from "./other/TeamMemberCard";
import PixelBlast from "./other/PixelBlast";
import SplitText from "./other/SplitText";
import { teamMembers } from "./other/constants";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import Navbar from "./ui/Navbar";
import Noise from "./other/noise";

const Hero = () => {
  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };

  return (
    <>
      <Navbar />

      <main className="relative min-h-[900px] overflow-hidden bg-black">
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
        <div className="relative z-10   pointer-events-none">
          <Noise className="z-0" />
          <div className="flex flex-col max-w-[1920px] min-h-[900px] mx-auto px-6 md:px-12 lg:px-20 pt-[4rem] pb-16 z-[999]">
            {/* ── Headline block ── */}
            <div className="font-inter flex-shrink-0 mb-10">
              {/* OGUZ line */}
              <div className="text-[clamp(5rem,15.83vw,19rem)] select-none font-bold tracking-tight leading-none text-white text-left font-inter">
                OGUZ
              </div>

              {/*
                STUDIO row — flex container that places:
                  • copyright anchored left (desktop only)
                  • STUDIO text pushed to the right
                  • TeamMemberCard absolutely anchored at left:35% of THIS row,
                    vertically centred on the STUDIO line — so the card always
                    sits on the STUDIO text regardless of viewport width.
              */}
              <div className="relative flex items-center -mt-4 sm:-mt-6 md:-mt-10">
                {/* Copyright — left of STUDIO row, vertically centred */}
                <h6 className="hidden lg:block text-white text-sm self-start pb-[0.6em] lg:pt-16 pl-10 shrink-0 select-none">
                  © Since — 2024
                </h6>

                {/* Push STUDIO to the right */}
                <div className="flex-1" />

                {/* STUDIO text */}
                <span className="text-[clamp(5rem,15.83vw,19rem)] select-none font-bold tracking-tight leading-none text-gray-300 font-inter">
                  STUDIO
                </span>

                {/*
                  TeamMemberCard — left:35% keeps it at the same relative
                  position as the original absolute inside the headline wrapper,
                  but now the containing block is only the STUDIO row so
                  top:50% + -translate-y-1/2 reliably centres it on that line.
                */}
                <div
                  className="
  hidden lg:block absolute pointer-events-auto
  left-[30%] xl:left-[28%] 2xl:left-[35%]
  top-[90%]
  -translate-y-[30%]
  scale-[0.85] xl:scale-[0.8] 2xl:scale-100
  origin-left
  transition-transform
"
                >
                  <TeamMemberCard />
                </div>
              </div>

              {/* Mobile copyright — in flow below h1 */}
              <h6 className="text-start text-white mt-2 lg:hidden select-none">
                © Since — 2024
              </h6>

              {/*
                AnimatedTooltip — in flow directly below the headline block
                (desktop only). Replaces the old absolute bottom:-40% which
                drifted with different headline heights.
              */}
              <div
                className="hidden lg:block absolute pointer-events-auto z-50
  bottom-20 lg:pb-10 xl:bottom-[18rem] 2xl:bottom-20
  scale-[0.85] xl:scale-[0.8] 2xl:scale-100
  origin-left
  transition-transform
"
              >
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

            {/*
              Flex spacer — pushes the body copy to the bottom of the column.
              Replaces the fragile absolute bottom-16 right-20 offset.
            */}
            <div className="flex-1" />

            {/* Bottom-right body copy */}
            <div
              className="
  hidden lg:flex justify-end pointer-events-auto
lg:pt-36 xl:-translate-y-44 2xl:-translate-y-8
  transition-transform
"
            >
              <div
                className="
    w-[26rem] xl:w-[30rem] 2xl:w-[34rem]
    drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]
"
              >
                <SplitText
                  text="We've reimagined how great design happens. No pitches. No proposals. No project management theater. Just exceptional work from senior designers who become an extension of your team."
                  className="text-2xl xl:text-xl text-center text-white"
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
        </div>
      </main>
    </>
  );
};

export default Hero;
