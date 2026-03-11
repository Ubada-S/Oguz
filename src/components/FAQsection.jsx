import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqData = [
  {
    question: "How do retainers actually work?",
    answer:
      "Think of it as having a dedicated designer on your team for a flat monthly rate. You get a set number of hours each month to use however you need — whether that's one big project or lots of small requests. We sync regularly and work through your priorities systematically.",
  },
  {
    question: "What if I don't use all my hours?",
    answer:
      "Unused hours don't roll over, but we'll always flag it early so we can find ways to use them well — whether that's getting ahead on upcoming work or tackling items on your backlog. We'd rather you feel like you're getting full value every month.",
  },
  {
    question: "How fast can you start?",
    answer:
      "Typically 3–5 business days after signing. We keep onboarding light — a short kickoff call, a shared brief, and we're off. No lengthy setup processes or unnecessary back-and-forth before work begins.",
  },
  {
    question: "Who will be working on my account?",
    answer:
      "Senior designers and strategists only — not juniors or interns. You'll have a dedicated point of contact who knows your brand inside and out, with specialists brought in when the work calls for it.",
  },
  {
    question: "Can I switch between retainers and projects?",
    answer:
      "Yes. If you start with a project and want to move to a retainer, we make that transition seamless. Same goes for stepping down or pausing. We're built for flexibility, not lock-in.",
  },
  {
    question: 'What\'s included in "unlimited revisions"?',
    answer:
      "It means we iterate until you're genuinely happy — not until we run out of rounds. In practice, most projects land in 2–3 revisions because we front-load alignment before going into production. The unlimited guarantee just means you're never paying extra for refinements.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Absolutely. We work across time zones and have a fully async-first workflow. Most of our clients are remote. We use Notion, Slack, and Loom to stay aligned without requiring live calls for every decision.",
  },
  {
    question: "What if we need to pause or cancel?",
    answer:
      "You can pause or cancel with 30 days' notice. No penalties, no awkward conversations. We believe in earning your continued business through the quality of our work, not through contract clauses.",
  },
];

// ─── Accordion Item ───────────────────────────────────────────────────────────
const AccordionItem = ({ item, index, isOpen, onToggle }) => {
  const answerRef = useRef(null);
  const iconRef = useRef(null);
  const textRef = useRef(null);
  const rowRef = useRef(null);
  const isAnimRef = useRef(false);

  // Run open/close animation whenever isOpen changes
  useEffect(() => {
    const el = answerRef.current;
    const icon = iconRef.current;
    const text = textRef.current;
    if (!el || !icon || !text) return;

    if (isOpen) {
      // ── Open ──
      gsap.set(el, { display: "block" });
      gsap.fromTo(
        el,
        { height: 0 },
        { height: "auto", duration: 0.4, ease: "power2.out", overwrite: true },
      );
      gsap.fromTo(
        text,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          delay: 0.08,
          overwrite: true,
        },
      );
      gsap.to(icon, {
        rotate: 45,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    } else {
      // ── Close ──
      gsap.to(el, {
        height: 0,
        duration: 0.35,
        ease: "power2.inOut",
        overwrite: true,
        onComplete: () => gsap.set(el, { display: "none" }),
      });
      gsap.to(text, {
        opacity: 0,
        y: 6,
        duration: 0.2,
        ease: "power2.in",
        overwrite: true,
      });
      gsap.to(icon, {
        rotate: 0,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    }
  }, [isOpen]);

  // Initial set
  useEffect(() => {
    const el = answerRef.current;
    if (el) gsap.set(el, { height: 0, display: "none" });
    if (iconRef.current) gsap.set(iconRef.current, { rotate: 0 });
  }, []);

  return (
    <div
      ref={rowRef}
      className="border-b border-white/20 group cursor-pointer"
      onClick={() => onToggle(index)}
    >
      {/* Question row */}
      <div className="flex items-center justify-between py-5 px-6 transition-colors duration-200 hover:bg-white/[0.03]">
        <span
          className="text-sm font-medium pr-8 transition-colors duration-300"
          style={{
            color: isOpen ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
          }}
        >
          {item.question}
        </span>
        <span
          ref={iconRef}
          className="shrink-0 text-white/50 text-xl leading-none font-light select-none"
          style={{ willChange: "transform" }}
        >
          +
        </span>
      </div>

      {/* Answer — overflow hidden for height animation */}
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ willChange: "height" }}
      >
        <div ref={textRef} className="px-6 pb-6 pt-1">
          <p className="text-sm text-neutral-400 leading-relaxed max-w-2xl">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const FAQSection = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const accordionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // first open by default

  const handleToggle = useCallback((index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  }, []);

  // ── Section entrance ──────────────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const leftItems = leftRef.current?.querySelectorAll(".faq-anim");
      const accItems = accordionRef.current?.querySelectorAll(".border-b");

      if (leftItems?.length) {
        gsap.fromTo(
          leftItems,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }

      if (accItems?.length) {
        gsap.fromTo(
          accordionRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white border-t border-white/20 py-20 lg:py-28"
    >
      <div className="max-w-[1920px] mx-auto px-7 lg:px-20">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-0">
          {/* ── Left Column ─────────────────────────────────────────────── */}
          <div
            ref={leftRef}
            className="w-full lg:w-[320px] shrink-0 lg:pr-12 flex flex-col"
          >
            {/* Label */}
            <p className="faq-anim text-xs text-white/50 font-medium mb-6 tracking-wide">
              <span className="text-white/30">[07]</span>{" "}
              <span className="font-semibold text-white/60">Answers</span>
            </p>

            {/* Heading */}
            <h2 className="faq-anim text-[72px] lg:text-[80px] font-bold tracking-tight leading-none mb-4">
              FAQ
            </h2>

            {/* Subtitle */}
            <p className="faq-anim text-base text-neutral-400 leading-relaxed mb-16 lg:mb-auto">
              Everything else you're wondering.
            </p>

            {/* Contact block — pushed to bottom on desktop */}
            <div className="faq-anim lg:pt-24 lg:mt-auto ">
              <h4 className="text-base font-bold text-white mb-3">
                Have a question?
              </h4>
              <p className="text-sm text-white/60 leading-relaxed mb-6 max-w-[220px]">
                Reach out anytime. We're happy to answer any questions before
                you commit to working together.
              </p>

              {/* Avatar row */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-none overflow-hidden bg-white/10 shrink-0 border border-white/20">
                  {/* Placeholder avatar — replace with real image */}
                  <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center">
                    <span className="text-xs text-white/40 font-medium">
                      SP
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    Sarah Park
                  </p>
                  <p className="text-xs text-white/40 leading-tight mt-0.5">
                    Project Manager
                  </p>
                </div>
              </div>

              {/* CTA link */}
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white group"
              >
                <span className="border-b border-white/30 pb-px group-hover:border-white transition-colors duration-200">
                  Ask a question
                </span>
                <span className="text-white/60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                  ↗
                </span>
              </a>
            </div>
          </div>

          {/* ── Right Column — Accordion ────────────────────────────────── */}
          <div ref={accordionRef} className="flex-1 border-t border-white/20">
            {faqData.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={activeIndex === i}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
