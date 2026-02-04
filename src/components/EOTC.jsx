import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "./customCSS/EOTCStyles.css"; // You'll need to create this CSS file

gsap.registerPlugin(ScrollTrigger);

const EOTC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [preloaderProgress, setPreloaderProgress] = useState(0);
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const lenisRef = useRef(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Preloader Animation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        setPreloaderProgress(100);
        clearInterval(interval);

        setTimeout(() => {
          gsap.to(".eotc-preloader-curtain", {
            scaleY: 0,
            transformOrigin: "top",
            duration: 1,
            ease: "power3.inOut",
          });
          gsap.to(".eotc-preloader-content", {
            y: -50,
            opacity: 0,
            duration: 0.5,
          });

          setTimeout(() => {
            setPreloaderComplete(true);
            document.body.style.overflow = "auto";
          }, 1000);
        }, 500);
      } else {
        setPreloaderProgress(Math.floor(progress));
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Custom Cursor
  useEffect(() => {
    if (preloaderComplete) {
      const dot = cursorDotRef.current;
      const follower = cursorFollowerRef.current;

      const moveCursor = (e) => {
        gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
      };

      window.addEventListener("mousemove", moveCursor);

      // Hover effects
      const viewElements = document.querySelectorAll(".eotc-cursor-view");
      viewElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          gsap.to(follower, { scale: 3, duration: 0.3 });
          follower.textContent = "VIEW";
        });
        el.addEventListener("mouseleave", () => {
          gsap.to(follower, { scale: 1, duration: 0.3 });
          follower.textContent = "";
        });
      });

      return () => {
        window.removeEventListener("mousemove", moveCursor);
      };
    }
  }, [preloaderComplete]);

  // Magnetic Elements
  useEffect(() => {
    if (preloaderComplete) {
      const magneticElements = document.querySelectorAll(".eotc-magnetic");

      magneticElements.forEach((el) => {
        const strength = parseFloat(el.getAttribute("data-strength")) || 20;

        el.addEventListener("mousemove", (e) => {
          const rect = el.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width - 0.5) * strength;
          const y = ((e.clientY - rect.top) / rect.height - 0.5) * strength;

          gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
        });

        el.addEventListener("mouseleave", () => {
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)",
          });
        });
      });
    }
  }, [preloaderComplete]);

  // Scroll Animations
  useEffect(() => {
    if (preloaderComplete) {
      // Hero title reveal
      gsap.fromTo(
        ".eotc-char-reveal",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".eotc-hero-title",
            start: "top 80%",
          },
        },
      );

      // Fade reveals
      gsap.utils.toArray(".eotc-reveal-fade").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
          },
        );
      });

      // Parallax images
      gsap.utils.toArray(".eotc-parallax-img").forEach((img) => {
        const speed = parseFloat(img.getAttribute("data-speed")) || 0.5;
        gsap.to(img, {
          y: () => -100 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }
  }, [preloaderComplete]);

  // Marquee Animation
  useEffect(() => {
    if (preloaderComplete) {
      const marquee = document.querySelector(".eotc-marquee-inner");
      if (marquee) {
        gsap.to(marquee, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
    }
  }, [preloaderComplete]);

  // Menu Toggle
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      gsap.to(".eotc-menu-overlay-bg", {
        scaleY: 1,
        duration: 0.6,
        ease: "power3.inOut",
      });
      gsap.to(".eotc-menu-link", {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
      });
    } else {
      gsap.to(".eotc-menu-link", {
        y: 30,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
      });
      gsap.to(".eotc-menu-overlay-bg", {
        scaleY: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.inOut",
      });
    }
  };

  return (
    <div className="eotc-root-wrapper">
      {/* Preloader */}
      {!preloaderComplete && (
        <div className="eotc-preloader">
          <div className="eotc-preloader-content">
            <span className="eotc-count">{preloaderProgress}</span>
            <span className="eotc-count-label">%</span>
          </div>
          <div className="eotc-preloader-curtain"></div>
        </div>
      )}

      {/* Custom Cursor */}
      <div ref={cursorDotRef} className="eotc-cursor-dot"></div>
      <div ref={cursorFollowerRef} className="eotc-cursor-follower"></div>

      {/* Background Grid Lines */}
      <div className="eotc-page-lines">
        <div className="eotc-line"></div>
        <div className="eotc-line"></div>
        <div className="eotc-line"></div>
        <div className="eotc-line"></div>
      </div>

      {/* Navigation */}
      <nav className="eotc-navbar">
        <div className="eotc-logo-wrapper">
          <a href="#" className="eotc-logo eotc-magnetic" data-strength="20">
            <span className="eotc-logo-text">OGUZ</span>
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="eotc-smooth-wrapper">
        <div className="eotc-smooth-content">
          {/* Hero Section */}
          <header id="home" className="eotc-hero-section">
            <div className="eotc-container eotc-hero-container">
              <div className="eotc-hero-text">
                <div className="eotc-amharic-hero-sup">Projects</div>
                <h1 className="eotc-hero-title">
                  <div className="eotc-line">
                    <span className="eotc-char-reveal">Sacred</span>
                  </div>
                  <div className="eotc-line">
                    <span className="eotc-char-reveal ">Ethiopian</span>
                  </div>
                  <div className="eotc-line">
                    <span className="eotc-char-reveal eotc-highlight">
                      Legacy.
                    </span>
                  </div>
                </h1>
                <div className="eotc-amharic-hero-sub">NIGGA</div>
              </div>
              <div className="eotc-hero-sub">
                <p>
                  Witness the timeless spirituality of the
                  <br />
                  Orthodox Tewahedo Church.
                </p>
                <div className="eotc-scroll-hint">
                  <div className="eotc-circle-text">
                    <svg viewBox="0 0 100 100" width="100" height="100">
                      <path
                        id="circlePath"
                        d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      />
                      <text fontSize="12" className="text-white">
                        <textPath xlinkHref="#circlePath">
                          SCROLL DOWN • DISCOVER • SCROLL DOWN •
                        </textPath>
                      </text>
                    </svg>
                    <i className="fa-solid fa-arrow-down eotc-center-icon"></i>
                  </div>
                </div>
              </div>
            </div>

            <div className="eotc-hero-bg-wrapper">
              <div className="eotc-hero-img eotc-parallax-img" data-speed="0.5">
                <img src="/images/img7.jpg" alt="Hero Priest" />
              </div>
            </div>
          </header>

          {/* Marquee Strip */}
          <div
            className="eotc-marquee-strip"
            data-direction="left"
            data-speed="2"
          >
            <div className="eotc-marquee-inner">
              <span>Faith</span> <span className="eotc-divider">•</span>
              <span>Tradition</span> <span className="eotc-divider">•</span>
              <span>History</span> <span className="eotc-divider">•</span>
              <span>Divinity</span> <span className="eotc-divider">•</span>
              <span>Faith</span> <span className="eotc-divider">•</span>
              <span>Tradition</span> <span className="eotc-divider">•</span>
              <span>History</span> <span className="eotc-divider">•</span>
              <span>Divinity</span> <span className="eotc-divider">•</span>
            </div>
          </div>

          {/* Portfolio Grid Section */}
          <section id="gallery" className="eotc-portfolio-section">
            <div className="eotc-container">
              <div className="eotc-section-header">
                <h6 className="eotc-subtitle eotc-reveal-fade">
                  Selected Works
                </h6>
                <h2 className="eotc-section-title eotc-reveal-fade">
                  Visual <br />
                  Chronicle
                </h2>
              </div>

              <div className="eotc-portfolio-grid">
                {/* Portfolio Items */}
                <div className="eotc-portfolio-item eotc-double-w">
                  <div className="eotc-item-img-wrapper eotc-cursor-view">
                    <img
                      src="/images/img1.jpg"
                      alt="Timket"
                      className="eotc-parallax-img"
                      data-speed="0.1"
                    />
                  </div>
                  <div className="eotc-item-info">
                    <h3>Timket Procession</h3>
                    <span className="eotc-category">Celebration</span>
                  </div>
                </div>

                <div className="eotc-portfolio-item eotc-single-w eotc-offset-top">
                  <div className="eotc-item-img-wrapper eotc-cursor-view">
                    <img
                      src="/images/img2.jpg"
                      alt="Vigil"
                      className="eotc-parallax-img"
                      data-speed="0.1"
                    />
                  </div>
                  <div className="eotc-item-info">
                    <h3>Night Vigil</h3>
                    <span className="eotc-category">Prayer</span>
                  </div>
                </div>

                <div className="eotc-portfolio-item eotc-single-w">
                  <div className="eotc-item-img-wrapper eotc-cursor-view">
                    <img
                      src="/images/img6.jpg"
                      alt="Pilgrimage"
                      className="eotc-parallax-img"
                      data-speed="0.1"
                    />
                  </div>
                  <div className="eotc-item-info">
                    <h3>The Journey</h3>
                    <span className="eotc-category">Pilgrimage</span>
                  </div>
                </div>

                <div className="eotc-portfolio-item eotc-double-w eotc-offset-down">
                  <div className="eotc-item-img-wrapper eotc-cursor-view">
                    <img
                      src="/images/img8.jpg"
                      alt="Clergy"
                      className="eotc-parallax-img"
                      data-speed="0.1"
                    />
                  </div>
                  <div className="eotc-item-info">
                    <h3>Clergy</h3>
                    <span className="eotc-category">Portrait</span>
                  </div>
                </div>

                <div className="eotc-portfolio-item eotc-single-w">
                  <div className="eotc-item-img-wrapper eotc-cursor-view">
                    <img
                      src="/images/img3.jpg"
                      alt="Church"
                      className="eotc-parallax-img"
                      data-speed="0.1"
                    />
                  </div>
                  <div className="eotc-item-info">
                    <h3>Sanctuary</h3>
                    <span className="eotc-category">Architecture</span>
                  </div>
                </div>

                <div className="eotc-portfolio-item eotc-single-w eotc-offset-top">
                  <div className="eotc-item-img-wrapper eotc-cursor-view">
                    <img
                      src="/images/img5.jpg"
                      alt="Liturgy"
                      className="eotc-parallax-img"
                      data-speed="0.1"
                    />
                  </div>
                  <div className="eotc-item-info">
                    <h3>Liturgy</h3>
                    <span className="eotc-category">Worship</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EOTC;
