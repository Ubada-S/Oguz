"use client";
import React, { useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

const lerp = (start, end, factor) => start + (end - start) * factor;

const ParallaxImage = ({ src, alt, speed = 0.5 }) => {
  const imageRef = useRef(null);
  const wrapperRef = useRef(null);
  const currentY = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    const animate = () => {
      currentY.current = lerp(currentY.current, targetY.current, 0.1);

      if (
        imageRef.current &&
        Math.abs(currentY.current - targetY.current) > 0.01
      ) {
        imageRef.current.style.transform = `translateY(${currentY.current}px) scale(1.25)`;
      }

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useLenis(({ scroll }) => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const elementTop = rect.top + scroll;
    const elementHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate parallax offset
    const scrollProgress =
      (scroll - elementTop + windowHeight) / (windowHeight + elementHeight);

    // Apply parallax effect with speed multiplier
    targetY.current = (scrollProgress - 0.5) * elementHeight * speed;
  });

  return (
    <div className="image" ref={wrapperRef}>
      <img ref={imageRef} src={src} alt={alt} className="image-main" />
    </div>
  );
};

export default ParallaxImage;
