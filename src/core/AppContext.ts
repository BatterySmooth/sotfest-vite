import { createContext } from "react";

export interface AppContextProps {
  isTouch: boolean
  isReducedMotion: boolean;
  isNoHover: boolean;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);