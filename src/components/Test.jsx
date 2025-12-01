import React from "react";

/**
 * Day1Hero
 * Purpose: Practice responsive Tailwind layout only with gray shapes on a dark bg.
 * No images, no external assets. Only structure + spacing.
 */
export default function Day1Hero() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* NAVBAR */}
      <nav className="w-full flex justify-between items-center px-6 md:px-16 py-6 border-b border-neutral-800">
        <div className="text-xl font-semibold tracking-wide">LOGO</div>

        <div className="hidden md:flex gap-10 text-sm font-medium cursor-pointer">
          <a className="hover:text-white transition">Home</a>
          <a className="hover:text-white transition">Features</a>
          <a className="hover:text-white transition">Pricing</a>
          <a className="hover:text-white transition">Contact</a>
        </div>

        <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm font-medium transition">
          Sign In
        </button>
      </nav>

      {/* HERO */}
      <header className="px-6 md:px-16 py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            This is a test page
            <span className="text-neutral-400"> niggesh</span>
          </h1>

          <p className="mt-6 text-neutral-400 max-w-lg text-base md:text-lg leading-relaxed">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat,
            laborum fugiat quasi repudiandae vero porro suscipit laboriosam
            voluptate accusamus, aperiam similique, quas itaque modi error
            debitis sunt et illum vitae?
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button className="px-6 py-3 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-300 transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* HERO SHAPES */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 opacity-40">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-neutral-800 rounded-xl border border-neutral-700"
            ></div>
          ))}
        </div>
      </header>

      {/* FEATURES */}
      <section className="px-6 md:px-16 py-24 border-t border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-semibold">Features</h2>

        <div className="grid md:grid-cols-3 gap-10 mt-14">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-8 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition"
            >
              <div className="h-12 w-12 bg-neutral-800 rounded-lg mb-6" />
              <h3 className="text-xl font-semibold mb-3">Feature Title</h3>
              <p className="text-neutral-400 leading-relaxed">
                A brief description explaining the purpose of this section.
                Helps you practice spacing + typography rhythm.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL STRIP */}
      <section className="px-6 md:px-16 py-16 border-t border-neutral-800">
        <div className="flex flex-wrap items-center gap-6 opacity-50">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-32 bg-neutral-900 rounded-lg border border-neutral-800"
            ></div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="px-6 md:px-16 py-24 border-t border-neutral-800">
        <h2 className="text-3xl md:text-4xl font-semibold">Pricing</h2>

        <div className="mt-14 grid md:grid-cols-3 gap-10">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-10 bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-600 transition"
            >
              <div className="h-6 w-32 bg-neutral-800 rounded mb-6" />
              <div className="h-4 w-39 bg-neutral-800 rounded mb-4" />
              <div className="h-4 w-39 bg-neutral-800 rounded mb-10" />

              <div className="grid gap-3 mb-10">
                {[...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="h-4 w-full bg-neutral-800 rounded"
                  ></div>
                ))}
              </div>

              <button className="w-full px-6 py-3 border border-neutral-700 rounded-lg hover:bg-neutral-800 transition">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-16 py-12 border-t border-neutral-800 text-neutral-500 text-sm">
        © 2025 YourBrand — All rights reserved.
      </footer>
    </div>
  );
}
