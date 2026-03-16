import { useEffect, useRef } from "react";

const ScrollProgress = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${progress})`;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed right-1  top-0 h-full w-[2px] z-[9997] hidden md:block">
      {/* Track */}
      <div className="absolute inset-0 bg-white/5" />
      {/* Progress line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full bg-white origin-top will-change-transform"
        style={{ height: "100%", transform: "scaleY(0)" }}
      />
    </div>
  );
};

export default ScrollProgress;
