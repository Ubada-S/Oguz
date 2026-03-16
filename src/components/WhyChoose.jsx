import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "./ui/globe";

gsap.registerPlugin(ScrollTrigger);

const BAR_HEIGHTS = [
  0.08, 0.1, 0.09, 0.13, 0.12, 0.15, 0.14, 0.18, 0.17, 0.2, 0.22, 0.21, 0.25,
  0.24, 0.28, 0.3, 0.29, 0.34, 0.36, 0.38, 0.4, 0.43, 0.46, 0.5, 0.54, 0.58,
  0.63, 0.7, 0.8,
];

const CHAT_MESSAGES = [
  { from: "client", text: "Hey, any update on the designs?" },
  { from: "us", text: "Just sent them over — Notion link in thread 👆" },
  { from: "client", text: "That was... fast. Looks great 🔥" },
];

const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const barsRef = useRef([]);
  const arcRef = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.from(".reveal-item", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });

      if (barsRef.current.length) {
        tl.fromTo(
          barsRef.current,
          { scaleY: 0, transformOrigin: "bottom" },
          {
            scaleY: 1,
            duration: 1.2,
            stagger: 0.04,
            ease: "elastic.out(1, 0.6)",
          },
          "-=0.6",
        );
      }

      const heroEls = sectionRef.current?.querySelectorAll(".hero-anim");
      heroEls?.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 68,
            rotationX: 18,
            skewY: 4,
            filter: "blur(7px)",
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            delay: 0.08 + i * 0.09,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      });

      // Arc animation
      if (arcRef.current) {
        const radius = 54;
        const circumference = 2 * Math.PI * radius;
        const target = circumference * (1 - 0.98);

        gsap.fromTo(
          arcRef.current,
          { strokeDashoffset: circumference },
          {
            strokeDashoffset: target,
            duration: 1.6,
            ease: "power3.out",
            delay: 0.5,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              toggleActions: "play none none none",
              once: true,
            },
          },
        );
      }

      // Count-up 0 → 98
      if (countRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 98,
          duration: 1.6,
          ease: "power3.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            toggleActions: "play none none none",
            once: true,
          },
          onUpdate: () => {
            if (countRef.current)
              countRef.current.textContent = Math.round(obj.val) + "%";
          },
        });
      }

      // Chat bubbles
      gsap.fromTo(
        ".chat-bubble",
        { opacity: 0, y: 16, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.28,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white border-t border-white/20 overflow-hidden min-h-[900px]"
    >
      <div className="max-w-[1920px] mx-auto px-7 lg:px-20">
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <div className="border-b border-white/10 py-20 lg:py-32 reveal-item">
          <div className="text-sm lg:text-base font-google mb-8 text-white/80">
            [02] Why choose us
          </div>

          <h2 className="hero-anim text-4xl lg:text-6xl xl:text-7xl font-google tracking-tighter mb-6">
            We deliver more than design.
            <br />
            We deliver momentum.
          </h2>

          <p className="hero-anim text-base lg:text-lg text-gray-400 max-w-2xl leading-relaxed">
            Great design accelerates everything. It shortens sales cycles,
            increases conversions, and builds trust before you say a word.
          </p>
        </div>

        {/* ── BENTO GRID ────────────────────────────────────────────────── */}
        <div
          className="grid gap-2.5 py-10 grid-cols-1 lg:grid-cols-[1.7fr_1fr_1.7fr]"
          style={{ gridTemplateRows: "auto" }}
        >
          {/* LEFT — Graph card */}
          <div
            className="reveal-item relative border border-white/20 bg-[#000000] min-w-0 p-6 flex flex-col justify-between overflow-hidden
               lg:col-[1] lg:row-[1/3]"
          >
            <div className="flex-1 flex flex-col justify-end mt-3">
              <div className="flex items-end gap-[3px] h-[180px] w-full px-0.5 pr-6">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    ref={(el) => (barsRef.current[i] = el)}
                    className="flex-1 transition-colors duration-150 border m-1 bg-white border-white/40"
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>

              <div className="flex justify-between mt-2 px-0.5">
                {["2024", "mid-2024", "2025", "mid-2025", "2026"].map(
                  (year) => (
                    <span key={year} className="text-[9px] text-gray-600">
                      {year}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-5 pt-5 border-t border-white/10">
              <p className="text-4xl font-bold text-white mb-1 tracking-tight">
                2 +
              </p>
              <p className="text-sm text-gray-400">years of consistency.</p>
            </div>
          </div>

          {/* MIDDLE TOP — Satisfaction gauge */}
          <div
            className="relative border border-white/20 overflow-hidden lg:col-[2] lg:row-[1] flex flex-col items-center justify-center gap-4 bg-[#000000]"
            style={{ height: "200px" }}
          >
            <svg width="130" height="130" viewBox="0 0 130 130">
              <circle
                cx="65"
                cy="65"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth="6"
              />
              <circle
                ref={arcRef}
                cx="65"
                cy="65"
                r="54"
                fill="none"
                stroke="white"
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 54}
                strokeDashoffset={2 * Math.PI * 54}
                transform="rotate(-90 65 65)"
              />
              <text
                ref={countRef}
                x="65"
                y="65"
                textAnchor="middle"
                dominantBaseline="central"
                fill="white"
                fontSize="22"
                fontWeight="700"
                fontFamily="inherit"
              >
                0%
              </text>
            </svg>
            <p className="text-[11px] text-gray-500 tracking-widest uppercase absolute bottom-5">
              Client satisfaction
            </p>
          </div>

          {/* MIDDLE BOTTOM — Async chat */}
          <div
            className="relative border border-white/20 overflow-hidden lg:col-[2] lg:row-[2] flex flex-col justify-center px-5 gap-2.5 bg-[#000000]"
            style={{ height: "200px" }}
          >
            {CHAT_MESSAGES.map((msg, i) => (
              <div
                key={i}
                className={`chat-bubble flex ${msg.from === "us" ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`text-[11px] px-3 py-1.5 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.from === "us"
                      ? "bg-white text-black"
                      : "bg-white/8 text-white/70 border border-white/10"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <p className="text-[9px] text-white/20 tracking-widest uppercase absolute bottom-3 left-5">
              Async · Always on
            </p>
          </div>

          {/* RIGHT — Globe */}
          <div
            className="reveal-item relative border rounded-lg overflow-hidden bg-[#080808] border-white/20
               lg:col-[3] lg:row-[1/3]"
            style={{ height: "410px" }}
          >
            <div className="absolute inset-0 z-0 opacity-60">
              <Globe />
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[58%] bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent pointer-events-none z-10" />

            <div className="absolute bottom-0 left-0 right-0 z-20 p-7 mix-blend-difference">
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-white block mb-3">
                [ Global · Async-first ]
              </span>

              <p className="text-sm text-white leading-relaxed max-w-[300px] mb-5">
                We work across time zones with a fully async-first workflow.
                Notion, Slack, and Loom keep us aligned.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Mumbai", "New York", "London", "Tokyo"].map((city) => (
                  <span
                    key={city}
                    className="border border-white/20 px-3 py-1 text-[10px] font-mono text-white/50 rounded-sm tracking-wider
                       transition-colors duration-200 hover:border-white/40 hover:text-white/80"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM ROW — Feature text ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 border-t border-white/10 py-16 reveal-item">
          <div>
            <h3 className="text-3xl lg:text-4xl font-bold mb-2 leading-tight tracking-tighter">
              Fast to launch.
              <br />
              Easy to scale.
            </h3>
          </div>

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

          <div />
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
