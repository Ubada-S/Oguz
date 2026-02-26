import Approach from "./components/Approach";

import Hero from "./components/Hero";
import ParallaxGallery from "./components/parllaxGallery";

import GradualBlurMemo from "./components/other/GradualBlur";
import Projects from "./components/Projects";
import ScrollMaskTransition from "./components/ScrollMaskTransition";
import AnimatedMenu from "./components/ui/AnimatedMenu";
import WhyChooseUs from "./components/WhyChoose";

export default function App() {
  return (
    <>
      {/* Main scrollable content - no container restrictions */}
      <div className="overflow-hidden">
        <Hero />
        <Approach />
        <AnimatedMenu />
        <Projects />
        <WhyChooseUs />
        <ParallaxGallery />
        <ScrollMaskTransition />
      </div>

      {/* Fixed blur effect at bottom of viewport */}
      <div className="fixed bottom-0 left-0 right-0 pointer-events-none z-50">
        <GradualBlurMemo
          position="bottom"
          height="10rem"
          strength={1.5}
          divCount={5}
          curve="bezier"
          exponential
          opacity={0.8}
        />
      </div>
    </>
  );
}
