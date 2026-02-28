import { useContext, useEffect, useRef, type ReactNode } from "react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import { AppContext } from "../core/AppProvider"

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
  children: ReactNode,
}

interface ParallaxLayer {
  source: string,
  factor: number,
  flags: number,
}

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

const LayerFlags = {
  None: 0,
  HueShift: 1 << 0,
  IsHero: 1 << 1,
  IsFire: 1 << 2,
} as const;

const allLayers: ParallaxLayer[] = [
  { source: full,    factor: 0,  flags: LayerFlags.None },
  { source: layer6,  factor: 98, flags: LayerFlags.HueShift }, 
  { source: layer5,  factor: 98, flags: LayerFlags.HueShift },
  { source: layer4,  factor: 95, flags: LayerFlags.HueShift },
  { source: layer3,  factor: 70, flags: LayerFlags.HueShift },
  { source: fire,    factor: 50, flags: LayerFlags.IsFire },
  { source: layer2,  factor: 50, flags: LayerFlags.HueShift },
  { source: xbrush,  factor: 80, flags: LayerFlags.IsHero },
  { source: xbrush2, factor: 90, flags: LayerFlags.IsHero },
  { source: logo,    factor: 85, flags: LayerFlags.IsHero },
  { source: layer1,  factor: 0,  flags: LayerFlags.None },
];

function hasFlags(layer: ParallaxLayer, flags: number) {
  return (layer.flags & flags) === flags;
}

function filterLayers(reduceMotion: boolean) {
  if (reduceMotion) {
    return allLayers.filter(l =>
      l.source === full ||
      hasFlags(l, LayerFlags.IsHero)
    );
  }
  else {
    return allLayers.filter(l =>
      l.source !== full
    );
  }
}

function renderLayer(layer: ParallaxLayer, index: number): ReactNode {
  return (
    hasFlags(layer, LayerFlags.IsFire) ?
    <div key={index} className={style.layer}>
      <img src={layer.source} className={style.fire} />
    </div>
    :
    <img key={index} src={layer.source} className={`${style.layer} ${hasFlags(layer, LayerFlags.IsHero) ? style.hero : ''}`} />
  );
}

const doHueShift = false;

export const ParallaxHeader: React.FC<ParallaxHeaderProps> = ({ children }) => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Must be used inside AppProvider");

  const layers = filterLayers(context.isReducedMotion);

  // Static header
  if (context.isTouch || context.isNoHover || context.isReducedMotion) {
    return (
      <>
        <div className={style.container}>
          {layers.map(renderLayer)}
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
        filter: doHueShift && hasFlags(layers[i], LayerFlags.HueShift) ? "hue-rotate(-25deg)" : undefined,
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
          {layers.map(renderLayer)}
        </div>
        <div className={style.seam}></div>
        {children}
      </div>
    </div>

  );
};