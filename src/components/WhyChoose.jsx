import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollMarquee from "./ui/Scroll-Marquee";

gsap.registerPlugin(ScrollTrigger);

const BAR_HEIGHTS = [
  0.08, 0.1, 0.09, 0.13, 0.12, 0.15, 0.14, 0.18, 0.17, 0.2, 0.22, 0.21, 0.25,
  0.24, 0.28, 0.3, 0.29, 0.34, 0.36, 0.38, 0.4, 0.43, 0.46, 0.5, 0.54, 0.58,
  0.63, 0.7, 0.8, 0.92,
];

const WhyChooseUs = () => {
  const barsRef = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!barsRef.current.length) return;

    gsap.fromTo(
      barsRef.current,
      { scaleY: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 1.2,
        stagger: 0.04,
        ease: "elastic.out(1, 0.6)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
      },
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-[900px]  bg-black border-t  border-white/20 text-white py-20 lg:py-32"
    >
      <div className="max-w-[1920px]  mx-auto px-7 lg:px-20">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <div className="text-sm lg:text-base font-google mb-8 text-white/80">
            [02] Why choose us
          </div>

          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-google tracking-tighter mb-6">
            We deliver more than design.
            <br />
            We deliver momentum.
          </h2>

          <p className="text-base lg:text-lg text-gray-400 max-w-2xl leading-relaxed">
            Great design accelerates everything. It shortens sales cycles,
            increases conversions, and builds trust before you say a word.
          </p>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Fast to launch */}
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight">
              Fast to launch.
              <br />
              Easy to scale.
            </h3>
          </div>

          {/* Speed without sacrifice */}
          <div>
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-6">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <h3 className="text-xl lg:text-2xl font-bold mb-4">
              Speed without sacrifice
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              We ship in days, not months. Our streamlined process cuts through
              agency theater while maintaining craft.
            </p>
          </div>

          {/* Flexible engagement */}
          <div>
            <div className="w-10 h-10 border border-white/20 flex items-center justify-center mb-6">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>

            <h3 className="text-xl lg:text-2xl font-bold mb-4">
              Flexible engagement
            </h3>

            <p className="text-sm text-gray-400 leading-relaxed">
              Choose retainers or project-based work. Scale as you grow.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-[#111] border border-white/10 lg:bottom-32 rounded-md p-6 flex flex-col justify-between overflow-hidden relative min-h-[260px]">
            {/* Bars */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-end gap-[3px] h-40 w-full px-1">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    ref={(el) => (barsRef.current[i] = el)}
                    className="flex-1 bg-white/70 rounded-t-[1px]"
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-2 px-1">
                {["2024", "mid-2024", "2025", "mid-2025", "2026"].map(
                  (year) => (
                    <span key={year} className="text-xs text-gray-500">
                      {year}
                    </span>
                  ),
                )}
              </div>
            </div>

            {/* Bottom text */}
            <div className="mt-6">
              <p className="text-4xl font-bold text-white mb-1 tracking-tight">
                2 +
              </p>
              <p className="text-sm text-gray-400">years of consistency.</p>
            </div>
          </div>
        </div>
      </div>
      {/* <ScrollMarquee speed={0.02} className="bg-black -mt-32" /> */}
    </section>
  );
};

export default WhyChooseUs;
