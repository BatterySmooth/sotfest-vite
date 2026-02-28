import React, { useState, useEffect, createContext, type ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

export interface AppContextProps {
  isMobile: boolean;
  isTouch: boolean
  isReducedMotion: boolean;
  isNoHover: boolean;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isTouch, setIsTouch] = useState<boolean>(window.matchMedia("(pointer: coarse)").matches);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [isNoHover, setIsNoHover] = useState<boolean>(window.matchMedia("(hover: none)").matches);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    const touchQuery = window.matchMedia("(pointer: coarse)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hoverQuery = window.matchMedia("(hover: none)");
    const handleTouchChange = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const handleHoverChange = (e: MediaQueryListEvent) => setIsNoHover(e.matches);

    touchQuery.addEventListener("change", handleTouchChange);
    motionQuery.addEventListener("change", handleMotionChange);
    hoverQuery.addEventListener("change", handleHoverChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      touchQuery.removeEventListener("change", handleTouchChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      hoverQuery.removeEventListener("change", handleHoverChange);
    };
  }, []);

  return (
    <AppContext.Provider value={{ isMobile, isTouch, isReducedMotion, isNoHover }}>
      {children}
    </AppContext.Provider>
  );
};