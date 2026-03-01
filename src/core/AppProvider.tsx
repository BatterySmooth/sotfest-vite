import React, { useState, useEffect, type ReactNode } from "react";
import { AppContext } from "./AppContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [isTouch, setIsTouch] = useState<boolean>(window.matchMedia("(pointer: coarse)").matches);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [isNoHover, setIsNoHover] = useState<boolean>(window.matchMedia("(hover: none)").matches);

  useEffect(() => {
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
      touchQuery.removeEventListener("change", handleTouchChange);
      motionQuery.removeEventListener("change", handleMotionChange);
      hoverQuery.removeEventListener("change", handleHoverChange);
    };
  }, []);

  return (
    <AppContext.Provider value={{ isTouch, isReducedMotion, isNoHover }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
