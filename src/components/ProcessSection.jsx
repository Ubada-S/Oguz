import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Noise from "./other/noise";

gsap.registerPlugin(ScrollTrigger);

// ─── Process Data ─────────────────────────────────────────────────────────────
const processSteps = [
  {
    id: 1,
    index: "01",
    title: "Listen & Learn",
    description:
      "Every engagement starts with understanding. We dive deep into your business, your challenges, and where you want to go. No assumptions, just questions that matter.",
  },
  {
    id: 2,
    index: "02",
    title: "Strategy & Scope",
    description:
      "We map out the terrain before we build. Clear milestones, realistic timelines, and a strategy that aligns with your goals — no fluff, just a solid plan.",
  },
  {
    id: 3,
    index: "03",
    title: "Design & Prototype",
    description:
      "Ideas take shape quickly. We design iteratively, sharing prototypes early so you can see, feel, and refine before a single line of production code is written.",
  },
  {
    id: 4,
    index: "04",
    title: "Build & Refine",
    description:
      "Pixel-perfect execution with clean, scalable code. We build in sprints, delivering working features fast and incorporating your feedback at every turn.",
  },
  {
    id: 5,
    index: "05",
    title: "Launch & Learn",
    description:
      "We stick around for implementation and measure what matters. Every project teaches us something that makes the next one better.",
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/70"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <polyline points="9 16 10.5 14 12 16 14.5 14 16 16" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white/70"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16.5 14.5" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────
const ProcessSection = () => {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const contentRefs = useRef([]);
  const numberRefs = useRef([]);
  const dividerRefs = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileScrollRef = useRef(null);
  const scrollThumbRef = useRef(null);

  const activeCardRef = useRef(4);
  const [activeCard, setActiveCard] = useState(4);

  // ── Mobile scroll thumb ───────────────────────────────────────────────────
  useEffect(() => {
    const track = mobileScrollRef.current;
    const thumb = scrollThumbRef.current;
    if (!track || !thumb) return;
    const update = () => {
      const { scrollLeft, scrollWidth, clientWidth } = track;
      const ratio = scrollLeft / (scrollWidth - clientWidth);
      const thumbW = (clientWidth / scrollWidth) * 100;
      thumb.style.width = `${thumbW}%`;
      thumb.style.left = `${ratio * (100 - thumbW)}%`;
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    return () => track.removeEventListener("scroll", update);
  }, []);

  // ── Activate a card on hover (desktop) ───────────────────────────────────
  const activateCard = useCallback((index) => {
    if (index === activeCardRef.current) return;

    // Interrupt any currently playing animations for a snappy response
    gsap.killTweensOf(cardRefs.current);
    gsap.killTweensOf(contentRefs.current);
    gsap.killTweensOf(dividerRefs.current);

    const prev = activeCardRef.current;
    activeCardRef.current = index;
    setActiveCard(index);

    // Expand/Collapse cards smoothly
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.to(card, {
        flexBasis: i === index ? "420px" : "0%",
        flexGrow: i === index ? 0 : 1,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true,
      });
    });

    // Fade out previous content quickly
    if (contentRefs.current[prev]) {
      gsap.to(contentRefs.current[prev], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    }

    // Shrink and fade out previous divider
    if (dividerRefs.current[prev]) {
      gsap.to(dividerRefs.current[prev], {
        scaleX: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
        transformOrigin: "left center",
      });
    }

    // Fade in new content with slight upward float
    if (contentRefs.current[index]) {
      gsap.fromTo(
        contentRefs.current[index],
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          delay: 0.2, // waits just a beat for the card to start expanding
          overwrite: true,
        },
      );
    }

    // Premium left-to-right dashed line wipe
    if (dividerRefs.current[index]) {
      gsap.fromTo(
        dividerRefs.current[index],
        { scaleX: 0, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.3,
          overwrite: true,
          transformOrigin: "left center",
        },
      );
    }
  }, []);

  // ── GSAP setup ────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ────────────────────────────────────────────────────────
      mm.add("(min-width: 1024px)", () => {
        cardRefs.current.forEach((card, i) => {
          if (!card) return;
          gsap.set(card, {
            flexBasis: i === activeCardRef.current ? "420px" : "0%",
            flexGrow: i === activeCardRef.current ? 0 : 1,
          });
        });

        contentRefs.current.forEach((content, i) => {
          if (!content) return;
          gsap.set(content, {
            opacity: i === activeCardRef.current ? 1 : 0,
            y: 0,
          });
        });

        dividerRefs.current.forEach((div, i) => {
          if (!div) return;
          gsap.set(div, {
            scaleX: i === activeCardRef.current ? 1 : 0,
            opacity: i === activeCardRef.current ? 1 : 0,
            transformOrigin: "left center",
          });
        });

        // Entrance animation
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              sectionRef.current.querySelectorAll(".process-anim-header"),
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
              },
            );
            gsap.fromTo(
              sectionRef.current.querySelectorAll(".process-info-block"),
              { opacity: 0, y: 25 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.15,
                delay: 0.2,
              },
            );
            cardRefs.current.forEach((card, i) => {
              if (!card) return;
              gsap.fromTo(
                card,
                { opacity: 0, y: 40 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.7,
                  ease: "power3.out",
                  delay: 0.3 + i * 0.08,
                },
              );
            });
          },
        });
      });

      // ── MOBILE ─────────────────────────────────────────────────────────
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          sectionRef.current?.querySelectorAll(".process-anim-header"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
        sectionRef.current
          ?.querySelectorAll(".process-info-block")
          .forEach((block) => {
            gsap.fromTo(
              block,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: block,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
          });
        mobileCardsRef.current.forEach((card) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white border-t border-white/25"
    >
      <Noise className="z-0" />
      <div className="max-w-[1920px] mx-auto z-[999]">
        {/* ── DESKTOP LAYOUT ─────────────────────────────────────────────── */}
        <div className="hidden lg:block">
          <div className="px-7 lg:px-20 pt-12 lg:pt-24 pb-10 lg:pb-16">
            <div className="flex items-start gap-10">
              <p className="process-anim-header text-sm font-semibold text-white/60 pt-[6px] shrink-0">
                [04] Process
              </p>
              <div className="lg:ml-[240px] xl:ml-[320px]">
                <h2 className="process-anim-header text-[56px] xl:text-[68px] 2xl:text-[72px] font-semibold tracking-tight leading-[1.05] mb-6">
                  A proven process{" "}
                  <span className="text-neutral-500">
                    that
                    <br />
                    delivers results, not surprises.
                  </span>
                </h2>
                <p className="process-anim-header text-neutral-400 max-w-[420px] leading-relaxed text-[15px]">
                  We've refined our approach over hundreds of projects. Every
                  step is designed to minimize friction and maximize impact.
                  From first call to final delivery, you'll know exactly where
                  we are and where we're going.
                </p>
              </div>
            </div>
          </div>

          <div className="px-7 lg:px-20 pb-20 lg:pb-32">
            <div
              className="grid gap-10 xl:gap-14"
              style={{ gridTemplateColumns: "280px 1fr" }}
            >
              <div className="flex flex-col justify-center gap-14 pt-4">
                <div className="process-info-block space-y-3">
                  <CalendarIcon />
                  <h4 className="text-xl font-semibold">3-5 Days</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    To kick off after signing. No lengthy onboarding, just
                    straight to work.
                  </p>
                </div>
                <div className="process-info-block space-y-3">
                  <ClockIcon />
                  <h4 className="text-xl font-semibold">48 Hour</h4>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    turnaround on most requests. Complex projects broken into
                    manageable sprints.
                  </p>
                </div>
              </div>

              <div
                ref={cardsContainerRef}
                className="flex gap-3"
                style={{ height: "460px", contain: "layout" }}
              >
                {processSteps.map((step, i) => {
                  const isActive = i === activeCard;
                  return (
                    <div
                      key={step.id}
                      ref={(el) => (cardRefs.current[i] = el)}
                      className="relative bg-black border border-white/20 rounded-sm overflow-hidden cursor-pointer group"
                      style={{
                        willChange: "flex-basis",
                        minWidth: 0,
                      }}
                      onMouseEnter={() => activateCard(i)}
                    >
                      <div
                        ref={(el) => (numberRefs.current[i] = el)}
                        className={`absolute top-6 left-6 text-[48px] xl:text-[56px] font-semibold transition-colors duration-500 select-none ${
                          isActive ? "text-white/80" : "text-white/30"
                        }`}
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {step.index}
                      </div>

                      <div
                        ref={(el) => (contentRefs.current[i] = el)}
                        className="absolute bottom-0 left-0 p-6"
                        style={{
                          width: "420px", // Locks text layout so it NEVER wraps/reflows during resize
                          pointerEvents: isActive ? "auto" : "none",
                        }}
                      >
                        <h3 className="text-xl font-semibold mb-3 tracking-tight">
                          {step.title}
                        </h3>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
                          {step.description}
                        </p>
                        <div
                          ref={(el) => (dividerRefs.current[i] = el)}
                          className="w-full h-px border-t border-dashed border-white/30 mt-2"
                          style={{ transformOrigin: "left center" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE LAYOUT ──────────────────────────────────────────────── */}
        <div className="lg:hidden px-5 py-16">
          <p className="process-anim-header text-sm font-semibold text-white/60 mb-5">
            [04] Process
          </p>
          <h2 className="process-anim-header text-[36px] sm:text-[44px] font-semibold tracking-tight leading-[1.08] mb-5">
            A proven process{" "}
            <span className="text-neutral-500">
              that delivers results, not surprises.
            </span>
          </h2>
          <p className="process-anim-header text-sm text-neutral-400 leading-relaxed mb-12">
            We've refined our approach over hundreds of projects. Every step is
            designed to minimize friction and maximize impact. From first call
            to final delivery, you'll know exactly where we are and where we're
            going.
          </p>

          <div className="space-y-10 mb-14">
            <div className="process-info-block space-y-3">
              <CalendarIcon />
              <h4 className="text-xl font-semibold">3-5 Days</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                To kick off after signing. No lengthy onboarding, just straight
                to work.
              </p>
            </div>
            <div className="process-info-block space-y-3">
              <ClockIcon />
              <h4 className="text-xl font-semibold">48 Hour</h4>
              <p className="text-sm text-neutral-400 leading-relaxed">
                turnaround on most requests. Complex projects broken into
                manageable sprints.
              </p>
            </div>
          </div>

          <div
            ref={mobileScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {processSteps.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => (mobileCardsRef.current[i] = el)}
                className="shrink-0  w-[85vw] sm:w-[70vw] border border-white/20 rounded-sm p-6 bg-black snap-start"
                style={{ aspectRatio: "4/3" }}
              >
                <div className="flex flex-col justify-between h-full">
                  <span className="text-[48px] font-semibold text-white/80 leading-none">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="relative mt-3 overflow-hidden "
            style={{
              height: "16px",
              background: "black",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            <div
              ref={scrollThumbRef}
              className="absolute top-0 bottom-0 transition-[left] duration-75"
              style={{
                background: "rgba(255,255,255,0.7)",
                left: "0%",
                width: "20%",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
