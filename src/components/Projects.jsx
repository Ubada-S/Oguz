import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import imagetest from "../components/other/card.jpg";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const cardsRef = useRef([]);
  const lenisRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Quantum",
      category: "Brand Strategy & Product Design",
      year: "2025",
      tag: "[O1]",
      image: imagetest,
      logo: "Quantum²",
      speed: 0.3,
    },
    {
      id: 2,
      title: "Cubedlt",
      category: "Brand Strategy & Product Design",
      year: "2025",
      tag: "[O2]",
      image: imagetest,
      logo: "Cubedlt",
      speed: 0.5,
    },
    {
      id: 3,
      title: "Ephemeral",
      category: "Brand Strategy & Product Design",
      year: "2025",
      tag: "[O3]",
      image: imagetest,
      logo: "Ephemeral",
      speed: 0.4,
    },
    {
      id: 4,
      title: "Warpspeed",
      category: "Brand Strategy & Product Design",
      year: "2024",
      tag: "[O4]",
      image: imagetest,
      logo: "Warpspeed",
      speed: 0.6,
    },
    {
      id: 5,
      title: "Global Bank",
      category: "Digital Marketing & Design System",
      year: "2025",
      tag: "[O6]",
      image: imagetest,
      logo: "GlobalBank",
      speed: 0.35,
    },
    {
      id: 6,
      title: "Magnolia",
      category: "Brand Strategy & Web Design",
      year: "2025",
      tag: "[O6]",
      image: imagetest,
      logo: "Magnolia",
      speed: 0.45,
    },
  ];

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: "vertical",
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Connect Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Parallax effect for each card
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const img = card.querySelector(".parallax-img");
      const project = projects[index];

      // Smooth parallax with Lenis
      gsap.to(img, {
        yPercent: 15 * project.speed,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });
    });

    // Stagger reveal animation
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
        },
      },
    );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <main className="min-h-screen bg-black font-google tracking-tighter">
      {/* Center Canvas */}
      <div className="relative w-full max-w-[1920px] mx-auto">
        {/* Left Label */}
        <div className="absolute left-0 top-0 text-white lg:pl-20 pl-7 pt-7 lg:pt-24 z-10">
          <p className="font-bold text-sm lg:text-base">[01] Projects</p>
        </div>

        {/* Center Content */}
        <div className="text-center pt-16 lg:pt-24 px-7 ">
          <h1 className="lg:text-[72px] xl:text-[96px] text-[40px] text-white -tracking-widest leading-tight">
            Case Studies
          </h1>
          <p className="text-white text-center lg:text-xl mt-2 opacity-60">
            2024-2026
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-16 lg:mt-24 px-4 lg:px-20 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 ">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className="project-card group relative cursor-pointer overflow-hidden aspect-[3/4] border border-white/10 bg-zinc-900"
              >
                {/* Image with Parallax */}
                <div className="absolute inset-0 overflow-hidden ">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="parallax-img absolute w-full h-[115%] object-cover transition-transform duration-700 ease-out  group-hover:scale-110"
                    style={{ top: "-7.5%" }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-500" />
                </div>

                {/* Top Tag */}
                <div className="absolute top-6 left-6 z-10">
                  <span className="inline-block text-[11px] font-medium tracking-widest text-white/80">
                    {project.tag}
                  </span>
                </div>

                {/* Center Logo - Visible, fades out on hover */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-100 group-hover:opacity-0 transition-all duration-500">
                  <div className="flex items-center gap-2.5 px-5 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span className="text-sm font-semibold tracking-wide text-white">
                      {project.logo}
                    </span>
                  </div>
                </div>

                {/* Black Bar at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-black z-10 p-6">
                  <div className="flex items-end justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl lg:text-3xl  text-white mb-2 leading-tighter">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-light tracking-wide">
                        {project.category}
                      </p>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <span className="text-sm font-medium text-white/60">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Plus to Arrow Icon */}
                  <div className="absolute bottom-32 right-6 w-4 h-4">
                    {/* Plus Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-all duration-500 group-hover:rotate-90">
                      <svg
                        className="w-6 h-6 text-white"
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
                    </div>

                    {/* Arrow Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <svg
                        className="w-6 h-6 text-white"
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
            ))}
          </div>

          {/* Footer Link */}
          <div className="mt-16 flex justify-end">
            <a
              href="#"
              className="group flex items-center gap-3 text-sm font-light tracking-wide text-white/60 hover:text-white transition-colors duration-300"
            >
              <span>[02]</span>
              <span>All Case Studies</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        * {
          font-family: "Google Sans", sans-serif;
        }

        .project-card {
          will-change: transform, opacity;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #000;
        }

        ::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #333;
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: auto;
        }
      `}</style>
    </main>
  );
};

export default Projects;
