import { useEffect } from "react"; // Added useEffect
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Lenis from "lenis"; // Added Lenis
import gsap from "gsap"; // Added GSAP for syncing
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Added ScrollTrigger for syncing

import Approach from "./components/Approach";
import Services from "./components/Services";
import ProcessSection from "./components/ProcessSection";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import ProjectsPage from "./components/ProjectsPage";
import WhyChooseUs from "./components/WhyChoose";
import PricingSection from "./components/Pricing";
import FAQSection from "./components/FAQsection";
import ProjectDetails from "./components/ProjectDetails";
import GradualBlurMemo from "./components/other/GradualBlur";

gsap.registerPlugin(ScrollTrigger);

// Helper to reset scroll on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // Add these for extra stability
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    // 2. The critical Syncing Logic
    // Using time * 1000 ensures Lenis gets milliseconds
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    // Connect to ScrollTrigger so GSAP animations know where the scroll is
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP's ticker for the loop (better performance than native RAF)
    gsap.ticker.add(tickerFn);

    // Disable lag smoothing so the scroll doesn't "skip" during heavy loads
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);
  // ──────────────────────────────────────────────────

  return (
    <Router>
      <ScrollToTop /> {/* Reset scroll position on navigation */}
      <>
        {/* Fixed vertical border rails */}
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <div className="h-full mx-[7px] lg:mx-[20px] border-x border-white/20" />
        </div>

        {/* Fixed blur effect at bottom of viewport */}
        <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-50">
          <GradualBlurMemo
            position="bottom"
            height="6rem"
            strength={1.5}
            divCount={5}
            curve="bezier"
            exponential
            opacity={0.8}
          />
        </div>

        <Routes>
          {/* ── HOME PAGE ───────────────────────── */}
          <Route
            path="/"
            element={
              <div className="overflow-hidden bg-black">
                <Hero />
                <Approach />
                <Projects />
                <WhyChooseUs />
                <Services />
                <ProcessSection />
                <PricingSection />
                <FAQSection />
              </div>
            }
          />

          <Route path="/projects" element={<ProjectsPage />} />

          {/* ── PROJECT DETAILS PAGE ───────────── */}
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Routes>
      </>
    </Router>
  );
}
