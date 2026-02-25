import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { useTransform, useScroll, motion } from "framer-motion";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

const columnTops = ["-45%", "-95%", "-45%", "-75%"];

const Column = ({ images, y, top }) => {
  return (
    <motion.div
      className="relative h-full w-1/4 min-w-[250px] flex flex-col"
      style={{ y, top, gap: "2vw" }}
    >
      {images.map((src, i) => (
        <div
          key={i}
          className="relative h-full w-full overflow-hidden rounded-[1vw]"
        >
          <img
            src={`/images/${src}`}
            alt="gallery"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default function ParallaxGallery() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main>
      {/* Gallery */}
      <div
        ref={gallery}
        className="relative flex overflow-hidden bg-[rgb(0,0,0)]"
        style={{
          height: "175vh",
          gap: "2vw",
          padding: "2vw",
          boxSizing: "border-box",
        }}
      >
        <Column
          images={[images[0], images[1], images[2]]}
          y={y}
          top={columnTops[0]}
        />
        <Column
          images={[images[3], images[4], images[5]]}
          y={y2}
          top={columnTops[1]}
        />
        <Column
          images={[images[6], images[7], images[8]]}
          y={y3}
          top={columnTops[2]}
        />
        <Column
          images={[images[9], images[10], images[11]]}
          y={y4}
          top={columnTops[3]}
        />
      </div>

      {/* Spacer */}
      <div className="h-screen bg-black" />
    </main>
  );
}
