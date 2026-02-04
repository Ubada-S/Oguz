import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedTooltip = ({ items }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const previousIndex = useRef(null);
  const tooltipRefs = useRef({});
  const activeAnimations = useRef({});

  useEffect(() => {
    if (hoveredIndex !== null && tooltipRefs.current[hoveredIndex]) {
      const tooltip = tooltipRefs.current[hoveredIndex];
      tooltip.style.display = "flex";

      if (activeAnimations.current[hoveredIndex]) {
        activeAnimations.current[hoveredIndex].kill();
      }

      activeAnimations.current[hoveredIndex] = gsap.fromTo(
        tooltip,
        { opacity: 0, y: 20, scale: 0.6 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          onComplete: () => {
            activeAnimations.current[hoveredIndex] = null;
          },
        },
      );
    }

    if (previousIndex.current !== null) {
      const prevTooltip = tooltipRefs.current[previousIndex.current];

      if (prevTooltip) {
        if (activeAnimations.current[previousIndex.current]) {
          activeAnimations.current[previousIndex.current].kill();
        }

        activeAnimations.current[previousIndex.current] = gsap.fromTo(
          prevTooltip,
          {
            opacity: 0.8,
            y: 5,
            scale: 0.8,
          },
          {
            opacity: 0,
            rotate: 0,
            y: 20,
            scale: 0.6,
            duration: 0.3,
            ease: "none",
            onComplete: () => {
              prevTooltip.style.display = "none";
              activeAnimations.current[previousIndex.current] = null;
            },
          },
        );
      }
    }
    previousIndex.current = hoveredIndex;
  }, [hoveredIndex]);

  const handleMouseMove = (event) => {
    if (hoveredIndex !== null && tooltipRefs.current[hoveredIndex]) {
      const tooltip = tooltipRefs.current[hoveredIndex];
      if (tooltip) {
        const { offsetX } = event.nativeEvent;
        const halfWidth = event.currentTarget.offsetWidth / 2;
        const xOffset = offsetX - halfWidth;
        const rotate = xOffset === 0 ? 1 : (xOffset / 100) * 90;

        gsap.to(tooltip, {
          x: xOffset,
          rotation: rotate,
          duration: 3,
          ease: "elastic.out(1.5, 0.2)",
        });
      }
    }
  };

  return (
    <div className="flex">
      {items.map((item) => (
        <div
          className="relative group -mr-4 rounded-full"
          key={item.id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Tooltip */}
          <div
            ref={(el) => {
              if (el) tooltipRefs.current[item.id] = el;
            }}
            className="absolute -top-16 -left-1/2 flex flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2.5 min-w-32 opacity-0 whitespace-nowrap"
            style={{ display: "none" }}
          >
            <div className="absolute inset-x-7 z-30 w-[40%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
            <div className="font-bold text-white relative z-30 text-base text-center mx-auto">
              {item.name}
            </div>
            <div className="text-white text-xs text-center mx-auto">
              {item.designation}
            </div>
          </div>

          {/* Profile Image - using regular img tag */}
          <img
            onMouseMove={handleMouseMove}
            src={item.image}
            alt={item.name}
            className="object-cover rounded-full h-14 w-14 border-2 border-white transition duration-500"
          />
        </div>
      ))}
    </div>
  );
};

export { AnimatedTooltip };
