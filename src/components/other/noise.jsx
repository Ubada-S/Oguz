import { useRef, useEffect, useState } from "react";

const Noise = ({ opacity = 0.3 }) => {
  const containerRef = useRef(null);
  const [tiles, setTiles] = useState(1);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent) return;

    const calculate = () => {
      const parentHeight = parent.getBoundingClientRect().height;
      const count = Math.ceil(parentHeight / window.innerHeight);
      setTiles(count);
    };

    const ro = new ResizeObserver(calculate);
    ro.observe(parent);
    calculate();

    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden"
      style={{ opacity }}
    >
      {Array.from({ length: tiles }).map((_, i) => (
        <img
          key={i}
          src="/images/noise-texture.png"
          alt=""
          style={{
            display: "block",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
            flexShrink: 0,
          }}
        />
      ))}
    </div>
  );
};

export default Noise;
