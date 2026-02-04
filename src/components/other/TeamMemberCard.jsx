import cardImage from "../other/card.jpg";

export default function TeamMemberCard() {
  return (
    <div className="w-64 lg:h-[25rem] bg-black border border-white/10 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <img
          src={cardImage}
          alt="Sarah Park"
          className="w-full h-64 object-cover"
        />

        {/* Availability Badge */}
        <div className="absolute bottom-4 left-4 bg-black/90 backdrop-blur-sm px-4 py-2.5 flex items-center gap-3 border border-white/20">
          {/* Animated bars */}
          <div className="flex items-end gap-[3px] h-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-full transition-all duration-1000 ${
                  i < 2 ? "bg-emerald-400" : "bg-white/20"
                }`}
                style={{
                  height: i < 2 ? "100%" : "40%",
                  animation:
                    i < 2
                      ? `pulse-bar 2s ease-in-out infinite ${i * 0.3}s`
                      : "none",
                }}
              />
            ))}
          </div>
          <span className="text-white text-sm">
            <span className="font-semibold">2 slots open</span> Sept&apos;25
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 space-y-3 ">
        {/* Name and Title */}
        <div>
          <h3 className="text-white text-xl font-semibold">Ubada Siddiqi</h3>
          <p className="text-gray-400 text-sm">Project manager</p>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2">
          <div>
            <p className="text-gray-400 text-sm">Plans start at</p>
            <p className="text-white text-lg font-semibold">$2,500 / m</p>
          </div>
          <div className="bg-white rounded-full p-2">
            <svg
              className="w-4 h-4 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-bar {
          0%,
          100% {
            height: 100%;
            opacity: 1;
          }
          50% {
            height: 60%;
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
