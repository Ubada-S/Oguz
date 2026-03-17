import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data/projects";
import Noise from "./other/noise";

gsap.registerPlugin(ScrollTrigger);

// ─── EDITABLE LAYOUT PATTERNS ──────────────────────────────────────────────
// These numbers determine how many rows each card spans in the grid
const SPAN_PATTERN = [5, 6, 5, 5, 5, 6]; // Desktop spans for 6 items
const MOBILE_SPAN_PATTERN = [4, 5, 4, 4, 5, 4]; // Mobile spans for 6 items

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle responsiveness for the span logic
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const span = isMobile
    ? MOBILE_SPAN_PATTERN[index % MOBILE_SPAN_PATTERN.length]
    : SPAN_PATTERN[index % SPAN_PATTERN.length];

  // Individual Parallax Logic
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
      style={{
        gridRow: `span ${span}`,
      }}
    >
      {/* Image with Parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 w-full h-[120%] transition-[transform] duration-700 ease-out group-hover:scale-110"
          style={{ top: "-10%" }}
        >
          <img
            ref={imgRef}
            src={project.image}
            alt={project.metadata.client}
            className="parallax-img w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
        </div>
      </div>

      {/* Top Tag */}
      <div className="absolute top-5 left-5 z-10 mix-blend-difference">
        <span className="text-[11px] font-medium tracking-wide text-white  uppercase">
          {project.tag}
        </span>
      </div>

      {/* Center Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-100 group-hover:opacity-0 transition-all duration-500">
        <div className="flex items-center border border-white/20 rounded-full bg-black gap-2.5 px-3 py-3 ">
          <img
            className={project.metadata.className}
            src={project.Logo}
            alt=""
          />
        </div>
      </div>

      {/* Bottom Information Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-black z-10 p-5">
        <div className="flex items-end justify-between">
          <div className="flex-1 min-w-0 pr-3">
            <h3 className="text-xl lg:text-2xl text-white mb-1 truncate">
              {project.metadata.client}
            </h3>
            <p className="text-[11px] text-gray-400 font-light truncate">
              {project.metadata.industry}
            </p>
          </div>
          <div className="flex flex-col items-end flex-shrink-0">
            <span className="text-[11px] font-medium text-white/60 mb-2">
              {project.metadata.date}
            </span>
            {/* Animated Plus-to-Arrow Icon */}
            <div className="relative w-5 h-5">
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

const Projects = () => {
  const gridRef = useRef(null);

  // 1. Limit to only 6 projects for the Home Page
  const homeProjects = projects.slice(0, 6);

  useEffect(() => {
    // Scroll Entrance Animation for the whole grid
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        },
      );
    }
  }, []);

  return (
    <main className="relative min-h-[900px] bg-black border-t border-white/20 font-google tracking-tighter overflow-hidden">
      <Noise className="z-1" />
      <div className="relative w-full max-w-[1920px] mx-auto">
        {/* Section Label */}
        <div className="absolute left-0 top-0 text-white lg:pl-20 pl-7 pt-7 lg:pt-24 z-10">
          <p className="text-sm lg:text-sm tracking-wide">[01] Featured Work</p>
        </div>

        {/* Title Header */}
        <div className="text-center pt-16 lg:pt-32 px-7">
          <h1 className="lg:text-[96px] text-[48px] text-white -tracking-widest leading-tight">
            Case Studies
          </h1>
          <p className="text-white/50 text-center lg:text-xl mt-4 font-light">
            Selected Work (2024—2026)
          </p>
        </div>

        {/* Dynamic Masonry Grid */}
        <div className="mt-16 lg:mt-24 px-4 lg:px-20 pb-20">
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            // Logic for row height used in the ProjectsPage
            style={{ gridAutoRows: window.innerWidth < 768 ? "80px" : "100px" }}
          >
            {homeProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>

          {/* All Projects Link */}
          <div className="mt-20 flex justify-end">
            <Link
              to="/projects"
              className="group flex items-center gap-4 text-sm tracking-wide text-white"
            >
              <span className="relative pb-1">
                [12] All case studies
                <span className="absolute bottom-0 left-0 bg-white pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
              </span>
              <span className="max-md:hidden text-white/60 group-hover:translate-x-1 group-hover:text-white pb-1 lg:absolute lg:right-14 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-arrow-right-icon lucide-arrow-right"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        * {
          font-family: "Google Sans", sans-serif;
        }
        .project-card {
          will-change: transform, opacity;
        }
      `}</style>
    </main>
  );
};

export default Projects;
