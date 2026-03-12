import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Approach from "./components/Approach";
import Services from "./components/Services";
import ProcessSection from "./components/ProcessSection";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import WhyChooseUs from "./components/WhyChoose";
import PricingSection from "./components/Pricing";
import FAQSection from "./components/FAQsection";
import ProjectDetails from "./components/ProjectDetails";

export default function App() {
  return (
    <Router>
      <>
        {/* Fixed vertical border rails */}
        <div className="fixed inset-0 pointer-events-none z-[9999]">
          <div className="h-full mx-[7px] lg:mx-[20px] border-x border-white/20" />
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

          {/* ── PROJECT DETAILS PAGE ───────────── */}
          <Route path="/projects/:slug" element={<ProjectDetails />} />
        </Routes>
      </>
    </Router>
  );
}
