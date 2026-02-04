import { useState } from "react";
import cardImage from "../other/card.jpg";

export default function TeamProfileCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full md:w-[19.114rem] max-w-[1000px] aspect-[16/9] md:aspect-auto md:h-[32.965rem] bg-black border border-white/10">
      {/* Image Section with Hover Effect */}
      <div className="relative w-full h-auto md:h-[27.192rem] overflow-hidden group cursor-pointer">
        <img
          src={cardImage}
          alt="Alex West"
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? "scale-110 blur-sm" : "scale-100 blur-0"
          }`}
        />

        {/* Overlay text on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center p-8 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-white text-center text-lg font-light leading-relaxed">
            With over years in digital design, Ubada founded Oguz Studio to
            reimagine how creative teams collaborate with businesses.
          </p>
        </div>

        {/* Plus icon in bottom right - ONLY THIS TRIGGERS HOVER */}
        <div
          className="absolute bottom-6 right-6 z-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-gra cursor-pointer transition-colors duration-300">
            <svg
              className="w-5 h-5 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-6 md:h-[5.773rem] max-h-[5.773rem]">
        <h3 className="text-white text-2xl font-semibold -mt-1.5">
          Ubada Siddiqi
        </h3>
        <p className="text-gray-400 text-sm mt-1">
          Founder & Creative Director
        </p>
      </div>
    </div>
  );
}
