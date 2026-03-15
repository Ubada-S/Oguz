import { useEffect, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import Lenis from "lenis";
import Navbar from "../components/ui/Navbar";

gsap.registerPlugin(ScrollTrigger);

// ─── Image Section — with real parallax ───────────────────────────────────────
const ImageSection = ({ section }) => {
  const wrapRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!wrapRef.current || !imgRef.current) return;
    // Image is taller than container; scroll it at ~60% of scroll speed
    gsap.fromTo(
      imgRef.current,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.4,
        },
      },
    );
    return () =>
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === wrapRef.current) st.kill();
      });
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative w-full overflow-hidden mb-2"
      style={{ aspectRatio: "16/9" }}
    >
      <img
        ref={imgRef}
        src={section.src}
        alt={section.label || ""}
        className="absolute inset-0 w-full object-cover"
        style={{ height: "124%", top: "-12%", willChange: "transform" }}
      />
      {section.label && (
        <span className="absolute bottom-4 right-4 text-xs text-white/60 border border-white/20 px-3 py-1 backdrop-blur-sm bg-black/40 z-10">
          {section.label}
        </span>
      )}
    </div>
  );
};

// ─── Text Section ─────────────────────────────────────────────────────────────
const TextSection = ({ section }) => (
  <div className="py-16 border-t border-white/20">
    {section.title && (
      <p className="text-xs text-white/40 uppercase tracking-widest mb-6">
        {section.title}
      </p>
    )}
    <h3 className="text-2xl lg:text-[2rem] font-semibold tracking-tight leading-[1.2] text-white mb-6 max-w-2xl">
      {section.heading}
    </h3>
    <p className="text-sm lg:text-base text-neutral-400 leading-relaxed max-w-xl">
      {section.body}
    </p>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
const ProjectDetails = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  const sidebarRef = useRef(null);
  const rightColRef = useRef(null);
  const sectionRef = useRef(null);
  const heroRef = useRef(null);
  const heroHeadingRef = useRef(null); // ← ONLY this gets parallax
  const numbersContainerRef = useRef(null);
  const testimonialImgRef = useRef(null);
  const testimonialBodyRef = useRef(null);

  if (!project) return <Navigate to="/" replace />;
  const otherProjects = projects.filter((p) => p.slug !== slug);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const tickerFn = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  // ── GSAP ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // ── 1. HEADING ONLY parallax — scrolls at ~55% speed of page ──────
      gsap.to(heroHeadingRef.current, {
        yPercent: 180,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom+=900 top", // ← keeps animating 600px past the hero's end
          scrub: 0.3, // ← less float, more friction
        },
      });

      gsap.to(heroHeadingRef.current, {
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top", // starts fading the moment you scroll
          end: "center top", // fully gone by the time hero center hits viewport top
          scrub: 0.3, // same friction as the parallax
        },
      });
      // Everything else in the hero scrolls at normal speed — no parallax on sub-content

      // ── 2. Hero entrance: twist + blur + rise ─────────────────────────
      const heroEls = heroRef.current?.querySelectorAll(".hero-anim");
      heroEls?.forEach((el, i) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 52,
            rotationX: 12,
            skewY: 2,
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
          },
        );
      });

      // ── 3. Section content entrance ───────────────────────────────────
      sectionRef.current?.querySelectorAll(".section-anim").forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 44,
            rotationX: 9,
            skewY: 1.2,
            filter: "blur(6px)",
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      // ── 4. Sidebar pin ─────────────────────────────────────────────────
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        ScrollTrigger.create({
          trigger: rightColRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: sidebarRef.current,
          pinSpacing: false,
        });
      });

      // ── 5. Sidebar row text slide-in from left ─────────────────────────
      sidebarRef.current?.querySelectorAll(".meta-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -20, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 0.85,
            ease: "power3.out",
            delay: 0.05 + i * 0.1,
            scrollTrigger: { trigger: row, start: "top 90%", once: true },
          },
        );
      });

      // ── 6. Sidebar divider lines: blur-write left→right ───────────────
      sidebarRef.current?.querySelectorAll(".meta-line").forEach((line, i) => {
        gsap.fromTo(
          line,
          { scaleX: 0, filter: "blur(4px)", opacity: 0.5 },
          {
            scaleX: 1,
            filter: "blur(0px)",
            opacity: 1,
            duration: 1.1,
            ease: "power3.inOut",
            transformOrigin: "left center",
            delay: i * 0.1,
            scrollTrigger: { trigger: line, start: "top 90%", once: true },
          },
        );
      });

      // ── 7. Numbers stat lines blur-write ──────────────────────────────
      numbersContainerRef.current
        ?.querySelectorAll(".stat-line")
        .forEach((line) => {
          gsap.fromTo(
            line,
            { scaleX: 0, filter: "blur(3px)" },
            {
              scaleX: 1,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.inOut",
              transformOrigin: "left center",
              scrollTrigger: { trigger: line, start: "top 95%", once: true },
            },
          );
        });

      // ── 8. Numbers rows entrance ──────────────────────────────────────
      numbersContainerRef.current
        ?.querySelectorAll(".stat-row")
        .forEach((row, i) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 40, filter: "blur(8px)", skewY: 2 },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              skewY: 0,
              duration: 1.0,
              ease: "power3.out",
              delay: i * 0.12,
              scrollTrigger: { trigger: row, start: "top 90%", once: true },
            },
          );
        });

      // ── 9. Testimonial image: twist + swirl + fade entrance ───────────
      if (testimonialImgRef.current) {
        gsap.fromTo(
          testimonialImgRef.current,
          {
            opacity: 0,
            scale: 0.88,
            rotationY: 12,
            rotationZ: -3,
            filter: "blur(10px)",
            transformOrigin: "center center",
            transformPerspective: 800,
          },
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationZ: 0,
            filter: "blur(0px)",
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialImgRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      }

      // ── 10. Testimonial quote entrance ────────────────────────────────
      if (testimonialBodyRef.current) {
        gsap.fromTo(
          testimonialBodyRef.current,
          {
            opacity: 0,
            y: 40,
            rotationX: 8,
            skewY: 1.5,
            filter: "blur(6px)",
            transformOrigin: "50% 100%",
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "power3.out",
            delay: 0.2,
            scrollTrigger: {
              trigger: testimonialBodyRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
    });

    return () => ctx.revert();
  }, [slug]);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-inter">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="border-b border-white/20 overflow-hidden"
      >
        <div className="max-w-[1920px] mx-auto px-6 lg:px-20 pt-40 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-8">
            <div className="lg:col-span-3">
              <p className="hero-anim text-sm text-white/60">© 2025</p>
            </div>

            <div className="lg:col-span-9 flex flex-col gap-16">
              {/* ── Heading: parallax target, scrolls slower than rest ── */}
              <div ref={heroHeadingRef} style={{ willChange: "transform" }}>
                <h1 className="hero-anim text-[clamp(2.5rem,5vw,5.5rem)] font-medium tracking-tight leading-[1.05] max-w-4xl">
                  {project.title}
                </h1>
              </div>

              {/* ── Sub-content: normal scroll speed ── */}
              <div className="flex flex-col gap-16">
                <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 items-start">
                  <div className="lg:col-span-3 hero-anim">
                    <span className="font-bold text-lg">
                      {project.metadata.client[0]}²
                    </span>
                  </div>
                  <div className="lg:col-span-6 hero-anim">
                    <h3 className="text-xl lg:text-2xl font-medium mb-6 leading-snug max-w-xl">
                      {project.intro}
                    </h3>
                    <p className="text-sm lg:text-[15px] text-neutral-400 leading-relaxed max-w-xl">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-9 gap-8 items-center">
                  <div className="lg:col-span-3 hero-anim">
                    <p className="text-sm text-white/60">Services</p>
                  </div>
                  <div className="lg:col-span-6 flex flex-wrap gap-3 hero-anim">
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="text-xs border border-white/15 text-white/80 px-4 py-2"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── METADATA + CONTENT ────────────────────────────────────────────── */}
      <div className="max-w-[1920px] mx-auto">
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar — 30% */}
          <div
            ref={sidebarRef}
            className="w-full lg:w-[30%] shrink-0 lg:h-screen flex flex-col justify-start pt-16 px-6 lg:px-10 xl:px-16 lg:border-r border-white/20 pb-10 lg:pb-0 mb-10 lg:mb-0"
          >
            <div className="flex flex-col">
              {[
                { label: "Date", value: project.metadata.date },
                { label: "Client", value: project.metadata.client },
                { label: "Industry", value: project.metadata.industry },
                { label: "Timeline", value: project.metadata.timeline },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="meta-row relative flex justify-between items-center py-5"
                >
                  <span className="text-xs text-white/60 tracking-wide w-24 shrink-0">
                    {label}
                  </span>
                  <span className="text-sm text-white font-medium flex-1">
                    {value}
                  </span>
                  <div
                    className="meta-line absolute bottom-0 left-0 w-full h-[1px] bg-white/15 origin-left"
                    style={{ willChange: "transform, filter" }}
                  />
                </div>
              ))}

              <div className="flex justify-end mt-12">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-white font-medium hover:text-white/60 transition-colors duration-200"
                >
                  View live ↗
                </a>
              </div>
            </div>
          </div>

          {/* Right column — 70% */}
          <div
            ref={rightColRef}
            className="w-full lg:w-[70%] pt-6 lg:pt-6 px-6 lg:px-10 xl:px-14"
          >
            <div ref={sectionRef}>
              {project.sections.map((section, i) => (
                <div
                  key={i}
                  className="section-anim"
                  style={{ willChange: "transform, opacity, filter" }}
                >
                  {section.type === "image" && (
                    <ImageSection section={section} />
                  )}
                  {section.type === "text" && <TextSection section={section} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── NUMBERS ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/20" ref={numbersContainerRef}>
        <div className="max-w-[1920px] mx-auto px-6 lg:px-20 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            <div className="lg:col-span-3">
              <p className="text-sm text-white/60">By the numbers</p>
            </div>
            <div className="lg:col-span-9 flex flex-col">
              {project.numbers.map((n, i) => (
                <div
                  key={i}
                  className="stat-row relative flex flex-col md:flex-row md:items-center justify-between py-10"
                  style={{ willChange: "transform, opacity, filter" }}
                >
                  <p className="text-[3rem] lg:text-[5rem] font-medium tracking-tight leading-none text-white mb-4 md:mb-0">
                    {n.value}
                  </p>
                  <p className="text-sm text-neutral-300 md:text-right w-full md:max-w-[280px] leading-relaxed">
                    {n.label}
                  </p>
                  <div
                    className="stat-line absolute bottom-0 left-0 w-full h-[1px] bg-white/20 origin-left"
                    style={{ willChange: "transform, filter" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-20 py-28 lg:py-36">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-24 items-start">
            {/* Photo — bigger, animated */}
            <div
              ref={testimonialImgRef}
              className="shrink-0 w-[180px] lg:w-[260px]"
              style={{
                willChange: "transform, opacity, filter",
                transformPerspective: "800px",
              }}
            >
              <div
                className="w-full overflow-hidden border border-white/20"
                style={{ aspectRatio: "3/4" }}
              >
                <img
                  src={project.testimonial.image}
                  alt={project.testimonial.author}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            {/* Quote */}
            <div
              ref={testimonialBodyRef}
              className="flex-1"
              style={{ willChange: "transform, opacity, filter" }}
            >
              <p className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-medium tracking-tight leading-[1.25] text-white mb-10 max-w-3xl">
                "{project.testimonial.quote}"
              </p>
              <div className="w-12 h-px bg-white/20 mb-6" />
              <p className="text-base font-semibold text-white">
                {project.testimonial.author}
              </p>
              <p className="text-sm text-neutral-400 mt-1.5">
                {project.testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST PROJECTS ───────────────────────────────────────────────── */}
      <section className="border-t border-white/20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-20 py-20">
          <p className="text-xs text-white/30 uppercase tracking-widest mb-10">
            Latest projects
          </p>
          <div className="flex flex-wrap items-center gap-4">
            {otherProjects.map((p, i) => (
              <span key={p.slug} className="flex items-center gap-4">
                <Link
                  to={`/projects/${p.slug}`}
                  className="text-xl lg:text-3xl font-medium text-white/40 hover:text-white transition-colors duration-300 tracking-tight"
                >
                  {p.metadata.client}
                </Link>
                {i < otherProjects.length - 1 && (
                  <span className="text-white/10 text-xl lg:text-3xl">/</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetails;
