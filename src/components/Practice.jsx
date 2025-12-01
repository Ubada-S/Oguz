import React from "react";

const Practice = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-6 md:px-16 py-6 border-b border-neutral-800">
        <div className="text-xl font-semibold tracking-wide">Logo</div>

        <div className="hidden md:flex gap-10 text-sm font-medium cursor-pointer">
          <a className="hover:text-white transition">Home</a>
          <a className="hover:text-white transition">Features</a>
          <a className="hover:text-white transition">Pricing</a>
          <a className="hover:text-white transition">Contact</a>
        </div>

        <button className="text-sm rounded-lg bg-neutral-800 hover:bg-neutral-700 font-medium transition px-4 py-2">
          Sign in
        </button>
      </nav>

      {/* HERO */}
      <header className="px-6 md:py-16 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            This is a test page
            <span className="text-neutral-400"> for practice</span>
          </h1>

          <p className="text-neutral-400 max-w-lg leading-relaxed mt-6 md:text-lg text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Consequuntur, tempora? Voluptatibus ipsum consectetur accusamus
            temporibus nobis id repellat, eligendi tenetur repudiandae,
            aspernatur accusantium ad sint, magnam consequuntur. Sapiente, ab
            quae.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button className="px-6 py-3 hover:bg-neutral-300 bg-white text-neutral-900 font-semibold rounded-lg">
              Get Started
            </button>
            <button className="px-6 py-3 border border-neutral-700 hover:bg-neutral-800 transition rounded-lg">
              Learn more
            </button>
          </div>
        </div>

        {/* HERO SHAPES */}
        <div className="mt-20 grid grid-col-2 sm:grid"></div>
      </header>
    </div>
  );
};

export default Practice;
