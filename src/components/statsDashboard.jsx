import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Bar heights following an upward-trending curve (30 bars, values 0-1)
const BAR_HEIGHTS = [
  0.08, 0.1, 0.09, 0.13, 0.12, 0.15, 0.14, 0.18, 0.17, 0.2, 0.22, 0.21, 0.25,
  0.24, 0.28, 0.3, 0.29, 0.34, 0.36, 0.38, 0.4, 0.43, 0.46, 0.5, 0.54, 0.58,
  0.63, 0.7, 0.8, 0.92,
];

export default function StatsDashboard() {
  const barsRef = useRef([]);

  useEffect(() => {
    // Animate bars: scaleY from 0 to 1, origin bottom
    if (barsRef.current.length > 0) {
      gsap.fromTo(
        barsRef.current,
        { scaleY: 0, transformOrigin: "bottom" },
        {
          scaleY: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "elastic.out(1, 0.6)",
          delay: 0.3,
        },
      );
    }

    return (
      <section className="bg-[#0a0a0a] min-h-screen w-full p-6 md:p-10 font-sans">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full md:grid-rows-2 md:h-[600px]">
          {/* ── CARD 1: Revenue & Growth (spans 2 cols, 2 rows) ── */}
          <div className="md:col-span-2 md:row-span-2 bg-[#111] border border-white/10 rounded-md p-6 flex flex-col justify-between overflow-hidden relative min-h-[340px]">
            {/* Top-right icon */}

            {/* Bar Graph */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-end gap-[3px] h-48 w-full px-1">
                {BAR_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    ref={(el) => (barsRef.current[i] = el)}
                    className="flex-1 bg-white/70 rounded-t-[1px]"
                    style={{ height: `${h * 100}%` }}
                  />
                ))}
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between mt-2 px-1">
                {["2016", "2018", "2022", "2024", "2026"].map((year) => (
                  <span key={year} className="text-xs text-gray-500">
                    {year}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom text */}
            <div className="mt-6">
              <p className="text-5xl font-bold text-white mb-1 tracking-tight">
                50M +
              </p>
              <p className="text-sm text-gray-400">
                Revenue generated for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  });
}
