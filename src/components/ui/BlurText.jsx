/**
 * BlurScrollText.jsx
 *
 * Drop-in scroll-triggered blur+skew text animation component.
 * Wraps any text — just replace your existing element with <BlurScrollText>.
 *
 * DEPENDENCIES (install if you haven't already):
 *   npm install gsap split-type
 *
 * USAGE:
 * ─────────────────────────────────────────────────────────────
 * 1. Import the component:
 *      import BlurScrollText from '@/components/BlurScrollText';
 *
 * 2. Wrap any text:
 *
 *      <BlurScrollText>
 *        Your paragraph text goes here.
 *      </BlurScrollText>
 *
 *      <BlurScrollText as="h1" className="text-6xl font-bold text-white">
 *        Big headline text
 *      </BlurScrollText>
 *
 * 3. Props:
 *      as          — HTML tag to render. Default: "p"
 *      className   — Tailwind or custom classes.
 *      start       — ScrollTrigger start. Default: "top bottom-=15%"
 *      end         — ScrollTrigger end.   Default: "bottom center+=15%"
 *      stagger     — Delay between words. Default: 0.04
 *      scrub       — Tied to scroll position (true) or play once (false). Default: true
 *
 * EXAMPLES:
 * ─────────────────────────────────────────────────────────────
 *
 *  // Scrubs with scroll (default)
 *  <BlurScrollText className="text-white/70 text-lg leading-relaxed max-w-xl">
 *    Full-spectrum design capabilities under one roof.
 *  </BlurScrollText>
 *
 *  // Plays once on enter
 *  <BlurScrollText as="h1" className="text-7xl font-bold text-white" scrub={false}>
 *    We Design the Future
 *  </BlurScrollText>
 *
 *  // Custom scroll positions + faster stagger
 *  <BlurScrollText as="h2" start="top 80%" end="bottom 40%" stagger={0.06}>
 *    Our Services
 *  </BlurScrollText>
 *
 * NOTE: Keep children as plain text strings.
 * Nested JSX tags (<strong>, <em> etc.) inside will not split correctly.
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// ─── Debounce utility ─────────────────────────────────────────────────────────
function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ─── TextSplitter ─────────────────────────────────────────────────────────────
class TextSplitter {
  constructor(textElement, options = {}) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error("Invalid text element provided.");
    }
    const { resizeCallback, splitTypeTypes } = options;

    this.textElement = textElement;
    this.onResize =
      typeof resizeCallback === "function" ? resizeCallback : null;

    const splitOptions = splitTypeTypes ? { types: splitTypeTypes } : {};
    this.splitText = new SplitType(this.textElement, splitOptions);

    if (this.onResize) {
      this.initResizeObserver();
    }
  }

  initResizeObserver() {
    this.previousContainerWidth = null;
    this._observer = new ResizeObserver(
      debounce((entries) => this.handleResize(entries), 100),
    );
    this._observer.observe(this.textElement);
  }

  handleResize(entries) {
    const [{ contentRect }] = entries;
    const width = Math.floor(contentRect.width);
    if (this.previousContainerWidth && this.previousContainerWidth !== width) {
      this.splitText.split();
      this.onResize();
    }
    this.previousContainerWidth = width;
  }

  getLines() {
    return this.splitText.lines;
  }
  getWords() {
    return this.splitText.words;
  }
  getChars() {
    return this.splitText.chars;
  }

  destroy() {
    if (this._observer) this._observer.disconnect();
    if (this.splitText) this.splitText.revert();
  }
}

// ─── BlurScrollEffect ─────────────────────────────────────────────────────────
class BlurScrollEffect {
  constructor(textElement, options = {}) {
    if (!textElement || !(textElement instanceof HTMLElement)) {
      throw new Error("Invalid text element provided.");
    }
    this.textElement = textElement;
    this.options = options;
    this.initializeEffect();
  }

  initializeEffect() {
    const textResizeCallback = () => this.scroll();
    this.splitter = new TextSplitter(this.textElement, {
      resizeCallback: textResizeCallback,
      splitTypeTypes: "words",
    });
    this.scroll();
  }

  scroll() {
    const words = this.splitter.getWords();
    const {
      start = "top bottom-=15%",
      end = "bottom center+=15%",
      stagger = 0.04,
      scrub = true,
    } = this.options;

    gsap.fromTo(
      words,
      {
        opacity: 0,
        skewX: -20,
        willChange: "filter, transform",
        filter: "blur(8px)",
      },
      {
        ease: "sine",
        opacity: 1,
        skewX: 0,
        filter: "blur(0px)",
        stagger,
        scrollTrigger: {
          trigger: this.textElement,
          start,
          end,
          scrub,
        },
      },
    );
  }

  destroy() {
    if (this.splitter) this.splitter.destroy();
    ScrollTrigger.getAll()
      .filter((t) => t.vars?.trigger === this.textElement)
      .forEach((t) => t.kill());
  }
}

// ─── React Component ──────────────────────────────────────────────────────────
export default function BlurScrollText({
  as: Tag = "p",
  className = "",
  children,
  start = "top bottom-=15%",
  end = "bottom center+=15%",
  stagger = 0.04,
  scrub = true,
}) {
  const ref = useRef(null);
  const effectRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (effectRef.current) effectRef.current.destroy();
    effectRef.current = new BlurScrollEffect(el, {
      start,
      end,
      stagger,
      scrub,
    });

    return () => {
      if (effectRef.current) {
        effectRef.current.destroy();
        effectRef.current = null;
      }
    };
  }, [start, end, stagger, scrub]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
