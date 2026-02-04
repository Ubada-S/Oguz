import Approach from "./components/Approach";
import EOTC from "./components/EOTC";
import Hero from "./components/Hero";
import GradualBlurMemo from "./components/other/GradualBlur";

export default function App() {
  return (
    <>
      {/* Main scrollable content - no container restrictions */}
      <div className="overflow-hidden">
        <Hero />
        <Approach />
        <EOTC />
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
