import { useEffect, useRef, useState, useCallback } from "react";

// ─── Service data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "01",
    name: "Brand Identity",
    description:
      "Complete brand systems that capture your essence and stand out in market. From strategy to execution, we build identities that resonate and scale.",
    categories: [
      "Logo Design",
      "Visual Identity",
      "Brand Guidelines",
      "Positioning",
      "Naming",
      "Brand Strategy",
      "Brand Packages",
    ],
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Abstract brand identity shapes",
  },
  {
    id: "02",
    name: "Digital Design",
    description:
      "Websites and digital experiences that convert. We design with purpose, creating user journeys that turn visitors into customers.",
    categories: [
      "Web Design",
      "Landing Pages",
      "E-commerce",
      "Email Design",
      "Digital Campaigns",
      "Microsites",
      "Web Apps",
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Digital design on screen",
  },
  {
    id: "03",
    name: "Product Design",
    description:
      "UI/UX that makes complex products feel simple. We balance user needs with business goals to create experiences that just work.",
    categories: [
      "User Interface",
      "User Experience",
      "Design Systems",
      "Prototypes",
      "Mobile Apps",
      "SaaS Products",
      "Dashboards",
    ],
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Product design interface",
  },
  {
    id: "04",
    name: "Marketing & Growth",
    description:
      "Strategic creative that drives results. From campaigns to pitch decks, we design materials that move your audience to action.",
    categories: [
      "Campaign Creative",
      "Social Media",
      "Pitch Decks",
      "Sales Materials",
      "Reports",
      "Infographics",
      "Presentations",
    ],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Marketing growth analytics",
  },
  {
    id: "05",
    name: "Development",
    description:
      "Clean code that brings designs to life. Fast, responsive, and pixel-perfect across all devices and every platform.",
    categories: [
      "Front-end",
      "Webflow",
      "Framer",
      "React",
      "Marketing Sites",
      "Web Apps",
      "CMS Integration",
      "Performance",
    ],
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=80&auto=format&fit=crop",
    imageAlt: "Code on laptop screen",
  },
];

// ─── CDN GSAP loader ──────────────────────────────────────────────────────────
function useGSAPLoad(onReady) {
  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      onReady(window.gsap, window.ScrollTrigger);
      return;
    }
    const load = (src) =>
      new Promise((res) => {
        const s = document.createElement("script");
        s.src = src;
        s.onload = res;
        document.head.appendChild(s);
      });

    load("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js")
      .then(() =>
        load(
          "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js",
        ),
      )
      .then(() => {
        window.gsap.registerPlugin(window.ScrollTrigger);
        onReady(window.gsap, window.ScrollTrigger);
      });
  }, []); // eslint-disable-line
}

