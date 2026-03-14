import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Service Data ─────────────────────────────────────────────────────────────
const services = [
  {
    id: 1,
    index: "01",
    title: "Brand Identity",
    description:
      "Crafting visual identities that resonate and endure. We build brands from the ground up — logos, systems, and strategies that become unforgettable.",
    tags: [
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines",
      "Typography Systems",
      "Color Systems",
      "Brand Strategy",
    ],
    image: "/images/7.jpg",
  },
  {
    id: 2,
    index: "02",
    title: "Digital Design",
    description:
      "Websites and digital experiences that convert. We design with purpose, creating user journeys that turn visitors into customers.",
    tags: [
      "Web Design",
      "Landing Pages",
      "E-commerce",
      "Email Design",
      "Digital Campaigns",
      "Microsites",
      "Web Apps",
    ],
    image: "/images/8.jpg",
  },
  {
    id: 3,
    index: "03",
    title: "Product Design",
    description:
      "End-to-end product design from concept to launch. We obsess over every pixel and interaction to ship products people love.",
    tags: [
      "UX Research",
      "UI Design",
      "Design Systems",
      "Prototyping",
      "User Testing",
      "Interaction Design",
    ],
    image: "/images/9.jpg",
  },
  {
    id: 4,
    index: "04",
    title: "Marketing & Growth",
    description:
      "Data-driven creative that scales. We combine sharp design with growth strategy to fuel acquisition and retention.",
    tags: [
      "Social Media",
      "Content Strategy",
      "Performance Creative",
      "Campaign Design",
      "Analytics",
      "SEO",
    ],
    image: "/images/10.jpg",
  },
  {
    id: 5,
    index: "05",
    title: "Development",
    description:
      "Clean, performant code that brings design to life. We build fast, accessible, and scalable digital products.",
    tags: [
      "React",
      "Next.js",
      "Headless CMS",
      "API Integration",
      "Performance",
      "Accessibility",
    ],
    image: "/images/11.jpg",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
const Services = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const navItemsRef = useRef([]);
  const rightBlocksRef = useRef([]);
  const activeIndexRef = useRef(0);

  // ── GSAP ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── DESKTOP ────────────────────────────────────────────────────────
      mm.add("(min-width: 1024px)", () => {
        // Set initial nav states
        navItemsRef.current.forEach((item, i) => {
          if (!item) return;
          gsap.set(item, {
            opacity: i === 0 ? 1 : 0.5,
            color: i === 0 ? "#ffffff" : "#404040",
            fontWeight: 400,
          });
          const t1 = item.querySelector(".svc-text-1");
          const t2 = item.querySelector(".svc-text-2");
          if (t1) gsap.set(t1, { yPercent: 0 });
          if (t2) gsap.set(t2, { yPercent: 100 });
        });

        // ── GSAP pin ──
        ScrollTrigger.create({
          trigger: rightColRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: leftColRef.current,
          pinSpacing: false,
        });

        // ── Single progress-based ScrollTrigger for nav ──
        ScrollTrigger.create({
          trigger: rightColRef.current,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => {
            const rawIndex = self.progress * (services.length - 1);
            const newIndex = Math.round(rawIndex);

            // Use native ScrollTrigger direction: 1 = down, -1 = up
            const direction = self.direction === 1 ? "down" : "up";

            if (newIndex !== activeIndexRef.current) {
              transitionTo(newIndex, direction);
            }
          },
        });

        // ── Image parallax ──
        rightBlocksRef.current.forEach((block) => {
          if (!block) return;
          const img = block.querySelector(".svc-img");
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -8 },
              {
                yPercent: 8,
                ease: "none",
                scrollTrigger: {
                  trigger: block,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            );
          }
        });
      });

      // ── MOBILE ─────────────────────────────────────────────────────────
      mm.add("(max-width: 1023px)", () => {
        sectionRef.current
          ?.querySelectorAll(".svc-mobile-block")
          .forEach((panel) => {
            gsap.fromTo(
              panel,
              { opacity: 0, y: 50 },
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: panel,
                  start: "top 85%",
                  toggleActions: "play none none none",
                },
              },
            );
            const img = panel.querySelector(".svc-img");
            if (img) {
              gsap.fromTo(
                img,
                { yPercent: -6 },
                {
                  yPercent: 6,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.2,
                  },
                },
              );
            }
          });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Transition ────────────────────────────────────────────────────────────
  function transitionTo(newIndex, direction) {
    const prevIndex = activeIndexRef.current;
    activeIndexRef.current = newIndex;

    const isDown = direction === "down";

    // Snappy duration and easing to match your CSS cubic-bezier perfectly
    const duration = 0.5;
    const ease = "power4.inOut";

    navItemsRef.current.forEach((item, i) => {
      if (!item) return;

      const t1 = item.querySelector(".svc-text-1");
      const t2 = item.querySelector(".svc-text-2");

      gsap.killTweensOf(item);
      if (t1) gsap.killTweensOf(t1);
      if (t2) gsap.killTweensOf(t2);

      if (i === newIndex) {
        // ── Incoming ──────────────────────────────────────────────────────
        const enterFrom = isDown ? 100 : -100;
        const exitTo = isDown ? -100 : 100;

        if (t2) gsap.set(t2, { yPercent: enterFrom });

        gsap.to(item, {
          opacity: 1,
          color: "#ffffff",
          fontWeight: 400,
          duration,
          ease,
        });
        if (t1) gsap.to(t1, { yPercent: exitTo, duration, ease });
        if (t2)
          gsap.to(t2, {
            yPercent: 0,
            duration,
            ease,
            onComplete: () => {
              if (t1) gsap.set(t1, { yPercent: 0 });
              if (t2) gsap.set(t2, { yPercent: 100 });
            },
          });
      } else if (i === prevIndex) {
        // ── Outgoing ──────────────────────────────────────────────────────
        const exitDir = isDown ? -100 : 100;
        const enterDir = isDown ? 100 : -100;

        if (t2) gsap.set(t2, { yPercent: enterDir });

        gsap.to(item, {
          opacity: 0.5,
          color: "#404040",
          fontWeight: 400,
          duration,
          ease,
        });
        if (t1) gsap.to(t1, { yPercent: exitDir, duration, ease });
        if (t2)
          gsap.to(t2, {
            yPercent: 0,
            duration,
            ease,
            onComplete: () => {
              if (t1) gsap.set(t1, { yPercent: 0 });
              if (t2) gsap.set(t2, { yPercent: 100 });
            },
          });
      } else {
        // ── All others snap safely ─────────────────────────────────────────
        gsap.to(item, {
          opacity: 0.5,
          color: "#404040",
          fontWeight: 400,
          duration: 0.3,
          ease: "power2.out",
        });
        if (t1) gsap.set(t1, { yPercent: 0 });
        if (t2) gsap.set(t2, { yPercent: 100 });
      }
    });
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white border-t border-white/20"
    >
      {/* ── HEADER ───────────────────────────────────────────────────────── */}
      <div className="max-w-[1920px] mx-auto px-7 lg:px-20 pt-12 lg:pt-24 pb-10 lg:pb-20">
        <div className="hidden lg:flex items-start gap-10">
          <p className="text-base font-google text-white/60 font-bold pt-[6px] shrink-0">
            [03] Services
          </p>
          <div className="lg:ml-96">
            <h2 className="text-[80px] xl:text-[96px] font-google tracking-tighter leading-none mb-6">
              Services
            </h2>
            <p className="text-base text-neutral-400 leading-relaxed max-w-xl">
              Full-spectrum design capabilities under one roof. Whether you need
              a complete brand overhaul or ongoing creative support, we have the
              expertise to deliver. No outsourcing, no excuses, just exceptional
              work from our senior team.
            </p>
          </div>
        </div>

        <div className="lg:hidden">
          <p className="text-sm font-google text-white/60 font-bold mb-5">
            [03] Services
          </p>
          <h2 className="text-5xl font-google tracking-tighter leading-none mb-4">
            Services
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Full-spectrum design capabilities under one roof. Whether you need a
            complete brand overhaul or ongoing creative support, we have the
            expertise to deliver. No outsourcing, no excuses, just exceptional
            work from our senior team.
          </p>
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ───────────────────────────────────────────────── */}
      <div className="hidden lg:block max-w-[1920px] mx-auto relative">
        <div
          className="absolute top-0 bottom-0 w-px bg-white/10 pointer-events-none z-10"
          style={{ left: "30%" }}
        />

        <div className="flex">
          {/* ── Left col ── */}
          <div
            ref={leftColRef}
            className="w-[30%] shrink-0 h-screen flex flex-col justify-start pt-24 pl-16 xl:pl-20 pr-10"
          >
            <div className="space-y-4">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  ref={(el) => (navItemsRef.current[i] = el)}
                  className="relative block w-fit overflow-hidden text-2xl xl:text-[28px] tracking-tight cursor-default select-none"
                  style={{ willChange: "opacity, filter, color" }}
                >
                  {/* Changed from inline spans to block/flex so GSAP transform applies correctly */}
                  <span className="invisible block">{service.title}</span>
                  <span className="svc-text-1 absolute left-0 top-0 w-full h-full flex items-center">
                    {service.title}
                  </span>
                  <span className="svc-text-2 absolute left-0 top-0 w-full h-full flex items-center">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right col ── */}
          <div ref={rightColRef} className="w-[70%]">
            {services.map((service, i) => (
              <div
                key={service.id}
                ref={(el) => (rightBlocksRef.current[i] = el)}
                className="px-10 xl:px-16 py-10 border-b border-white/10"
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden mb-8">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="svc-img absolute inset-0 w-full h-[120%] object-cover"
                    style={{ top: "-10%" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <h3 className="text-2xl xl:text-3xl tracking-tight mb-4">
                  <span className="text-white/30 mr-2 font-light">
                    [{service.index}]
                  </span>
                  <span className="font-semibold">{service.title}</span>
                </h3>

                <div className="flex flex-col xl:flex-row xl:items-start gap-6 xl:gap-12">
                  <p className="text-sm xl:text-base text-neutral-400 leading-relaxed max-w-md">
                    {service.description}
                  </p>
                  <div className="flex-1">
                    <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-3">
                      Categories
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-1.5 text-xs border border-white/15 text-neutral-400
                                     hover:border-white/40 hover:text-white transition-all duration-300 cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT ────────────────────────────────────────────────── */}
      <div className="lg:hidden max-w-[1920px] mx-auto px-5 pb-16 space-y-20">
        {services.map((service) => (
          <div key={service.id} className="svc-mobile-block">
            <div className="relative w-full aspect-[4/3] overflow-hidden mb-6">
              <img
                src={service.image}
                alt={service.title}
                className="svc-img absolute inset-0 w-full h-[115%] object-cover"
                style={{ top: "-7.5%" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
            <h3 className="text-2xl tracking-tight mb-3">
              <span className="text-white/30 mr-2 font-light">
                [{service.index}]
              </span>
              <span className="font-semibold">{service.title}</span>
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed mb-5">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs border border-white/20 text-neutral-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
