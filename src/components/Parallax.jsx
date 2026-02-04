"use client";

import React from "react";
import image from "./other/test.jpg";
import "./customCSS/Parallax.css";
import { ReactLenis } from "lenis/react";
import ParallaxImage from "./other/ParallaxImage";

const Parallax = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="bodyy-ahhh">
        <div className="app">
          <section className="hero sectionn">
            <ParallaxImage src={image} alt="Hero" speed={0.5} />
          </section>
          <section className="projects sectionn">
            <ParallaxImage src={image} alt="Projects" speed={0.5} />
            <div className="projects-brief">
              <p className="paraah">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consectetur vitae molestias dignissimos iure nulla placeat,
                expedita labore inventore culpa aut distinctio commodi dolores
                aliquam, eligendi nesciunt vero sint dicta. Quis, consequatur
                magni? Aliquid, vero saepe?
              </p>
            </div>

            <div className="col projects-cover">
              <ParallaxImage src={image} alt="Projects Cover" speed={0.5} />
            </div>
            <div className="col projects-list">
              <div className="project">
                <h1 className="h11">Sunrise</h1>
                <p className="paraah">Apple Music / Spotify / Youtube</p>
              </div>
              <div className="project">
                <h1 className="h11">Echoes within</h1>
                <p className="paraah">Apple Music / Spotify / Youtube</p>
              </div>
              <div className="project">
                <h1 className="h11">Fading Memories</h1>
                <p className="paraah">Apple Music / Spotify / Youtube</p>
              </div>
              <div className="project">
                <h1 className="h11">Shadow's edge</h1>
                <p className="paraah">Apple Music / Spotify / Youtube</p>
              </div>
            </div>
          </section>
          <section className="aboutt sectionn">
            <div className="col intro">
              <p className="paraah">Introduction</p>
              <p className="paraah">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
                tempora quos, sit at inventore corrupti aperiam praesentium
                impedit aliquam quam sunt, alias molestiae iusto, odit ipsum
                suscipit ex blanditiis voluptates!
              </p>
            </div>
            <div className="col portrait">
              <div className="portrait-container">
                <ParallaxImage src={image} alt="Portrait" speed={0.5} />
              </div>
            </div>
          </section>
          <section className="banner sectionn">
            <ParallaxImage src={image} alt="Banner" speed={0.5} />

            <div className="banner-copy">
              <p className="paraah">Be the</p>
              <h1 className="h11">First to know</h1>
              <p className="paraah">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero
                harum quos eius vitae saepe repellendus.
              </p>
              <button className="butan">Join the newsletter</button>
            </div>
          </section>
          <section className="footerr sectionn">
            <div className="col">
              <p className="paraah">Instagram / Tiktok / Discord</p>
              <div className="footer-links">
                <p className="paraah">Menu</p>
                <h1 className="h11">Tour</h1>
                <h1 className="h11">Tour</h1>
                <h1 className="h11">Tour</h1>
                <h1 className="h11">Tour</h1>
              </div>
              <p className="paraah">&copy; Designed by ubada</p>
            </div>
            <div className="col">
              <p className="paraah">
                Join the newsletter <br />
                <button className="butan">Subscribe</button>
              </p>

              <div className="shopp">
                <ParallaxImage src={image} alt="Shop" speed={0.5} />
              </div>

              <p className="paraah">Spotify / Apple Music / Youtube</p>
            </div>
          </section>
        </div>
      </div>
    </ReactLenis>
  );
};

export default Parallax;
