import React from "react";
import TeamProfileCard from "./other/TeamProfileCard";
import BlurScrollText from "./ui/BlurText";
import SplitText from "./other/SplitText";

const Approach = () => {
  return (
    <section className="relative max-md:-mt-24 max-md:mb-16 min-h-[1100px] bg-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="px-6 pt-32">
          {/* Your content goes here */}
          <div className="relative lg:pl-10">
            <div className="overflow-visible text-pretty text-gra text-[2rem] lg:text-[4rem] font-google tracking-tighter leading-[37px] lg:leading-[60px] select-none">
              <BlurScrollText as="p" className="">
                <span className="relative lg:bottom-4  text-white text-[0.8rem]  lg:text-[1rem] font-bold align-top  mr-2 lg:mr-4 whitespace-nowrap">
                  [Our Approach]
                </span>
                Traditional agencies perfected the art of the pitch.
              </BlurScrollText>
              <BlurScrollText as="p">
                <span className="text-white">
                  We perfected the art of the work.
                </span>
                When you need <span className="text-white">design that </span>
              </BlurScrollText>
              <BlurScrollText as="p">
                <span className="text-white">
                  moves at the speed of your ambition,
                </span>
                you need a different kind of studio.
              </BlurScrollText>
            </div>
          </div>
          <div className="flex flex-row gap-8 mt-10 lg:ml-10 lg:mt-32">
            <TeamProfileCard />
            <div className="text-white overflow-hidden text-pretty tracking-tighter leading-[37px] font-google hidden lg:flex lg:flex-col lg:gap-16 ml-[9.5rem] -mt-1">
              <SplitText
                text="After years in traditional agencies, I saw the same problems
                repeatedly. Talented designers spending more time in meetings
                than creating. Clients paying for process instead of progress.
                Great ideas dying in revision purgatory."
                className="w-[40rem] h-[12.188rem] text-[2rem]"
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

              <div className="flex flex-row gap-32">
                <SplitText
                  text=" So I built Oguz differently. No endless meetings, no office
                  politics, no pitches that promise everything. Just talented
                  designers doing what they do best."
                  className="font-inter w-[29.171rem] text-gra leading-5"
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
                  text="We create design that actually solves problems. We're
                  obsessive about the details because that's what our clients
                  pay us for. To care as much as they do."
                  className="font-inter w-[29.171rem] text-gra leading-5"
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
