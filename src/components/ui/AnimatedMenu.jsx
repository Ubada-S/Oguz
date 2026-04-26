import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = ["Home", "Work", "Services", "Pricing", "Contact"];
const LETTERS = ["O", "G", "U", "Z"];

const IconX = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const IconDribbble = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72" />
    <path d="M2 12c5.5 0 9.5-.8 13-2" />
    <path d="M12 22c.8-4.5.5-9-.5-13" />
  </svg>
);

const IconLinkedIn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function AnimatedMenu() {
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuRef = useRef(null);
  const isDoneAnimationRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [torontoTime, setTorontoTime] = useState("");

  const letterRefs = useRef([]);
  const captionRef = useRef(null);
  const verticalBorderRef = useRef(null);
  const horizontalDividerRef = useRef(null);

  useEffect(() => {
    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTorontoTime(time);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const lineHamburger = hamburger.querySelectorAll("span");
    const closeButton = closeButtonRef.current;
    const lineClose = closeButton.querySelectorAll("span");
    const menu = menuRef.current;

    gsap.set(letterRefs.current, {
      opacity: 0,
      y: 52,
      rotationX: 12,
      skewY: 2,
      filter: "blur(7px)",
      transformOrigin: "50% 100%",
    });
    gsap.set(captionRef.current, {
      opacity: 0,
      y: 52,
      rotationX: 12,
      skewY: 2,
      filter: "blur(7px)",
      transformOrigin: "50% 100%",
    });
    gsap.set(verticalBorderRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
    });
    gsap.set(horizontalDividerRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    const tlClose = gsap.timeline({ paused: true });
    tlClose
      .to(lineClose[0], { x: 60, duration: 0.75, ease: "power3.out" })
      .to(
        lineClose[1],
        { y: 60, duration: 0.75, ease: "power3.out" },
        "<+0.25",
      );

    const tlHamburger = gsap.timeline({ paused: true });
    tlHamburger.to(lineHamburger, {
      x: 60,
      stagger: { each: 0.25 },
      duration: 0.75,
      ease: "power3.out",
    });

    const handleHamburgerEnter = () => tlHamburger.play();
    const handleHamburgerLeave = () => tlHamburger.reverse();

    const handleHamburgerClick = () => {
      setIsMenuOpen(true);
      // ── CHANGE 1: lock scroll ──
      document.body.style.overflow = "hidden";

      gsap.set(letterRefs.current, {
        opacity: 0,
        y: 52,
        rotationX: 12,
        skewY: 2,
        filter: "blur(7px)",
        transformOrigin: "50% 100%",
      });
      gsap.set(captionRef.current, {
        opacity: 0,
        y: 52,
        rotationX: 12,
        skewY: 2,
        filter: "blur(7px)",
        transformOrigin: "50% 100%",
      });
      gsap.set(verticalBorderRef.current, { scaleY: 0 });
      gsap.set(horizontalDividerRef.current, { scaleX: 0 });

      const tlMenu = gsap.timeline({
        onComplete: () => {
          isDoneAnimationRef.current = true;
        },
      });

      tlMenu.set(menu, { clipPath: "inset(0 0 0 100%)" });

      tlMenu
        .to(menu, {
          clipPath: "inset(0 0 0 0%)",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          verticalBorderRef.current,
          { scaleY: 1, duration: 0.9, ease: "power3.out" },
          0.1,
        )
        .to(
          horizontalDividerRef.current,
          { scaleX: 1, duration: 0.9, ease: "power3.out" },
          0.3,
        )
        .from(
          ".fade-out",
          {
            opacity: 0,
            y: 40,
            duration: 0.55,
            ease: "power2.out",
            stagger: { each: 0.055 },
          },
          0.4,
        )
        .to(
          letterRefs.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 1.05,
            ease: "power3.out",
            stagger: 0.09,
          },
          1.0,
        )
        .to(
          captionRef.current,
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            skewY: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
          },
          1.4,
        );
    };

    const handleCloseClick = () => {
      const tlMenu = gsap.timeline({
        onComplete: () => {
          setIsMenuOpen(false);
          isDoneAnimationRef.current = false;
          // ── CHANGE 1: restore scroll ──
          document.body.style.overflow = "";
        },
      });

      if (isDoneAnimationRef.current) {
        // ── CHANGE 2: exit left → right (clip from left side) ──
        tlMenu.to(menu, {
          clipPath: "inset(0 0 0 100%)",
          duration: 0.75,
          ease: "power2.inOut",
        });
      }
    };

    const handleCloseEnter = () => tlClose.play();
    const handleCloseLeave = () => tlClose.reverse();

    hamburger.addEventListener("mouseenter", handleHamburgerEnter);
    hamburger.addEventListener("mouseleave", handleHamburgerLeave);
    hamburger.addEventListener("click", handleHamburgerClick);
    closeButton.addEventListener("click", handleCloseClick);
    closeButton.addEventListener("mouseenter", handleCloseEnter);
    closeButton.addEventListener("mouseleave", handleCloseLeave);

    return () => {
      // ── CHANGE 1: restore scroll on unmount ──
      document.body.style.overflow = "";
      hamburger.removeEventListener("mouseenter", handleHamburgerEnter);
      hamburger.removeEventListener("mouseleave", handleHamburgerLeave);
      hamburger.removeEventListener("click", handleHamburgerClick);
      closeButton.removeEventListener("click", handleCloseClick);
      closeButton.removeEventListener("mouseenter", handleCloseEnter);
      closeButton.removeEventListener("mouseleave", handleCloseLeave);
    };
  }, []);

  return (
    <div className="text-black font-google z-[999]">
      <style>{`
        @font-face {
          font-family: "Google Sans";
          font-weight: 400;
          font-style: normal;
        }
      `}</style>

      {/* Hamburger Button */}
      <button
        ref={hamburgerRef}
        className={`lg:w-10 lg:h-10 w-8 h-8 flex bg-transparent border-none cursor-pointer fixed overflow-hidden right-8 lg:top-6 lg:right-16 z-[9998] transition-opacity duration-300 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="h-px w-full bg-white rounded-sm absolute top-0 will-change-transform after:content-[''] after:absolute after:left-[-150%] after:w-full after:h-px after:rounded-sm after:bg-white"></span>
        <span className="h-px w-full bg-white rounded-sm absolute top-[10px] will-change-transform after:content-[''] after:absolute after:left-[-150%] after:w-full after:h-px after:rounded-sm after:bg-white"></span>
        <span className="h-px w-full bg-white rounded-sm absolute top-[20px] will-change-transform after:content-[''] after:absolute after:left-[-150%] after:w-full after:h-px after:rounded-sm after:bg-white"></span>
      </button>

      {/* ── CHANGE 3: border-l white/20 on the section itself ── */}
      <section
        ref={menuRef}
        className="w-full h-[100dvh] z-[9999] fixed inset-0 text-white will-change-[clip-path] flex border-l border-white/20"
        style={{
          clipPath: "inset(0 0 0 100%)",
          backdropFilter: "blur(45px)",
          WebkitBackdropFilter: "blur(45px)",
          backgroundColor: "rgba(0,0,0,0.65)",
        }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="w-10 h-10 flex bg-transparent border-none cursor-pointer absolute overflow-hidden top-8 right-12 rotate-45 z-10"
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-full bg-white rounded-sm will-change-transform before:content-[''] before:absolute before:left-[-150%] before:w-full before:h-px before:bg-current before:rounded-sm"></span>
          <span className="w-px h-full bg-white rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 before:content-[''] before:absolute before:top-[-150%] before:w-px before:h-full before:bg-current before:rounded-sm"></span>
        </button>

        {/* LEFT — blurred hero */}
        <div className="flex-1 h-full hidden md:flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.55)_100%)]" />

          <div
            className="relative z-10 text-center select-none"
            style={{ overflow: "visible" }}
          >
            <div
              className="flex items-center justify-center"
              style={{ overflow: "visible" }}
            >
              {LETTERS.map((letter, i) => (
                <span
                  key={letter}
                  ref={(el) => (letterRefs.current[i] = el)}
                  className="text-white leading-none will-change-transform"
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(3rem,6vw,6rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <p
              ref={captionRef}
              className="mt-4 text-white/35 uppercase tracking-[0.28em]"
              style={{ fontSize: "clamp(0.55rem,0.75vw,0.75rem)" }}
            >
              A design studio, built different
            </p>
          </div>

          <div className="absolute bottom-8 left-8 z-10">
            <span className="text-[10px] text-white/15 tracking-[0.2em] uppercase font-mono">
              Est. 2023
            </span>
          </div>
        </div>

        {/* Vertical Border */}
        <div
          ref={verticalBorderRef}
          className="hidden md:block w-px flex-shrink-0 will-change-transform"
          style={{ backgroundColor: "#333" }}
        />

        {/* RIGHT — narrow nav panel */}
        <div className="w-full bg-black md:w-[360px] h-full flex-shrink-0 flex flex-col pt-20 px-10 pb-10 overflow-y-auto">
          <p className="fade-out text-[9px] text-white/25 tracking-[0.3em] uppercase font-mono mb-10">
            Menu
          </p>

          <nav className="fade-out mb-auto pb-8">
            <ul className="flex flex-col gap-0">
              {NAV_LINKS.map((item) => (
                <li
                  key={item}
                  className="cursor-pointer h-max relative w-max group py-0.5"
                >
                  <span
                    className="relative tracking-tight leading-tight text-white"
                    style={{ fontSize: "clamp(1.8rem,3vw,2.6rem)" }}
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </span>
                </li>
              ))}
            </ul>
          </nav>

          {/* Connected Horizontal Divider */}
          <div
            ref={horizontalDividerRef}
            className="will-change-transform mb-8"
            style={{
              height: "1px",
              backgroundColor: "#333",
              width: "calc(100% + 40px)",
              marginLeft: "-40px",
            }}
          />

          <div className="fade-out flex flex-col gap-5">
            <div>
              <p className="text-[9px] text-white/25 tracking-[0.25em] uppercase font-mono mb-2">
                Let's Talk
              </p>
              <a
                href="mailto:contact@oguz.design"
                className="relative w-max group flex items-center gap-1"
                style={{ fontSize: "clamp(0.8rem,1.1vw,0.95rem)" }}
              >
                <span className="text-white/80">contact@oguz.design</span>
                <span className="text-white/30 text-xs">↗</span>
                <span className="absolute bottom-0 left-0 bg-white pointer-events-none w-full h-px scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
              </a>
            </div>

            <div>
              <p className="text-[9px] text-white/25 tracking-[0.25em] uppercase font-mono mb-1">
                Location
              </p>
              <p className="text-sm text-white/60">
                Mumbai (IN) &nbsp;
                <span className="text-white/25 font-mono text-xs">
                  {torontoTime}
                </span>
              </p>
            </div>

            <div>
              <p className="text-[9px] text-white/25 tracking-[0.25em] uppercase font-mono mb-3">
                Socials
              </p>
              <div className="flex items-center gap-5">
                {[
                  { icon: <IconX />, label: "X" },
                  { icon: <IconInstagram />, label: "Instagram" },
                  { icon: <IconDribbble />, label: "Dribbble" },
                  { icon: <IconLinkedIn />, label: "LinkedIn" },
                ].map(({ icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="text-white/35 hover:text-white transition-colors duration-300"
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
