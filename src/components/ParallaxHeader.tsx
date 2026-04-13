import { useContext, useEffect, useRef, type ReactNode } from "react"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import type { ResponsiveImageSource } from '@/types/ResponsiveImageSource';
import { AppContext } from '@core/AppProvider';
import * as layers from '@core/ParallaxLayers';
import fire from '@assets/layers/fire.gif';
import logo from '@assets/logo.jpg';
import xbrush from '@assets/xbrushed.png';
import xbrush2 from '@assets/xbrushed2.png';
import style from '@components/ParallaxHeader.module.css';

const doHueShift = true;

interface ParallaxHeaderProps {
  children: ReactNode,
}

interface ParallaxLayer {
  source: ResponsiveImageSource | string,
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
  { source: layers.l6, factor: 98, flags: LayerFlags.HueShift },
  { source: layers.l5, factor: 98, flags: LayerFlags.HueShift },
  { source: layers.l4, factor: 95, flags: LayerFlags.HueShift },
  { source: layers.l3, factor: 70, flags: LayerFlags.HueShift },
  { source: fire,      factor: 50, flags: LayerFlags.IsFire },
  { source: layers.l2, factor: 50, flags: LayerFlags.HueShift },
  { source: xbrush,    factor: 80, flags: LayerFlags.IsHero },
  { source: xbrush2,   factor: 90, flags: LayerFlags.IsHero },
  { source: logo,      factor: 85, flags: LayerFlags.IsHero },
  { source: layers.l1, factor: 0,  flags: LayerFlags.None },
];

function hasFlags(layer: ParallaxLayer, flags: number) {
  return (layer.flags & flags) === flags;
}

function filterLayers(reduceMotion: boolean) {
  if (reduceMotion) {
    return allLayers.filter(l =>
      l.source === layers.full ||
      hasFlags(l, LayerFlags.IsHero)
    );
  }
  else {
    return allLayers.filter(l =>
      l.source !== layers.full
    );
  }
}

function renderLayer(layer: ParallaxLayer, index: number): ReactNode {
  const isFire = hasFlags(layer, LayerFlags.IsFire);
  const isHero = hasFlags(layer, LayerFlags.IsHero);
  const className = `${style.layer} ${isHero ? style.hero : ""}`;
  // Static image
  if (typeof layer.source === "string") {
    return isFire ? (
      <div key={index} className={style.layer}>
        <img src={layer.source} className={style.fire} />
      </div>
    ) : (
      <img key={index} src={layer.source} className={className} />
    );
  }
  const img = (
    <img
      src={layer.source.src}
      srcSet={layer.source.srcSet}
      sizes="100vw"
      className={isFire ? style.fire : className}
      loading="lazy"
    />
  );
  return isFire ? (
    <div key={index} className={style.layer}>
      {img}
    </div>
  ) : (
    <img
      key={index}
      src={layer.source.src}
      srcSet={layer.source.srcSet}
      sizes="100vw"
      className={className}
      loading="lazy"
    />
  );
}

export const ParallaxHeader: React.FC<ParallaxHeaderProps> = ({ children }) => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Must be used inside AppProvider");

  const layers = filterLayers(context.isReducedMotion);
  const isStatic = context.isTouch || context.isNoHover || context.isReducedMotion;
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (isStatic) return;
    ScrollSmoother.create({
      smooth: 1,
    });
  }, [isStatic]);

  useEffect(() => {
    if (isStatic) return;
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
  }, [layers, isStatic]);

  // Static header
  if (isStatic) {
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