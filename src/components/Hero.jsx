import FloatingLines from "./FloatingLines";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 pointer-events-auto">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
    </section>
  );
};

export default Hero;