// ─── Global styles (only things Tailwind cannot express) ─────────────────────
const GLOBALS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300;1,9..40,400&display=swap');

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: auto; font-family: 'DM Sans', sans-serif; }
body { background: #000; }

::-webkit-scrollbar { width: 1px; }
::-webkit-scrollbar-track { background: #000; }
::-webkit-scrollbar-thumb { background: #222; }

/* Cursor blend */
.mgn-cursor { mix-blend-mode: difference; }
.mgn-cursor.big { width: 42px !important; height: 42px !important; }

/* Tab underline pseudo */
.svc-tab { position: relative; }
.svc-tab::after {
  content: '';
  position: absolute;
  bottom: 0; right: 0;
  height: 1px; width: 0;
  background: rgba(255,255,255,0.45);
  transition: width .38s cubic-bezier(.4,0,.2,1);
}
.svc-tab.active::after { width: 100%; }

/* Image — oversized for parallax, grayscale */
.img-inner {
  position: absolute;
  top: -8%; left: 0;
  width: 100%; height: 116%;
  object-fit: cover;
  object-position: center;
  filter: grayscale(100%) contrast(1.12) brightness(0.78);
  display: block;
  will-change: transform;
}

/* Fluid font sizes */
.fs-headline    { font-size: clamp(38px, 5vw, 76px); }
.fs-panel-title { font-size: clamp(30px, 3.6vw, 56px); }
.fs-tagline     { font-size: clamp(12px, 1vw, 14px); }
.fs-desc        { font-size: clamp(12px, 1vw, 13.5px); }
.fs-badge       { font-size: clamp(9px, .85vw, 11px); }
.fs-svc-name    { font-size: clamp(10px, .95vw, 12px); }
.fs-ghost-num   { font-size: clamp(130px, 17vw, 280px); }

/* Fluid padding for left column */
.pad-left {
  padding: clamp(28px, 4vw, 68px);
  padding-right: clamp(24px, 3vw, 52px);
}

/* Image dual gradient overlay */
.img-overlay-grad {
  background:
    linear-gradient(to right,  rgba(0,0,0,.45) 0%, transparent 28%),
    linear-gradient(to bottom, rgba(0,0,0,.6)  0%, transparent 38%,
                               transparent 52%, rgba(0,0,0,.8) 100%);
}

/* Ghost number — webkit stroke not in Tailwind */
.ghost-stroke {
  color: transparent;
  -webkit-text-stroke: 1px rgba(255,255,255,.055);
}

/* will-change helpers */
.wc-all     { will-change: transform, opacity, filter; }
.wc-opacity { will-change: opacity; }
.wc-height  { will-change: height; }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const headlineRef = useRef(null);
  const taglineRef = useRef(null);
  const progressRef = useRef(null);
  const ghostNumRef = useRef(null);
  const panelsRef = useRef([]);
  const imgSlideRefs = useRef([]);
  const imgInnerRefs = useRef([]);
  const cursorRef = useRef(null);
  const gsapCtxRef = useRef(null);
  const activeIdxRef = useRef(0);
  const initialised = useRef(false);

  const [activeIdx, setActiveIdx] = useState(0);

  // ── lerp cursor ────────────────────────────────────────────────────────────
  useEffect(() => {
    const el = cursorRef.current;
    if (!el) return;
    let mx = 0,
      my = 0,
      cx = 0,
      cy = 0,
      raf;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      cx += (mx - cx) * 0.11;
      cy += (my - cy) * 0.11;
      el.style.transform = `translate(${cx - el.offsetWidth / 2}px, ${cy - el.offsetHeight / 2}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── switchService (called by ScrollTrigger zone triggers) ─────────────────
  const switchService = useCallback((idx) => {
    if (idx === activeIdxRef.current && initialised.current) return;
    activeIdxRef.current = idx;
    initialised.current = true;

    const { gsap } = window;
    if (!gsap) return;

    setActiveIdx(idx);

    // ghost number
    if (ghostNumRef.current) {
      ghostNumRef.current.textContent = String(idx + 1).padStart(2, "0");
      gsap.fromTo(
        ghostNumRef.current,
        { opacity: 0, scale: 0.84 },
        { opacity: 1, scale: 1, duration: 0.55, ease: "power3.out" },
      );
    }

    // panels — exit old, enter new
    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      if (i === idx) {
        gsap.set(panel, { display: "block" });
        // parent blur-in
        gsap.fromTo(
          panel,
          { opacity: 0, y: 26, filter: "blur(7px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.55,
            ease: "power3.out",
          },
        );
        // children staggered
        const eyebrow = panel.querySelector(".panel-eyebrow");
        const title = panel.querySelector(".panel-title");
        const desc = panel.querySelector(".panel-desc");
        const cats = panel.querySelector(".cats-label");
        const tags = panel.querySelectorAll(".tag");
        if (eyebrow)
          gsap.fromTo(
            eyebrow,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, delay: 0.0 },
          );
        if (title)
          gsap.fromTo(
            title,
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.48,
              ease: "power3.out",
              delay: 0.04,
            },
          );
        if (desc)
          gsap.fromTo(
            desc,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              duration: 0.42,
              ease: "power2.out",
              delay: 0.09,
            },
          );
        if (cats)
          gsap.fromTo(
            cats,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, delay: 0.14 },
          );
        gsap.fromTo(
          tags,
          { opacity: 0, x: -10, scale: 0.94 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            stagger: 0.028,
            duration: 0.3,
            ease: "back.out(1.3)",
            delay: 0.16,
          },
        );
      } else {
        gsap.to(panel, {
          opacity: 0,
          y: -14,
          filter: "blur(4px)",
          duration: 0.24,
          ease: "power2.in",
          onComplete: () => gsap.set(panel, { display: "none" }),
        });
      }
    });

    // images crossfade
    imgSlideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      if (i === idx) {
        gsap.set(slide, { display: "block" });
        gsap.fromTo(
          slide,
          { opacity: 0 },
          { opacity: 1, duration: 0.65, ease: "power2.inOut" },
        );
      } else {
        gsap.to(slide, {
          opacity: 0,
          duration: 0.38,
          ease: "power2.in",
          onComplete: () => gsap.set(slide, { display: "none" }),
        });
      }
    });
  }, []);

  // ── GSAP init ───────────────────────────────────────────────────────────────
  useGSAPLoad((gsap, ScrollTrigger) => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    if (!section || !pin) return;

    // set initial hidden states
    panelsRef.current.forEach((p, i) => {
      if (p && i !== 0) gsap.set(p, { display: "none", opacity: 0 });
    });
    imgSlideRefs.current.forEach((s, i) => {
      if (s && i !== 0) gsap.set(s, { display: "none", opacity: 0 });
    });

    const ctx = gsap.context(() => {
      // ── Section entrance animation (fires once on scroll-in) ──────────────
      // Content is hidden until section enters viewport
      const leftItems = [
        ".svc-eyebrow",
        headlineRef.current,
        taglineRef.current,
      ].filter(Boolean);

      // start everything hidden
      gsap.set(leftItems, { opacity: 0, y: 24 });
      gsap.set(".svc-tab", { opacity: 0, x: 20 });
      gsap.set(".svc-meta-row", { opacity: 0 });

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to(".svc-eyebrow", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          })
            .to(
              headlineRef.current,
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              "-=0.28",
            )
            .to(
              taglineRef.current,
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              "-=0.48",
            )
            .to(
              ".svc-tab",
              {
                opacity: 1,
                x: 0,
                stagger: 0.055,
                duration: 0.48,
                ease: "power2.out",
              },
              "-=0.38",
            )
            .to(".svc-meta-row", { opacity: 1, duration: 0.38 }, "-=0.22");

          // also reveal the first panel
          const firstPanel = panelsRef.current[0];
          if (firstPanel) {
            gsap.set(firstPanel, { display: "block" });
            gsap.fromTo(
              firstPanel,
              { opacity: 0, y: 26, filter: "blur(7px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.65,
                ease: "power3.out",
                delay: 0.15,
              },
            );
            const tags = firstPanel.querySelectorAll(".tag");
            gsap.fromTo(
              tags,
              { opacity: 0, x: -10, scale: 0.94 },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                stagger: 0.028,
                duration: 0.3,
                ease: "back.out(1.3)",
                delay: 0.38,
              },
            );
          }

          // reveal first image
          const firstImg = imgSlideRefs.current[0];
          if (firstImg) {
            gsap.set(firstImg, { display: "block" });
            gsap.fromTo(
              firstImg,
              { opacity: 0 },
              { opacity: 1, duration: 0.9, ease: "power2.inOut", delay: 0.1 },
            );
          }
        },
      });

      // ── Pin ───────────────────────────────────────────────────────────────
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: pin,
        pinSpacing: false,
      });

      // ── Progress bar — direct inline height via onUpdate ──────────────────
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (progressRef.current) {
            progressRef.current.style.height = `${self.progress * 100}%`;
          }
        },
      });

      // ── Image parallax ────────────────────────────────────────────────────
      imgInnerRefs.current.forEach((img) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { y: "0%" },
          {
            y: "-7%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.6,
            },
          },
        );
      });

      // ── Ghost number parallax ─────────────────────────────────────────────
      if (ghostNumRef.current) {
        gsap.to(ghostNumRef.current, {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 2.2,
          },
        });
      }

      // ── Per-service scroll zones ───────────────────────────────────────────
      // Each service occupies (sectionHeight / SERVICES.length) of scroll.
      // We calculate as % of the section's total scroll distance.
      SERVICES.forEach((_, i) => {
        const pct = 100 / SERVICES.length;
        const s = (i * pct).toFixed(4);
        const e = ((i + 1) * pct).toFixed(4);

        ScrollTrigger.create({
          trigger: section,
          start: `${s}% top`,
          end: `${e}% top`,
          onEnter: () => switchService(i),
          onEnterBack: () => switchService(i),
        });
      });
    }, pin);

    gsapCtxRef.current = ctx;
    return () => ctx.revert();
  });

  // ── Tab click → scroll to that service zone ────────────────────────────────
  const handleTabClick = useCallback((i) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const height = section.offsetHeight;
    window.scrollTo({
      top: top + height * (i / SERVICES.length) + 2,
      behavior: "smooth",
    });
  }, []);

  // ── Cursor helpers ─────────────────────────────────────────────────────────
  const growCursor = () => cursorRef.current?.classList.add("big");
  const shrinkCursor = () => cursorRef.current?.classList.remove("big");

  // ── Title split (last word italicised) ────────────────────────────────────
  const titleJSX = (name) => {
    if (name === "Development") return <>{name}</>;
    if (name.includes(" & ")) {
      const [a, b] = name.split(" & ");
      return (
        <>
          {a} <em className="font-light not-italic text-white/40">& {b}</em>
        </>
      );
    }
    const words = name.split(" ");
    if (words.length > 1) {
      return (
        <>
          {words.slice(0, -1).join(" ")}{" "}
          <em className="font-light not-italic text-white/40">
            {words[words.length - 1]}
          </em>
        </>
      );
    }
    return <>{name}</>;
  };

  return (
    <>
      <style>{GLOBALS}</style>

      {/* ── Custom cursor ────────────────────────────────────────────────────── */}
      <div
        ref={cursorRef}
        className="mgn-cursor fixed w-[11px] h-[11px] rounded-full bg-white pointer-events-none z-[9999] transition-[width,height] duration-[180ms] ease-out"
        style={{ willChange: "transform" }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES SECTION  —  600vh scroll container
      ═══════════════════════════════════════════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative bg-black"
        style={{ height: "600vh" }}
        id="services"
      >
        {/* ── Pinned viewport panel ──────────────────────────────────────────── */}
        <div
          ref={pinRef}
          className="relative h-screen max-w-[1920px] mx-auto overflow-hidden
            before:content-[''] before:absolute before:top-0 before:inset-x-0
            before:h-px before:bg-white/[0.08] before:z-20"
        >
          {/* ── 50/50 grid ────────────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 max-lg:grid-cols-1 h-full">
            {/* ══════════════════════════
                LEFT COLUMN
            ══════════════════════════ */}
            <div
              className="
                pad-left flex flex-col justify-between
                border-r border-white/[0.08]
                relative z-[5] overflow-hidden
                max-lg:border-r-0 max-lg:z-[6]
                max-lg:[background:linear-gradient(105deg,rgba(0,0,0,.97)_0%,rgba(0,0,0,.93)_55%,rgba(0,0,0,.72)_100%)]
                max-sm:!p-5
              "
            >
              {/* ── TOP: eyebrow / headline / tagline ── */}
              <div>
                <div className="svc-eyebrow flex items-center gap-2.5 text-[10px] tracking-[.2em] uppercase text-white/25 mb-6">
                  <span className="text-white/40">[03]</span>
                  <span>Services</span>
                </div>

                <h2
                  ref={headlineRef}
                  className="fs-headline font-google font-bold tracking-[-0.04em] leading-[1.04] text-white mb-3"
                >
                  Services
                </h2>

                <p
                  ref={taglineRef}
                  className="fs-tagline leading-[1.8] font-light text-white/50 max-w-[380px]"
                >
                  Full-spectrum design capabilities under one roof. No
                  outsourcing, no excuses — just exceptional work from our
                  senior team.
                </p>
              </div>

              {/* ── MIDDLE: animated service panels ── */}
              <div className="flex-1 flex items-end py-6 relative min-h-0">
                <div className="relative w-full">
                  {SERVICES.map((s, i) => (
                    <div
                      key={s.id}
                      ref={(el) => (panelsRef.current[i] = el)}
                      className="absolute bottom-0 left-0 w-full wc-all"
                      // hide all but first; GSAP controls display after init
                      style={{ display: i === 0 ? "block" : "none" }}
                    >
                      {/* eyebrow counter */}
                      <div className="panel-eyebrow text-[10px] tracking-[.2em] text-white/30 mb-3.5 font-medium">
                        [{s.id}]
                      </div>

                      {/* title */}
                      <h3 className="panel-title fs-panel-title font-bold tracking-[-0.035em] leading-[1.06] text-white mb-4">
                        {titleJSX(s.name)}
                      </h3>

                      {/* description */}
                      <p className="panel-desc fs-desc leading-[1.82] font-light text-white/50 max-w-[370px] mb-5">
                        {s.description}
                      </p>

                      {/* categories */}
                      <p className="cats-label text-[9px] tracking-[.22em] uppercase text-white/25 mb-3">
                        Categories
                      </p>

                      {/* ── Tags — square / sharp corners ── */}
                      <div className="flex flex-wrap gap-1.5">
                        {s.categories.map((cat, ci) => (
                          <span
                            key={ci}
                            className="tag inline-flex items-center gap-[5px] px-3 py-1.5
                              border border-white/[0.1] rounded-none
                              text-[10px] tracking-[.06em] text-white/35
                              bg-transparent cursor-none
                              transition-[border-color,color,background] duration-200
                              hover:border-white/30 hover:text-white hover:bg-white/[0.05]
                              max-sm:px-2.5 max-sm:py-1 max-sm:text-[9px]"
                            onMouseEnter={growCursor}
                            onMouseLeave={shrinkCursor}
                          >
                            <span className="w-[3px] h-[3px] bg-white/40 shrink-0" />
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── BOTTOM: meta + tab nav ── */}
              <div className="flex items-end justify-between gap-4 flex-wrap max-sm:flex-col max-sm:items-start max-sm:gap-2.5">
                {/* meta */}
                <div className="svc-meta-row flex items-center gap-3.5 text-[9px] tracking-[.16em] uppercase text-white/15 shrink-0">
                  <span>OGUZ©</span>
                  <span className="w-[3px] h-[3px] bg-white/15" />
                  <span>Since 2016</span>
                  <span className="w-[3px] h-[3px] bg-white/15" />
                  {/* mobile dots */}
                  <div className="hidden max-lg:flex items-center gap-1.5">
                    {SERVICES.map((_, i) => (
                      <span
                        key={i}
                        className={`w-1 h-1 border transition-[background,transform] duration-[280ms] ${
                          activeIdx === i
                            ? "bg-white border-white scale-150"
                            : "bg-transparent border-white/20"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* tab nav */}
                <nav
                  className="flex flex-col gap-px items-end max-lg:hidden"
                  aria-label="Services"
                >
                  {SERVICES.map((s, i) => (
                    <button
                      key={s.id}
                      className={`svc-tab flex items-center gap-2.5 pl-2.5 py-[5px]
                        text-[10px] tracking-[.1em] uppercase
                        bg-transparent border-none cursor-none
                        transition-colors duration-[280ms] whitespace-nowrap
                        ${activeIdx === i ? "active text-white" : "text-white/20 hover:text-white/50"}`}
                      onClick={() => handleTabClick(i)}
                      onMouseEnter={growCursor}
                      onMouseLeave={shrinkCursor}
                    >
                      <span
                        className={`text-[8px] min-w-[16px] transition-colors duration-[280ms] ${activeIdx === i ? "text-white/50" : "text-white/20"}`}
                      >
                        {s.id}
                      </span>
                      {s.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* ══════════════════════════
                RIGHT COLUMN — image
            ══════════════════════════ */}
            <div className="relative overflow-hidden bg-[#050505] max-lg:absolute max-lg:inset-0 max-lg:z-[1]">
              {/* ── Progress rail — clean line, NO dots ── */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white/[0.07] z-20 max-lg:hidden">
                <div
                  ref={progressRef}
                  className="absolute top-0 left-0 w-px bg-white wc-height"
                  style={{ height: "0%", transition: "none" }}
                />
                {/* ── NO step dots — removed per request ── */}
              </div>

              {/* ── Image stack ── */}
              <div className="absolute inset-0 left-px">
                {SERVICES.map((s, i) => (
                  <div
                    key={s.id}
                    ref={(el) => (imgSlideRefs.current[i] = el)}
                    className="absolute inset-0 overflow-hidden wc-opacity"
                    style={{
                      display: i === 0 ? "block" : "none",
                      opacity: i === 0 ? 1 : 0,
                    }}
                  >
                    <img
                      ref={(el) => (imgInnerRefs.current[i] = el)}
                      src={s.image}
                      alt={s.imageAlt}
                      loading={i === 0 ? "eager" : "lazy"}
                      className="img-inner"
                    />
                    <div className="img-overlay-grad absolute inset-0 z-[2] pointer-events-none" />
                  </div>
                ))}
              </div>

              {/* ── Ghost number ── */}
              <div
                ref={ghostNumRef}
                className="ghost-stroke fs-ghost-num absolute -bottom-[50px] -right-[10px]
                  font-black leading-none pointer-events-none select-none
                  tracking-[-0.06em] z-10 wc-all"
              >
                {String(activeIdx + 1).padStart(2, "0")}
              </div>

              {/* ── Service name — bottom-left ── */}
              <div
                className="fs-svc-name absolute bottom-[clamp(18px,2.5vh,36px)] left-[clamp(18px,2.5vw,36px)]
                  z-10 pointer-events-none tracking-[.14em] uppercase
                  text-white/25 transition-opacity duration-[400ms]"
              >
                {SERVICES[activeIdx]?.name}
              </div>

              {/* ── Index badge — top-right ── */}
              <div
                className="fs-badge absolute top-[clamp(18px,2.5vh,36px)] right-[clamp(18px,2.5vw,40px)]
                  z-10 pointer-events-none tracking-[.18em] uppercase text-white/25"
              >
                {String(activeIdx + 1).padStart(2, "0")} /{" "}
                {String(SERVICES.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
