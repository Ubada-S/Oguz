import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import styles from "./customCSS/projects.module.css";
import testImage from "./other/background.jpg";

/* The process:
  1st image: We confirm the slot and schedule a zoom call
  2
*/

const Projects = () => {
  const sliderImagesRef = useRef(null);
  const counterRef = useRef(null);
  const titlesRef = useRef(null);
  const indicatorsRef = useRef(null);
  const sliderPreviewRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(CustomEase);
    CustomEase.create(
      "hop",
      "M0,0 C0.071, 0.505 0.192, 0.726 0.318, 0.852 0.45, 0.984 0.504, 1 1, 1",
    );

    let currentImg = 1;
    const totalSlides = 5;
    let indicatorRotation = 0;

    const updateCounterAndTitlePosition = () => {
      const counterY = -20 * (currentImg - 1);
      const titleY = -60 * (currentImg - 1);

      gsap.to(counterRef.current, {
        y: counterY,
        duration: 1,
        ease: "hop",
      });

      gsap.to(titlesRef.current, {
        y: titleY,
        duration: 1,
        ease: "hop",
      });
    };

    const updateActiveSlidePreview = () => {
      const prevSlides = sliderPreviewRef.current.querySelectorAll(
        `.${styles.preview}`,
      );
      prevSlides.forEach((prev) => prev.classList.remove(styles.active));
      prevSlides[currentImg - 1].classList.add(styles.active);
    };

    const animateSlide = (direction) => {
      const allImages = sliderImagesRef.current.querySelectorAll(
        `.${styles.img}`,
      );
      const currentSlide = allImages[allImages.length - 1];

      const slideImg = document.createElement("div");
      slideImg.classList.add(styles.img);

      const slideImgElem = document.createElement("img");
      slideImgElem.classList.add(styles.image);
      slideImgElem.src = testImage; // update this for multiple images

      gsap.set(slideImgElem, { x: direction === "left" ? -300 : 300 });

      slideImg.appendChild(slideImgElem);
      sliderImagesRef.current.appendChild(slideImg);

      gsap.to(currentSlide.querySelector("img"), {
        x: direction === "left" ? 300 : -300,
        duration: 1.5,
        ease: "power4.out",
      });

      gsap.fromTo(
        slideImg,
        {
          clipPath:
            direction === "left"
              ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
              : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power4.out",
        },
      );

      gsap.to(slideImgElem, {
        x: 0,
        duration: 1.5,
        ease: "power4.out",
      });

      cleanupSlides();

      indicatorRotation += direction === "left" ? -90 : 90;
      const indicators = indicatorsRef.current.querySelectorAll("p");
      gsap.to(indicators, {
        rotate: indicatorRotation,
        duration: 1,
        ease: "hop",
      });
    };

    const cleanupSlides = () => {
      const imgElements = sliderImagesRef.current.querySelectorAll(
        `.${styles.img}`,
      );
      if (imgElements.length > totalSlides) {
        imgElements[0].remove();
      }
    };

    const handleClick = (event) => {
      const sliderWidth = sliderRef.current.clientWidth;
      const clickPosition = event.clientX;

      // Check if clicked on preview
      if (sliderPreviewRef.current.contains(event.target)) {
        const clickedPrev = event.target.closest(`.${styles.preview}`);

        if (clickedPrev) {
          const prevSlides = sliderPreviewRef.current.querySelectorAll(
            `.${styles.preview}`,
          );
          const clickedIndex = Array.from(prevSlides).indexOf(clickedPrev) + 1;

          if (clickedIndex !== currentImg) {
            if (clickedIndex < currentImg) {
              currentImg = clickedIndex;
              animateSlide("left");
            } else {
              currentImg = clickedIndex;
              animateSlide("right");
            }
            updateActiveSlidePreview();
            updateCounterAndTitlePosition();
          }
        }
        return;
      }

      // Navigate left or right
      if (clickPosition < sliderWidth / 2 && currentImg !== 1) {
        currentImg--;
        animateSlide("left");
      } else if (
        clickPosition > sliderWidth / 2 &&
        currentImg !== totalSlides
      ) {
        currentImg++;
        animateSlide("right");
      }

      updateActiveSlidePreview();
      updateCounterAndTitlePosition();
    };

    document.addEventListener("click", handleClick);

    // Cleanup
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className={styles.bodyMain}>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.sliderImages} ref={sliderImagesRef}>
          <div className={styles.img}>
            <img className={styles.image} src={testImage} alt="" />
          </div>
        </div>
        <div className={styles.sliderTitle}>
          <div className={styles.sliderTitleWrapper} ref={titlesRef}>
            <p className={styles.para}>The zoom call</p>
            <p className={styles.para}>Above the canvas</p>
            <p className={styles.para}>Harmony in every note</p>
            <p className={styles.para}>Redefining imagination</p>
            <p className={styles.para}>From earth to expression</p>
          </div>
        </div>
        <div className={styles.sliderCounter}>
          <div className={styles.counter} ref={counterRef}>
            <p className={styles.para}>1</p>
            <p className={styles.para}>2</p>
            <p className={styles.para}>3</p>
            <p className={styles.para}>4</p>
            <p className={styles.para}>5</p>
          </div>
          <div>
            <p className={styles.para}>&mdash;</p>
          </div>
          <div>
            <p className={styles.para}>5</p>
          </div>
        </div>
        <div className={styles.sliderPreview} ref={sliderPreviewRef}>
          <div className={`${styles.preview} ${styles.active}`}>
            <img className={styles.image} src={testImage} alt="" />
          </div>
          <div className={styles.preview}>
            <img className={styles.image} src={testImage} alt="" />
          </div>
          <div className={styles.preview}>
            <img className={styles.image} src={testImage} alt="" />
          </div>
          <div className={styles.preview}>
            <img className={styles.image} src={testImage} alt="" />
          </div>
          <div className={styles.preview}>
            <img className={styles.image} src={testImage} alt="" />
          </div>
        </div>
        <div className={styles.sliderIndicators} ref={indicatorsRef}>
          <p className={styles.para}>+</p>
          <p className={styles.para}>+</p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
