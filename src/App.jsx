import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
import ScrollProgress from "./components/ui/ScrollBar";
import Footer from "./components/Footer";
import ClickSpark from "./components/ui/ClickSpark";
import Preloader from "./components/other/Preloader";

gsap.registerPlugin(ScrollTrigger);

// ─── SPECIAL LENIS HANDLING FOR ROUTE CHANGES ───────────────────
function ScrollToTop({ lenisRef }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (lenisRef.current) {
      // Use Lenis specific scrollTo for a clean reset
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      // Fallback
      window.scrollTo(0, 0);
    }
  }, [pathname, lenisRef]);

  return null;
}

export default function App() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      orientation: "vertical",
      gestureOrientation: "vertical",
    });

    lenisRef.current = lenis;

    // 2. The critical Syncing Logic
    const tickerFn = (time) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
      lenisRef.current = null;
    };
  }, []);

  return (
    <Router>
      <ScrollToTop lenisRef={lenisRef} />
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

        <ScrollProgress />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Routes>
            {/* ── HOME PAGE ───────────────────────── */}
            <Route
              path="/"
              element={
                <div className="overflow-hidden bg-black">
                  <Preloader />
                  <Hero />
                  <Approach />
                  <Projects />

                  <WhyChooseUs />
                  <Services />
                  <ProcessSection />
                  <PricingSection />
                  <FAQSection />
                  <Footer />
                </div>
              }
            />

            <Route path="/projects" element={<ProjectsPage />} />

            {/* ── PROJECT DETAILS PAGE ───────────── */}
            <Route path="/projects/:slug" element={<ProjectDetails />} />
          </Routes>
        </ClickSpark>
      </>
    </Router>
  );
}
