import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

const Preloader = () => {
  const [done, setDone] = useState(false);
  const counterRef = useRef(null);
  const lineRef = useRef(null);
  const brandRef = useRef(null);
  const tagRefs = useRef([]);
  const panelRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create("hop", "0.8, 0, 0.2, 1");
    CustomEase.create("reveal", "0.77, 0, 0.175, 1");

    const tl = gsap.timeline();
    const counter = { val: 0 };

    tl.to(counterRef.current, { opacity: 1, duration: 0.4, ease: "none" }, 0)

      .to(
        counter,
        {
          val: 100,
          duration: 2.8,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = Math.round(counter.val)
                .toString()
                .padStart(3, "0");
            }
          },
        },
        0,
      )

      .to(
        lineRef.current,
        { scaleX: 1, duration: 2.8, ease: "power2.inOut" },
        0,
      )

      .to(
        tagRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: "power3.out",
        },
        0.4,
      )

      .to(
        brandRef.current,
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power3.out",
        },
        1.8,
      )

      .to(
        tagRefs.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.in",
        },
        3.4,
      )

      .to(counterRef.current, { opacity: 0, duration: 0.4, ease: "none" }, 3.4)

      .to(
        lineRef.current,
        {
          scaleX: 0,
          transformOrigin: "right center",
          duration: 0.6,
          ease: "power3.in",
        },
        3.4,
      )

      .to(
        panelRef.current,
        {
          yPercent: -100,
          duration: 1,
          ease: "hop",
          onComplete: () => setDone(true),
        },
        4,
      );

    return () => tl.kill();
  }, []);

  if (done) return null;

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 w-screen h-screen bg-[black] z-[9999] flex flex-col justify-between p-7 lg:p-12 overflow-hidden"
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          ref={(el) => (tagRefs.current[0] = el)}
          className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          Design Studio
        </span>
        <span
          ref={(el) => (tagRefs.current[1] = el)}
          className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          Est. 2024
        </span>
      </div>

      {/* Center */}
      <div className="flex flex-col items-center gap-8">
        <div className="overflow-hidden">
          <h1
            ref={brandRef}
            className="text-white text-[3rem] lg:text-[8rem] font-semibold tracking-tighter leading-none uppercase"
            style={{
              opacity: 0,
              transform: "translateY(52px)",
              filter: "blur(7px)",
            }}
          >
            Oguz Studio
          </h1>
        </div>

        {/* Progress line */}
        <div className="w-full max-w-[600px] h-[1px] bg-white/10 relative">
          <div
            ref={lineRef}
            className="absolute inset-0 bg-white"
            style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          />
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-end justify-between">
        <span
          ref={(el) => (tagRefs.current[2] = el)}
          className="text-white/40 text-[11px] uppercase tracking-[0.2em] font-medium"
          style={{ opacity: 0, transform: "translateY(12px)" }}
        >
          Mumbai · Worldwide
        </span>
        <span
          ref={counterRef}
          className="text-white/40 text-[11px] font-mono tracking-widest"
          style={{ opacity: 0 }}
        >
          000
        </span>
      </div>
    </div>
  );
};

export default Preloader;
