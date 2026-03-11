import React from "react";
import TeamProfileCard from "./other/TeamProfileCard";
import BlurScrollText from "./ui/BlurText";
import SplitText from "./other/SplitText";

const Approach = () => {
  return (
    <section className="relative bg-black pt-24 pb-20 lg:pt-32 lg:pb-32">
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        {/* ── Blur scroll headline ─────────────────────────────────────── */}
        <div className="relative lg:pl-10">
          <div className="overflow-visible text-pretty text-gra text-[1.75rem] sm:text-[2.25rem] lg:text-[4rem] font-google tracking-tighter leading-[1.15] select-none">
            <BlurScrollText as="p" className="">
              <span className="relative text-white text-[0.75rem] lg:text-[1rem] font-bold align-top mr-2 lg:mr-4 whitespace-nowrap">
                [Our Approach]
              </span>
              Traditional agencies perfected the art of the pitch.
            </BlurScrollText>
            <BlurScrollText as="p">
              <span className="text-white">
                We perfected the art of the work.
              </span>{" "}
              When you need <span className="text-white">design that </span>
            </BlurScrollText>
            <BlurScrollText as="p">
              <span className="text-white">
                moves at the speed of your ambition,
              </span>{" "}
              you need a different kind of studio.
            </BlurScrollText>
          </div>
        </div>

        {/* ── Bottom content: card + text ──────────────────────────────── */}
        <div className="mt-10 lg:mt-28 lg:pl-10">
          {/* Desktop: side by side — Mobile: stacked */}
          <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-start">
            {/* Team Profile Card — always visible */}
            <div className="shrink-0">
              <TeamProfileCard />
            </div>

            {/* Text column */}
            <div className="text-white text-pretty tracking-tighter font-google mt-10 lg:mt-0 lg:ml-[9.5rem] flex flex-col gap-10 lg:gap-16">
              {/* Large quote — desktop only */}
              <div className="hidden lg:block">
                <SplitText
                  text="After years in traditional agencies, I saw the same problems repeatedly. Talented designers spending more time in meetings than creating. Clients paying for process instead of progress. Great ideas dying in revision purgatory."
                  className="w-full max-w-[40rem] text-[2rem] leading-[1.2]"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                  showCallback={false}
                />
              </div>

              {/* Two smaller paragraphs — visible on all screens */}
              <div className="flex flex-col sm:flex-row gap-8 lg:gap-32">
                <SplitText
                  text="So I built Oguz differently. No endless meetings, no office politics, no pitches that promise everything. Just talented designers doing what they do best."
                  className="font-inter w-full sm:max-w-[22rem] lg:w-[29.171rem] text-gra leading-[1.4] text-sm lg:text-base"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                  showCallback={false}
                />

                <SplitText
                  text="We create design that actually solves problems. We're obsessive about the details because that's what our clients pay us for. To care as much as they do."
                  className="font-inter w-full sm:max-w-[22rem] lg:w-[29.171rem] text-gra leading-[1.4] text-sm lg:text-base"
                  delay={50}
                  duration={1.25}
                  ease="power3.out"
                  splitType="lines"
                  from={{ opacity: 0, y: 40 }}
                  to={{ opacity: 1, y: 0 }}
                  threshold={0.1}
                  rootMargin="-100px"
                  textAlign="left"
                  showCallback={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
