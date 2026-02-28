import { useEffect, useRef, type ReactNode } from "react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'

import style from './ParallaxHeader.module.css'

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
  hueShift?: boolean,
  static?: boolean,
  isHero?: boolean,
  isFire?: boolean,
}

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

export const allLayers: ParallaxLayer[] = [
  { source: full,    factor: 0,  static: true },
  { source: layer6,  factor: 98, hueShift: true },
  { source: layer5,  factor: 98, hueShift: true },
  { source: layer4,  factor: 95, hueShift: true },
  { source: layer3,  factor: 70, hueShift: true },
  { source: fire,    factor: 50, isFire: true },
  { source: layer2,  factor: 50, hueShift: true },
  { source: xbrush,  factor: 80, isHero: true },
  { source: xbrush2, factor: 90, isHero: true },
  { source: logo,    factor: 85, isHero: true },
  { source: layer1,  factor: 0 },
];

const doHueShift = false;

export const ParallaxHeader: React.FC<ParallaxHeaderProps> = ({ disableParallax, children }) => {
  const layers = disableParallax
    ? allLayers.filter(d => d.static || d.isHero)
    : allLayers.filter(d => !d.static);

  // Static header
  if (disableParallax) {
    return (
      <>
        <div className={style.container}>
          {layers.filter(d => d.static || d.isHero).map((data, index) => (
            <img
              key={index}
              src={data.source}
              className={`${style.layer} ${data.isHero ? style.hero : ''}`}
            />
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

    const layersEl = parallaxRef.current.querySelectorAll<HTMLElement>(`.${style.layer}`);

    layersEl.forEach((layer, i) => {
      gsap.to(layer, {
        yPercent: layers[i].factor,
        filter: doHueShift && layers[i].hueShift ? "hue-rotate(-25deg)" : undefined,
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
        <div className={style.container} ref={parallaxRef}>
          {layers.map((data, index) => (
            data.isFire ?
            <div key={index} className={style.layer}>
              <img src={data.source} className={style.fire} />
            </div>
            :
            <img key={index} src={data.source} className={`${style.layer} ${data.isHero ? style.hero : ''}`} />
          ))}
        </div>
        <div className={style.seam}></div>
        {children}
      </div>
    </div>

  );
};