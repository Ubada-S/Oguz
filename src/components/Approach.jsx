import React from "react";
import TeamProfileCard from "./other/TeamProfileCard";

const Approach = () => {
  return (
    <section className="relative min-h-[1100px] border-b border-white/10 bg-black">
      <div className="max-w-[1920px] mx-auto">
        <div className="px-6 pt-32">
          {/* Your content goes here */}
          <div className="relative lg:pl-10 ">
            <h2 className="text-white text-[0.8rem] lg:text-[1rem] absolute font-bold select-none">
              [Our Approach]
            </h2>

            <div className="overflow-hidden text-pretty text-gra text-[2rem] lg:text-[4rem] font-google tracking-tighter leading-[37px] lg:leading-[60px] select-none">
              <p className=" lg:ml-[4.5rem]">
                <span className="ml-[7rem]">Traditional</span>{" "}
                <br className="lg:hidden" /> agencies perfected the art of the
                pitch. <span className="text-white">We</span>
              </p>
              <p>
                <span className="text-white">
                  perfected the art of the work.{" "}
                </span>{" "}
                When you need <span className="text-white">design that </span>
              </p>
              <p>
                <span className="text-white">
                  moves at the speed of your ambition,
                </span>{" "}
                you need a different kind of studio.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-8 mt-10 lg:ml-10 lg:mt-32">
            <TeamProfileCard />
            <div className="text-white overflow-hidden text-pretty tracking-tighter leading-[37px] font-google hidden lg:flex lg:flex-col lg:gap-16 ml-[9.5rem] -mt-1">
              <h2 className="w-[40rem] h-[12.188rem] text-[2rem]">
                After years in traditional agencies, I saw the same problems
                repeatedly. Talented designers spending more time in meetings
                than creating. Clients paying for process instead of progress.
                Great ideas dying in revision purgatory.
              </h2>
              <div className="flex flex-row gap-32">
                <h3 className="font-inter w-[29.171rem] text-gra leading-5">
                  So I built Oguz differently. No endless meetings, no office
                  politics, no pitches that promise everything. Just talented
                  designers doing what they do best.
                </h3>
                <h3 className="font-inter w-[29.171rem] text-gra leading-5">
                  We create design that actually solves problems. We're
                  obsessive about the details because that's what our clients
                  pay us for. To care as much as they do.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
