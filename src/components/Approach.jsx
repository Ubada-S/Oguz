import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TeamProfileCard from "./other/TeamProfileCard";

gsap.registerPlugin(ScrollTrigger);

const Approach = () => {
  const sectionRef = useRef(null);
  const firstQuoteRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. Universal Entrance Animation ──
      // Targets anything with the 'reveal-anim' class
      const elements = sectionRef.current.querySelectorAll(".reveal-anim");

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 60,
            rotationX: 15,
            skewY: 6,
            filter: "blur(12px)",
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "power4.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
          },
        );
      });

      // ── 2. Parallax & Fade for the First Quote ──
      if (firstQuoteRef.current) {
        // Movement
        gsap.to(firstQuoteRef.current, {
          yPercent: 80,
          ease: "none",
          scrollTrigger: {
            trigger: firstQuoteRef.current,
            start: "top center",
            end: "bottom top",
            scrub: 0.3,
          },
        });

        // Fade out/Blur as it moves up
        gsap.to(firstQuoteRef.current, {
          opacity: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: firstQuoteRef.current,
            start: "top center",
            end: "top top",
            scrub: 0.3,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black pt-24 pb-20 lg:pt-32 lg:pb-32"
    >
      <div className="max-w-[1920px] mx-auto px-6 lg:px-16">
        {/* Headline Block */}
        <div className="grid grid-cols-1 lg:grid-cols-[theme(spacing.10)_1fr]">
          <div className="hidden lg:block" aria-hidden="true" />
          <div className="text-white text-[1.75rem] lg:text-[4rem] font-google tracking-tighter leading-[1.15] select-none">
            <p className="reveal-anim mb-1">
              <span className="inline-block text-[1rem] font-bold align-top mr-4 uppercase opacity-50">
                [Our Approach]
              </span>
              Traditional agencies perfected the art of the pitch. We perfected
              the art of the work. When you need design that moves, you need a
              different kind of studio.
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-10 lg:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-[theme(spacing.10)_auto_1fr] items-start">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="shrink-0">
              <TeamProfileCard />
            </div>

            <div className="text-white tracking-tighter font-google mt-10 lg:mt-0 lg:pl-[5.5rem] flex flex-col gap-10 lg:gap-16">
              {/* The Parallax Quote (Now standard HTML) */}
              <div ref={firstQuoteRef} className="hidden lg:block">
                <p className="reveal-anim w-full max-w-[40rem] text-[2rem] leading-[1.2]">
                  After years in traditional agencies, I saw the same problems
                  repeatedly. Talented designers spending more time in meetings
                  than creating. Clients paying for process instead of progress.
                </p>
              </div>

              {/* Bottom Paragraphs */}
              <div className="flex flex-col sm:flex-row gap-8 lg:gap-24">
                <div className="w-full sm:max-w-[22rem] lg:w-[29rem]">
                  <p className="reveal-anim font-inter text-gra leading-[1.4] text-sm lg:text-base">
                    So I built Oguz differently. No endless meetings, no office
                    politics, no pitches that promise everything. Just talented
                    designers doing what they do best.
                  </p>
                </div>
                <div className="w-full sm:max-w-[22rem] lg:w-[29rem]">
                  <p className="reveal-anim font-inter text-gra leading-[1.4] text-sm lg:text-base">
                    We create design that actually solves problems. We're
                    obsessive about the details because that's what our clients
                    pay us for. To care as much as they do.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Approach;
