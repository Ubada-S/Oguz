import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const ScrollTextAnimation = () => {
  const containerRef = useRef(null);
  const smallTextRef = useRef(null);

  useLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const tickerFunction = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFunction);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const scrolling = document.querySelector(".scrolling");
      const firstTexts = document.querySelectorAll(".primary-text");
      const lastTexts = document.querySelectorAll(".secondary-text");
      const dividers = document.querySelectorAll(".divider");
      const smallText = smallTextRef.current;
      const staticWord = document.querySelector(".static-word");

      const yPercent = 105;
      const isMobile = window.innerWidth < 768;

      // Initial states - hide secondary text completely at start
      gsap.set(lastTexts, { yPercent: yPercent, opacity: 0 });
      gsap.set(firstTexts, { yPercent: 0, opacity: 1 });
      gsap.set(dividers, { scaleX: 0 });
      if (!isMobile) gsap.set(smallText, { opacity: 0, y: 50 });

      ScrollTrigger.create({
        trigger: scrolling,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1.5, // Smoothing factor
        onUpdate: (self) => {
          const progress = self.progress;
          const isMobile = window.innerWidth < 768;

          // Phase 1: Text swap (0% - 40%)
          if (progress <= 0.4) {
            const textProgress = progress / 0.4;
            const eased = gsap.parseEase("power2.inOut")(textProgress);

            gsap.set(firstTexts, {
              yPercent: -eased * yPercent,
              opacity: 1 - eased,
            });
            gsap.set(lastTexts, {
              yPercent: yPercent - eased * yPercent,
              opacity: eased,
            });

            // Fade static word during transition
            gsap.set(staticWord, { opacity: 1 - eased * 0.3 });
          } else {
            gsap.set(firstTexts, { yPercent: -yPercent, opacity: 0 });
            gsap.set(lastTexts, { yPercent: 0, opacity: 1 });
            gsap.set(staticWord, { opacity: 0.7 });
          }

          // Phase 2: Divider expansion (40% - 60%)
          if (progress >= 0.4 && progress <= 0.6) {
            const dividerProgress = (progress - 0.4) / 0.2;
            const easedDivider = gsap.parseEase("power3.out")(dividerProgress);
            gsap.set(dividers, { scaleX: easedDivider });
          } else if (progress > 0.6) {
            gsap.set(dividers, { scaleX: 1 });
          }

          // Phase 3: Paragraph reveal (starts immediately with scroll, 0% - 70%)
          if (!isMobile) {
            if (progress <= 0.7) {
              const paraProgress = progress / 0.7;
              const easedPara = gsap.parseEase("power2.out")(paraProgress);

              gsap.set(smallText, {
                opacity: easedPara,
                y: 50 - easedPara * 50,
              });
            } else {
              gsap.set(smallText, { opacity: 1, y: 0 });
            }
          }

          // Subtle scale effect on the whole container
          const scaleAmount = 1 - Math.abs(progress - 0.5) * 0.02;
          gsap.set(scrolling.querySelector(".content-wrapper"), {
            scale: scaleAmount,
          });
        },
      });
    }, containerRef);

    return () => {
      gsap.ticker.remove(tickerFunction);
      lenis.destroy();
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-black text-[#f5f4ed] font-google relative"
    >
      {/* Animated noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
          animation: "grain 8s steps(10) infinite",
        }}
      />

      {/* Additional paper texture layer */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' /%3E%3CfeColorMatrix values='0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -1.5 1.5' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1' /%3E%3C/svg%3E")`,
        }}
      />

      {/* Subtle gradient vignette - increased opacity */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      <style jsx>{`
        @keyframes grain {
          0%,
          100% {
            transform: translate(0, 0);
          }
          10% {
            transform: translate(-5%, -10%);
          }
          20% {
            transform: translate(-15%, 5%);
          }
          30% {
            transform: translate(7%, -25%);
          }
          40% {
            transform: translate(-5%, 25%);
          }
          50% {
            transform: translate(-15%, 10%);
          }
          60% {
            transform: translate(15%, 0%);
          }
          70% {
            transform: translate(0%, 15%);
          }
          80% {
            transform: translate(3%, 35%);
          }
          90% {
            transform: translate(-10%, 10%);
          }
        }
      `}</style>

      {/* Scrolling Animation Section */}
      <section className="scrolling w-full h-[100vh] flex items-center overflow-hidden relative z-10">
        <div className="content-wrapper w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">
            {/* Big Text: Left 65% on Desktop */}
            <div className="w-full md:w-[65%] text-[clamp(4rem,12vw,10rem)] leading-[0.85] flex flex-col uppercase font-bold tracking-tight">
              {/* Line 1: Rational -> Emotion */}
              <div className="overflow-hidden relative h-[1em] mb-2">
                <span className="primary-text block will-change-transform">
                  Rational
                </span>
                <span className="secondary-text block absolute top-0 left-0 will-change-transform">
                  Emotion
                </span>
              </div>

              {/* Line 2: buys (static) */}
              <div className="static-word self-end md:mr-12 mb-2 opacity-70 will-change-transform">
                buys
              </div>

              {/* Line 3: cheap -> value */}
              <div className="overflow-hidden relative h-[1em] self-start">
                <span className="primary-text block will-change-transform">
                  cheap
                </span>
                <span className="secondary-text block absolute top-0 left-0 will-change-transform">
                  value
                </span>

                {/* Dual dividers for depth - both flowing left to right */}
                <div className="divider absolute left-0 bottom-1 w-full h-[3px] md:h-[5px] bg-gradient-to-r from-transparent via-[#f5f4ed] to-transparent origin-left scale-x-0 will-change-transform" />
                <div className="divider absolute left-0 bottom-0 w-full h-[1px] md:h-[2px] bg-gradient-to-r from-transparent via-[#f5f4ed]/40 to-transparent origin-left scale-x-0 will-change-transform" />
              </div>
            </div>

            {/* Small Text: Right 30% on Desktop */}
            <div
              ref={smallTextRef}
              className="w-full md:w-[30%] text-base md:text-lg lg:text-xl leading-relaxed md:mt-24 lg:mt-32 will-change-transform"
            >
              <p className="indent-10 text-[#f5f4ed]/80 font-light">
                We bring B2C creativity into the deepest corners of B2B. Because
                stronger brands can charge more, grow faster and get the best
                out of their people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Outro */}
      <section className="w-full h-[100dvh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl opacity-20 uppercase tracking-wider">
            Scroll Back Up
          </h2>
          <div className="flex gap-2 justify-center">
            <span className="w-1 h-1 rounded-full bg-[#f5f4ed]/20 animate-pulse" />
            <span className="w-1 h-1 rounded-full bg-[#f5f4ed]/20 animate-pulse delay-100" />
            <span className="w-1 h-1 rounded-full bg-[#f5f4ed]/20 animate-pulse delay-200" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollTextAnimation;
