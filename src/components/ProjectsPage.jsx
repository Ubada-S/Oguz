import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { projects } from "../data/projects";
import Navbar from "../components/ui/Navbar";
import Footer from "./Footer";
import Noise from "./other/noise";

gsap.registerPlugin(ScrollTrigger);

const SPAN_PATTERN = [5, 6, 5, 5, 5, 6, 4, 3, 5];
const MOBILE_SPAN_PATTERN = [4, 5, 4, 4, 5, 4];

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const span = isMobile
    ? MOBILE_SPAN_PATTERN[index % MOBILE_SPAN_PATTERN.length]
    : SPAN_PATTERN[index % SPAN_PATTERN.length];

  useEffect(() => {
    if (!cardRef.current || !imgRef.current) return;
    const st = gsap.to(imgRef.current, {
      yPercent: 12 * project.speed,
      ease: "none",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      if (st.scrollTrigger) st.scrollTrigger.kill();
      st.kill();
    };
  }, [project.speed]);

  return (
    <Link
      to={`/projects/${project.slug}`}
      ref={cardRef}
      className="project-card group relative cursor-pointer overflow-hidden border border-white/10 bg-zinc-900 block"
      style={{ gridRow: `span ${span}`, willChange: "transform, opacity" }}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={project.image}
          className="parallax-img absolute inset-0 w-full h-[120%] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ top: "-10%" }}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
      </div>
      <div className="absolute top-4 left-4 md:top-5 md:left-5 z-10">
        <span className="text-[10px] md:text-[11px] font-medium tracking-widest text-white/80 uppercase">
          {project.tag}
        </span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-100 group-hover:opacity-0 transition-all duration-500">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
          <span className="text-xs md:text-sm font-semibold text-white">
            {project.logo}
          </span>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black z-10 p-4 md:p-5">
        <div className="flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-lg md:text-xl text-white mb-1 truncate">
              {project.metadata.client}
            </h3>
            <p className="text-[10px] md:text-[11px] text-gray-400 font-light truncate">
              {project.metadata.industry || "Strategy & Design"}
            </p>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-[10px] md:text-[11px] font-medium text-white/60 mb-2">
              {project.metadata.date}
            </span>
            <div className="relative w-4 h-4 md:w-5 md:h-5">
              <svg
                className="absolute inset-0 w-full h-full text-white opacity-100 group-hover:opacity-0 transition-all duration-500 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <svg
                className="absolute inset-0 w-full h-full text-white opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 17L17 7M17 7H7M17 7V17"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const ProjectsPage = () => {
  const heroRef = useRef(null);
  const heroHeadingRef = useRef(null);
  const gridRef = useRef(null);
  const dropRef = useRef(null);
  const dropInnerRef = useRef(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [dropOpen, setDropOpen] = useState(false);

  const filterOptions = [
    "All",
    "Strategy",
    "UI/UX",
    "Design",
    "Development",
    "Ecommerce",
  ];

  const visible = projects.filter((p) => {
    const matchSearch =
      search === "" ||
      p.metadata.client.toLowerCase().includes(search.toLowerCase()) ||
      p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" ||
      (p.services &&
        p.services.some((s) =>
          s.toLowerCase().includes(filter.toLowerCase()),
        )) ||
      (p.metadata.industry &&
        p.metadata.industry.toLowerCase().includes(filter.toLowerCase()));
    return matchSearch && matchFilter;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    const tickerFn = (time) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tickerFn);
    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 1. Parallax Heading Logic ──
      gsap.to(heroHeadingRef.current, {
        yPercent: 180,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom+=900 top",
          scrub: 0.3,
        },
      });

      gsap.to(heroHeadingRef.current, {
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "center top",
          scrub: 0.3,
        },
      });

      // ── 2. Entrance Animation (twist + blur + rise) ──
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

      // Grid Cards Entrance
      const cards = gridRef.current?.querySelectorAll(".project-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.05 * (i % 3),
            scrollTrigger: { trigger: card, start: "top 95%", once: true },
          },
        );
      });
    });
    return () => ctx.revert();
  }, [visible.length]);

  return (
    <div className="relative bg-black text-white min-h-screen font-google tracking-tighter overflow-x-hidden">
      <Noise className="z-0" />
      <section
        ref={heroRef}
        className="max-w-[1920px] mx-auto px-6 lg:px-20 pt-24 md:pt-32 pb-12 md:pb-16"
      >
        <Navbar />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          <div className="lg:col-span-3 flex items-start">
            <p className="hero-anim md:text-sm text-white/60 pt-1 text-[14.5px] font-medium tracking-wide">
              [12] All Case studies
            </p>
          </div>
          <div className="lg:col-span-9">
            <h1
              ref={heroHeadingRef}
              className="hero-anim text-[clamp(2.5rem,10vw,6rem)] tracking-tight leading-[0.9] mb-6 md:mb-8 will-change-transform"
            >
              Selected projects.
            </h1>
            <p className="hero-anim text-sm md:text-base text-neutral-400 leading-relaxed max-w-md font-sans tracking-normal">
              Explore how we've helped brands launch, scale, and transform
              through strategic design.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="hero-anim flex flex-wrap items-center gap-3 mt-10 md:mt-14 font-sans tracking-normal relative z-30">
          <div className="relative flex items-center flex-1 md:flex-none">
            <svg
              className="absolute left-3 text-white/30 w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[220px] pl-9 pr-4 py-2.5 text-xs text-white bg-white/5 border border-white/10 rounded-md outline-none focus:border-white/30 transition-all"
            />
          </div>

          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="flex items-center justify-between gap-6 px-4 py-2.5 text-xs text-white bg-white/5 border border-white/10 rounded-md min-w-[140px]"
            >
              <span className="font-medium">{filter}</span>
              <svg
                className={`w-3.5 h-3.5 text-white/50 transition-transform ${dropOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropOpen && (
              <div
                ref={dropRef}
                className="absolute top-[calc(100%+8px)] right-0 w-[160px] bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-lg z-50"
              >
                <div ref={dropInnerRef} className="flex flex-col py-1.5">
                  {filterOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setFilter(opt);
                        setDropOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs font-medium ${filter === opt ? "bg-white/10 text-white" : "text-white/60 hover:text-white"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-[1920px] mx-auto px-6 lg:px-20 pb-32">
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          style={{ gridAutoRows: window.innerWidth < 768 ? "80px" : "100px" }}
        >
          {visible.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>{" "}
      </section>
      <Footer />

      <style jsx>{`
        * {
          font-family: "Google Sans", sans-serif;
        }
        .font-sans {
          font-family: Inter, system-ui, sans-serif;
        }
        h1 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
