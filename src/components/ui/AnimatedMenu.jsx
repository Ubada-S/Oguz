import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import bgimage from "../other/card.jpg";

export default function AnimatedMenu() {
  const hamburgerRef = useRef(null);
  const closeButtonRef = useRef(null);
  const menuRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageCollectionsRef = useRef(null);
  const isDoneAnimationRef = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const hamburger = hamburgerRef.current;
    const lineHamburger = hamburger.querySelectorAll("span");
    const closeButton = closeButtonRef.current;
    const lineClose = closeButton.querySelectorAll("span");
    const menu = menuRef.current;
    const imageWrapper = imageWrapperRef.current;
    const hoverLinks = gsap.utils.toArray(".hover-link");
    const imageCollections = imageCollectionsRef.current;
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function handleImageFunction() {
      const srcImage = this.dataset.image;
      const newImage = document.createElement("div");
      newImage.classList.add("absolute", "inset-0", "w-full", "h-full");
      newImage.style.zIndex = Date.now();
      const newImg = document.createElement("img");
      newImg.src = srcImage;
      newImg.alt = "";
      newImg.className = "w-full h-full object-cover";
      newImage.append(newImg);
      imageCollections.append(newImage);

      if (imageCollections.childElementCount >= 15) {
        imageCollections.firstElementChild.remove();
      }

      const tl = gsap.timeline();

      tl.fromTo(
        newImage,
        { clipPath: "inset(100% 0 0 0)", scale: 1.3 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 0.75,
          ease: "power2.out",
        },
      );
    }

    function handleHoverEffect() {
      if (!mediaQuery.matches) return;
      hoverLinks.forEach((element) => {
        element.addEventListener("mouseenter", handleImageFunction);
      });
    }

    const tlClose = gsap.timeline({
      paused: true,
    });

    tlClose
      .to(lineClose[0], {
        x: 60,
        duration: 0.75,
        ease: "power3.out",
      })
      .to(
        lineClose[1],
        {
          y: 60,
          duration: 0.75,
          ease: "power3.out",
        },
        "<+0.25",
      );

    const tlHamburger = gsap.timeline({
      paused: true,
    });

    tlHamburger.to(lineHamburger, {
      x: 60,
      stagger: {
        each: 0.25,
      },
      duration: 0.75,
      ease: "power3.out",
    });

    const handleHamburgerEnter = () => {
      tlHamburger.play();
    };

    const handleHamburgerLeave = () => {
      tlHamburger.reverse();
    };

    const handleHamburgerClick = () => {
      setIsMenuOpen(true);
      const tlMenu = gsap.timeline({
        onComplete: () => {
          isDoneAnimationRef.current = true;
        },
      });
      tlMenu.set(menu, {
        clipPath: "inset(100% 0 0 0)",
      });
      tlMenu.set(imageWrapper, {
        clipPath: "inset(100% 0 0 0)",
      });

      tlMenu
        .to(menu, {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power2.inOut",
        })
        .to(
          imageWrapper,
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1,
            ease: "power2.inOut",
          },
          "<+0.075",
        )
        .from(".fade-out", {
          opacity: 0,
          y: 50,
          duration: 0.5,
          ease: "power2.inOut",
          stagger: {
            each: "0.05",
          },
        });
    };

    const handleCloseClick = () => {
      const tlMenu = gsap.timeline({
        onComplete: () => {
          setIsMenuOpen(false);
        },
      });

      if (isDoneAnimationRef.current) {
        tlMenu
          .to(imageWrapper, {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.75,
            ease: "power2.inOut",
          })
          .to(
            menu,
            {
              clipPath: "inset(0 0 100% 0)",
              duration: 0.75,
              ease: "power2.inOut",
            },
            "<+0.075",
          );
      }
    };

    const handleCloseEnter = () => {
      tlClose.play();
    };

    const handleCloseLeave = () => {
      tlClose.reverse();
    };

    hamburger.addEventListener("mouseenter", handleHamburgerEnter);
    hamburger.addEventListener("mouseleave", handleHamburgerLeave);
    hamburger.addEventListener("click", handleHamburgerClick);
    closeButton.addEventListener("click", handleCloseClick);
    closeButton.addEventListener("mouseenter", handleCloseEnter);
    closeButton.addEventListener("mouseleave", handleCloseLeave);

    handleHoverEffect();

    const handleMediaChange = (e) => {
      if (e.matches) handleHoverEffect();
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      hamburger.removeEventListener("mouseenter", handleHamburgerEnter);
      hamburger.removeEventListener("mouseleave", handleHamburgerLeave);
      hamburger.removeEventListener("click", handleHamburgerClick);
      closeButton.removeEventListener("click", handleCloseClick);
      closeButton.removeEventListener("mouseenter", handleCloseEnter);
      closeButton.removeEventListener("mouseleave", handleCloseLeave);
      mediaQuery.removeEventListener("change", handleMediaChange);
      hoverLinks.forEach((element) => {
        element.removeEventListener("mouseenter", handleImageFunction);
      });
    };
  }, []);

  return (
    <div className="text-black font-google">
      <style jsx>{`
        @font-face {
          font-family: "Google Sans";
          font-weight: bold;
          font-style: normal;
        }
      `}</style>

      {/* Hamburger Button - Fixed/Sticky on viewport */}
      <button
        ref={hamburgerRef}
        className={`w-10 h-10 flex bg-transparent border-none cursor-pointer fixed overflow-hidden top-8 right-12 z-50 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <span className="h-px w-full bg-white rounded-sm absolute top-0 will-change-transform after:content-[''] after:absolute after:left-[-150%] after:w-full after:h-px after:rounded-sm after:bg-white"></span>
        <span className="h-px w-full bg-white rounded-sm absolute top-[10px] will-change-transform after:content-[''] after:absolute after:left-[-150%] after:w-full after:h-px after:rounded-sm after:bg-white"></span>
        <span className="h-px w-full bg-white rounded-sm absolute top-[20px] will-change-transform after:content-[''] after:absolute after:left-[-150%] after:w-full after:h-px after:rounded-sm after:bg-white"></span>
      </button>

      {/* Menu */}
      <section
        ref={menuRef}
        className="w-full h-[100dvh] bg-black z-10 fixed inset-0 text-white will-change-[clip-path]"
        style={{ clipPath: "inset(100% 0 0 0)" }}
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="w-10 h-10 flex bg-transparent border-none cursor-pointer absolute overflow-hidden top-8 right-12 rotate-45"
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px w-full bg-white rounded-sm will-change-transform before:content-[''] before:absolute before:left-[-150%] before:w-full before:h-px before:bg-current before:rounded-sm"></span>
          <span className="w-px h-full bg-white rounded-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 before:content-[''] before:absolute before:top-[-150%] before:w-px before:h-full before:bg-current before:rounded-sm"></span>
        </button>

        <section className="w-full h-full flex gap-4">
          {/* Menu Image */}
          <div className="w-[40%] h-full pr-6 hidden md:block">
            <div
              ref={imageWrapperRef}
              className="w-full h-full will-change-[clip-path]"
              style={{ clipPath: "inset(100% 0 0 0)" }}
            >
              <div
                ref={imageCollectionsRef}
                className="w-full h-full relative overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full z-[2]">
                  <img
                    src={bgimage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Menu Navigation */}
          <div className="w-full md:w-[60%] h-full pt-24 px-8 md:px-20 pb-8 md:pb-8">
            <div className="w-full h-full">
              <h1 className="text-[clamp(1.5rem,3vw,3rem)]">Discover Page</h1>

              {/* Menu List */}
              <div className="pt-6 mb-6 fade-out flex flex-col md:flex-row gap-2 md:gap-2 text-[clamp(1.5rem,3vw,3rem)]">
                <ul className="w-full md:w-1/2 h-full flex flex-col gap-4 md:gap-2 md:justify-center">
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Home
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Destinations
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Wellness
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Inovation
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Nature
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                </ul>

                <ul className="w-full md:w-1/2 h-full flex flex-col gap-4 md:gap-2 md:justify-center">
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Community
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      The Story
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      New Developments
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Press Room
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                  <li
                    className="hover-link fade-out cursor-pointer h-max relative w-max group"
                    data-image={bgimage}
                  >
                    <span className="relative">
                      Careers
                      <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="mb-6 fade-out">
                <h2 className="text-[clamp(1rem,3vw,1.35rem)]">Contact Us</h2>
                <div className="mt-4 flex gap-3 md:gap-4 text-[clamp(1rem,3vw,1.35rem)] flex-wrap">
                  <a href="#" className="relative w-max group">
                    Instagram
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                  <a href="#" className="relative w-max group">
                    Facebook
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                  <a href="#" className="relative w-max group">
                    Whatsapp
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                  <a href="#" className="relative w-max group">
                    Tiktok
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                  <a href="#" className="relative w-max group">
                    Youtube
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                </div>
              </div>

              {/* Stay Connected */}
              <div className="mb-6 fade-out">
                <h2 className="text-[clamp(1rem,3vw,1.35rem)]">
                  Stay Connected
                </h2>
                <div className="mt-4 flex gap-3 md:gap-4 items-center text-[clamp(1rem,3vw,1.35rem)] flex-wrap">
                  <a
                    href="https://balsss.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative w-max group"
                  >
                    info@creativeclub.co
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                  <span>|</span>
                  <a href="#" className="relative w-max group">
                    +62 877 8243 3529
                    <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
                  </a>
                </div>
              </div>

              {/* Policies */}
              <a
                href="#"
                className="fade-out relative w-max inline-block mt-auto group text-[clamp(1rem,3vw,1.35rem)]"
              >
                Policies and Terms
                <span className="absolute bottom-0 left-0 bg-current pointer-events-none w-full h-0.5 scale-x-0 origin-right transition-transform duration-500 ease-[cubic-bezier(0.24,0.43,0.15,0.97)] group-hover:scale-x-100 group-hover:origin-left"></span>
              </a>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
