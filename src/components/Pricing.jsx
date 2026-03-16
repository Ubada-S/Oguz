import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Noise from "./other/noise";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────
const plans = [
  {
    id: "basic",
    name: "Basic",
    monthlyPrice: 1500,
    yearlyPrice: 1200,
    unit: " /month",
    description:
      "Perfect for startups and growing brands looking for consistent design and marketing support.",
    features: [
      "Up to 20 design & marketing requests",
      "Brand, social & web design support",
      "Monthly strategy call",
      "Priority email support",
      "5-day turnaround per request",
      "Pause or cancel anytime",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    badge: "Popular",
    monthlyPrice: 2500,
    yearlyPrice: 2000,
    originalPrice: 3000,
    unit: " /month",
    description:
      "Ideal for established brands seeking dedicated creative partnership and full-scale marketing.",
    features: [
      "Unlimited design & marketing requests",
      "Dedicated project manager",
      "Bi-weekly strategy sessions",
      "Paid ads & campaign managements",
      "Priority turnaround & support",
      "Pause or cancel anytime",
    ],
    highlighted: true,
  },
  {
    id: "project",
    name: "Project-based",
    monthlyPrice: 3500,
    yearlyPrice: 3000,
    unit: " /project",
    description:
      "Best for one-time projects like branding, web design, or campaign launches.",
    features: [
      "Custom proposal & timeline",
      "End-to-end creative execution",
      "Strategy consultation",
      "Post-launch support",
      "Full ownership of deliverables",
      "Optional ongoing maintenance",
    ],
    highlighted: false,
  },
];

// ─── Check Icon ───────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    className="shrink-0 mt-0.5"
  >
    <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeOpacity="0.4" />
    <path
      d="M5 8.5L7 10.5L11 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ─── Arrow Icon ───────────────────────────────────────────────────────────────
const ArrowIcon = ({ refEl }) => (
  <span
    ref={refEl}
    className="w-10 h-10 shrink-0 border border-white/30 flex items-center justify-center"
    style={{ display: "inline-flex" }}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="arrow-svg"
    >
      <path
        d="M2 12L12 2M12 2H5M12 2V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

// ─── Toggle (iOS Style for B&W Aesthetic) ─────────────────────────────────────
const Toggle = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-7 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
      checked ? "bg-white" : "bg-[#39393D]"
    }`}
  >
    <span
      className={`absolute top-[2px] left-[2px] w-[24px] h-[24px] rounded-full shadow-md transition-transform duration-200 ease-in-out ${
        checked ? "translate-x-[16px] bg-black" : "translate-x-0 bg-white"
      }`}
    />
  </button>
);

// ─── Animated Price ───────────────────────────────────────────────────────────
const AnimatedPrice = ({ plan, yearly }) => {
  const containerRef = useRef(null);
  const currentRef = useRef(null);
  const prevRef = useRef(null);
  const isFirstRender = useRef(true);

  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (plan.id !== "premium") return;

    const curr = currentRef.current;
    const prev = prevRef.current;
    if (!curr || !prev) return;

    const tl = gsap.timeline();
    tl.to(
      prev,
      { y: -40, opacity: 0, duration: 0.45, ease: "power3.out" },
      0,
    ).fromTo(
      curr,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
      0,
    );
  }, [yearly, plan.id]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{ height: "3rem" }}
    >
      <div ref={prevRef} className="absolute inset-0 flex items-end">
        <span className="text-[42px] font-semibold tracking-tight leading-none">
          $
          {yearly
            ? plan.monthlyPrice.toLocaleString()
            : plan.yearlyPrice.toLocaleString()}
        </span>
      </div>
      <div ref={currentRef} className="absolute inset-0 flex items-end">
        <span className="text-[42px] font-semibold tracking-tight leading-none">
          ${price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
const PricingCard = ({ plan, yearly, cardRef, onToggle }) => {
  const innerRef = useRef(null);
  const btnRef = useRef(null);
  const arrowRef = useRef(null);

  const handleEnter = useCallback(() => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current.querySelector(".arrow-svg"), {
      rotate: 45,
      x: 2,
      y: -2,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(btnRef.current, {
      backgroundColor: "#ffffff",
      color: "#000000",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      backgroundColor: "rgba(0,0,0,0.15)",
      borderColor: "rgba(0,0,0,0.3)",
      duration: 0.3,
    });
  }, []);

  const handleLeave = useCallback(() => {
    if (!arrowRef.current) return;
    gsap.to(arrowRef.current.querySelector(".arrow-svg"), {
      rotate: 0,
      x: 0,
      y: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(btnRef.current, {
      backgroundColor: "#000000",
      color: "#ffffff",
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(arrowRef.current, {
      backgroundColor: "transparent",
      borderColor: "rgba(255,255,255,0.3)",
      duration: 0.3,
    });
  }, []);

  const handleCardEnter = useCallback(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      y: -2,
      borderColor: plan.highlighted
        ? "rgba(255,255,255,0.7)"
        : "rgba(255,255,255,0.4)",
      duration: 0.2,
      ease: "power2.out",
    });
  }, [plan.highlighted]);

  const handleCardLeave = useCallback(() => {
    if (!innerRef.current) return;
    gsap.to(innerRef.current, {
      y: 0,
      borderColor: plan.highlighted
        ? "rgba(255,255,255,0.4)"
        : "rgba(255,255,255,0.2)",
      duration: 0.2,
      ease: "power2.out",
    });
  }, [plan.highlighted]);

  return (
    <div
      ref={(el) => {
        innerRef.current = el;
        if (typeof cardRef === "function") cardRef(el);
      }}
      onMouseEnter={handleCardEnter}
      onMouseLeave={handleCardLeave}
      className={`relative flex flex-col bg-black p-8 ${
        plan.highlighted
          ? "border border-dashed border-white/40"
          : "border border-white/20"
      }`}
    >
      {/* Plan name row */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-white">
            {plan.name}
          </span>
          {plan.badge && (
            <span className="text-xs text-white/50 font-normal border border-white/20 px-2 py-0.5">
              {plan.badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Toggle checked={yearly} onChange={onToggle} />
          <span className="text-xs text-white/50">Yearly</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-2">
        {plan.originalPrice && (
          <span className="text-sm text-white/30 line-through mr-2">
            ${plan.originalPrice.toLocaleString()}
          </span>
        )}
        <div
          className="flex items-end gap-2 overflow-hidden"
          style={{ height: "52px" }}
        >
          <PriceNumber plan={plan} yearly={yearly} />
          <span className="text-sm text-white/40 ml-2 mb-1.5">{plan.unit}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/50 leading-relaxed mb-6">
        {plan.description}
      </p>

      {/* Divider */}
      <div className="w-full h-px border-t border-dashed border-white/15 mb-6" />

      {/* Features */}
      <div className="mb-auto">
        <p className="text-xs text-white/40 uppercase tracking-widest mb-4">
          What's included:
        </p>
        <ul className="space-y-3">
          {plan.features.map((f) => (
            <li
              key={f}
              className="feature-item flex items-start gap-3 text-sm text-white/70"
            >
              <CheckIcon />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="w-full h-px border-t border-dashed border-white/15 mt-6 mb-6" />

      {/* Button */}
      <button
        ref={btnRef}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="flex items-center justify-between w-full px-5 py-3 bg-black border border-white/30 text-white text-sm font-medium cursor-pointer"
        style={{ outline: "none" }}
      >
        <span>Book an appointment</span>
        <ArrowIcon refEl={arrowRef} />
      </button>
    </div>
  );
};

// ─── Price Number (with GSAP flip animation) ──────────────────────────────────
const PriceNumber = ({ plan, yearly }) => {
  const wrapRef = useRef(null);
  const currRef = useRef(null);
  const prevRef = useRef(null);
  const initiated = useRef(false);
  const prevYearly = useRef(yearly);

  const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
  const prevPrice = yearly ? plan.monthlyPrice : plan.yearlyPrice;

  // ── INITIAL STATE FIX ─────────────────────────
  useEffect(() => {
    if (!currRef.current || !prevRef.current) return;

    gsap.set(currRef.current, { y: 0, opacity: 1 });
    gsap.set(prevRef.current, { y: 0, opacity: 0 }); // hide prev initially
  }, []);

  // ── TOGGLE ANIMATION ─────────────────────────
  useEffect(() => {
    if (!initiated.current) {
      initiated.current = true;
      return;
    }

    if (prevYearly.current === yearly) return;
    prevYearly.current = yearly;

    const curr = currRef.current;
    const prev = prevRef.current;
    if (!curr || !prev) return;

    const tl = gsap.timeline();

    tl.to(
      prev,
      {
        y: -44,
        opacity: 0,
        duration: 0.45,
        ease: "power3.out",
      },
      0,
    )

      .fromTo(
        curr,
        { y: 44, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        0,
      );
  }, [yearly]);

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ height: "52px", minWidth: "120px" }}
    >
      {/* Previous price */}
      <div ref={prevRef} className="absolute inset-0 flex items-end">
        <span className="text-[42px] font-semibold tracking-tight leading-none text-white">
          ${prevPrice.toLocaleString()}
        </span>
      </div>

      {/* Current price */}
      <div ref={currRef} className="absolute inset-0 flex items-end">
        <span className="text-[42px] font-semibold tracking-tight leading-none text-white">
          ${price.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
// ─── Main Component ───────────────────────────────────────────────────────────
const PricingSection = () => {
  const sectionRef = useRef(null);
  const rect1Ref = useRef(null);
  const rect2Ref = useRef(null);
  const rect3Ref = useRef(null);
  const headerRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const cardRefs = useRef([]);

  // individual toggle states
  const [yearlyStates, setYearlyStates] = useState({
    basic: false,
    premium: false,
    project: false,
  });

  // toggle single card
  const handleCardToggle = useCallback((id, value) => {
    setYearlyStates((prev) => ({
      ...prev,
      [id]: value,
    }));
  }, []);

  // bottom toggle controls ALL cards
  const handleGlobalToggle = useCallback((val) => {
    setYearlyStates({
      basic: val,
      premium: val,
      project: val,
    });
  }, []);

  const globalState =
    yearlyStates.basic && yearlyStates.premium && yearlyStates.project;

  // ── GSAP ─────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      const rectTl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsWrapRef.current,
          start: "top 95%",
          end: "top 45%",
          scrub: true,
        },
      });

      rectTl.to(
        [rect1Ref.current, rect3Ref.current],
        {
          height: 0,
          y: 80,
          ease: "none",
        },
        0,
      );

      rectTl.to(
        rect2Ref.current,
        {
          height: 0,
          y: 60,
          ease: "none",
        },
        0,
      );

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        const features = card.querySelectorAll(".feature-item");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsWrapRef.current,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            delay: i * 0.1,
          },
        ).fromTo(
          features,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
          },
          "-=0.4",
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white py-20 lg:py-32 overflow-hidden border-t border-white/20"
    >
      <Noise className="z-0" />
      <div className="max-w-[1920px] mx-auto px-7 lg:px-20">
        {/* HEADER */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-14 mt-12"
        >
          <div>
            <p className="text-sm text-white/50 font-medium">[05] Pricing</p>
            <p className="text-sm text-white/30 mt-0.5">Oguz®</p>
          </div>

          <div className="text-center">
            <h2 className="text-[52px] lg:text-[72px] font-semibold tracking-tight leading-none text-white">
              Pricing Plans.
            </h2>
          </div>

          <div className="lg:text-right flex lg:justify-end items-start">
            <p className="text-sm text-white/50 leading-relaxed max-w-[200px]">
              We offer flexible plans designed to fit your brand's goals.
            </p>
          </div>
        </div>

        {/* RECTANGLES */}
        <div className="grid grid-cols-3 gap-8 mb-0 relative z-0">
          <div
            ref={rect1Ref}
            className="bg-white/[0.02]"
            style={{ height: "80px" }}
          />
          <div
            ref={rect2Ref}
            className="bg-white/[0.02]"
            style={{ height: "70px" }}
          />
          <div
            ref={rect3Ref}
            className="bg-white/[0.02]"
            style={{ height: "80px" }}
          />
        </div>

        {/* CARDS */}
        <div
          ref={cardsWrapRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10"
        >
          {plans.map((plan, i) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              yearly={yearlyStates[plan.id]}
              onToggle={(val) => handleCardToggle(plan.id, val)}
              cardRef={(el) => (cardRefs.current[i] = el)}
            />
          ))}
        </div>

        {/* GLOBAL TOGGLE */}
        <div className="flex flex-col items-center justify-start gap-1 mt-10 h-16">
          <div className="flex items-center gap-4">
            <Toggle checked={globalState} onChange={handleGlobalToggle} />
            <span className="text-sm text-white/40">
              Switch to yearly billing
            </span>
          </div>

          <span
            className={`text-xs text-white/60 ml-16 -mt-1 transition-opacity duration-300 ${
              globalState ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            — Premium saves $6,000/yr
          </span>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
