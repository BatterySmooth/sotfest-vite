import { useEffect, useRef, type ReactNode } from "react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'

import full from "@/assets/layers/Full.png"
import layer1 from "@/assets/layers/1.png"
import layer2 from "@/assets/layers/2.png"
import fire from "@/assets/layers/fire.gif"
import layer3 from "@/assets/layers/3.png"
import layer4 from "@/assets/layers/4.png"
import layer5 from "@/assets/layers/5.png"
import layer6 from "@/assets/layers/6.jpg"
import logo from "@/assets/logo.jpg"
import xbrush from "@/assets/xbrushed.png"
import xbrush2 from "@/assets/xbrushed2.png"

interface ParallaxHeaderProps {
  disableParallax?: boolean,
  children: ReactNode,
}

interface ParallaxLayer {
  source: string,
  factor: number,
  isHero?: boolean,
  isFire?: boolean,
}

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const layers: ParallaxLayer[] = [
  { source: layer6, factor: 98 },
  { source: layer5, factor: 98 },
  { source: layer4, factor: 95 },
  { source: layer3, factor: 70 },
  { source: fire, factor: 50, isFire: true },
  { source: layer2, factor: 50 },
  { source: xbrush, factor: 80, isHero: true },
  { source: xbrush2, factor: 90, isHero: true },
  { source: logo, factor: 85, isHero: true },
  { source: layer1, factor: 0 },
];

export default function ParallaxHeader({ disableParallax, children }: ParallaxHeaderProps) {

  // Static header
  if (disableParallax) {
    return (
      <>
        <div className="header-container">
          <img src={full} className="header-layer"/>
          {layers.filter(d => d.isHero).map((data) => (
            <img src={data.source} className="header-layer header-hero"/>
          ))}
        </div>
        {children}
      </>
    );
  }

  // Parallax header
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1,
    });
  });

  useEffect(() => {
    if (!parallaxRef.current) return;

    const layersEl = parallaxRef.current.querySelectorAll<HTMLElement>('.header-layer');

    layersEl.forEach((layer, i) => {
      gsap.to(layer, {
        yPercent: layers[i].factor,
        ease: "none",
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="header-container" ref={parallaxRef}>
          {layers.map((data, index) => (
            data.isFire ?
            <div key={index} className="header-layer">
              <img
                src={data.source}
                className="header-fire"
              />
            </div>
            :
            <img
              key={index}
              src={data.source}
              className={`header-layer ${data.isHero ? ' header-hero' : ''}`}
            />
          ))}
        </div>
        {children}
      </div>
    </div>

  );
};