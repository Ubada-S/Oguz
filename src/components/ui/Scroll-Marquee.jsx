import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollMarquee = ({
  text = "Ubada Siddiqi is a nice guy",
  speed = 0.1,
  textSize = "text-[120px] md:text-[150px]",
  fontWeight = "font-medium",
  gap = "mr-12", // switched to margin
  direction = "left",
  className = "",
}) => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  const xPercent = useRef(0);
  const dir = useRef(direction === "left" ? -1 : 1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(slider.current, {
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: 0.25,
          start: 0,
          end: window.innerHeight,
          onUpdate: (e) => {
            dir.current = e.direction * -1;
          },
        },
        x: "-500px",
      });

      const animate = () => {
        if (xPercent.current <= -100) xPercent.current = 0;
        if (xPercent.current > 0) xPercent.current = -100;

        gsap.set([firstText.current, secondText.current], {
          xPercent: xPercent.current,
        });

        xPercent.current += speed * dir.current;

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div className={`relative w-full overflow-hidden py-12 ${className}`}>
      <div ref={slider} className="flex whitespace-nowrap">
        <p
          ref={firstText}
          className={`${textSize} ${fontWeight} ${gap} text-white m-0`}
        >
          {text}
        </p>

        <p
          ref={secondText}
          className={`${textSize} ${fontWeight} ${gap} text-white m-0`}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default ScrollMarquee;
