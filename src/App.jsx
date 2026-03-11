import Approach from "./components/Approach";
import Services from "./components/Services";
import ProcessSection from "./components/ProcessSection";

import Hero from "./components/Hero";

/* import GradualBlurMemo from "./components/other/GradualBlur"; */
import Projects from "./components/Projects";

import WhyChooseUs from "./components/WhyChoose";
import PricingSection from "./components/Pricing";
import FAQSection from "./components/FAQsection";

export default function App() {
  return (
    <>
      {/* Fixed vertical border rails */}
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <div className="h-full mx-[7px] lg:mx-[20px] border-x border-white/20" />
      </div>
      {/* Main scrollable content - no container restrictions */}
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

      {/* Fixed blur effect at bottom of viewport */}
      {/*  <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-50">
        <GradualBlurMemo
          position="bottom"
          height="6rem"
          strength={1.5}
          divCount={5}
          curve="bezier"
          exponential
          opacity={0.8}
        />
      </div> */}
    </>
  );
}
