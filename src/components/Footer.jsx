import RollingLink from "./ui/RollingLink"; // ← adjust path as needed

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Work", to: "/work" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Contact", to: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "LinkedIn", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative bg-black text-white border-t border-white/20 font-google tracking-tighter overflow-hidden">
      <img
        src="/images/footer.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70 z-[1]" />
      {/* ── TOP SECTION ─────────────────────────────────────────── */}
      <div className="relative z-[2] max-w-[1920px] mx-auto px-7 lg:px-20 pt-16 lg:pt-24 pb-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          {/* LEFT — Stay connected */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4">
                Stay connected
              </h2>
              <p className="text-sm text-white/40 max-w-xs leading-relaxed">
                Join our newsletter and stay updated on the latest trends in
                digital design.
              </p>
            </div>

            {/* Email form */}
            <div className="flex items-stretch gap-0 max-w-sm border border-white/20">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder-white/25 outline-none"
              />
              <button className="px-5 py-3 bg-white text-black text-sm font-medium tracking-wide hover:bg-white/90 transition-colors duration-200 shrink-0">
                Submit
              </button>
            </div>
          </div>

          {/* RIGHT — Three columns */}
          <div className="grid grid-cols-3 gap-8">
            {/* Explore */}
            <div>
              <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-mono mb-6">
                Explore
              </p>
              <ul className="flex flex-col gap-2">
                {NAV_LINKS.map(({ label, to }) => (
                  <li key={label} className="text-base lg:text-lg font-medium">
                    <RollingLink to={to} label={label} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-mono mb-6">
                Social
              </p>
              <ul className="flex flex-col gap-2">
                {SOCIAL_LINKS.map(({ label, href }) => (
                  <li key={label} className="text-base lg:text-lg font-medium">
                    <RollingLink to={href} label={label} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <p className="text-[10px] text-white/30 tracking-[0.25em] uppercase font-mono mb-6 ">
                Contact Us
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contact@oguz.design"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200 leading-snug  break-all"
                >
                  contact@oguz.design
                </a>
                <a
                  href="tel:+12345678900"
                  className="text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  +(12) 345 678 900
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM — Giant OGUZ ──────────────────────────────────── */}
      <div className=" relative z-[2] overflow-hidden">
        <p
          className="text-white text-center font-bold leading-none select-none pointer-events-none"
          style={{
            fontSize: "clamp(6rem, 18vw, 22rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.85,
            paddingLeft: "0.05em",
          }}
        >
          OGUZ ©
        </p>
      </div>
    </footer>
  );
};

export default Footer;
