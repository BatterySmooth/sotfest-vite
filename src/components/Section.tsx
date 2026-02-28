import type { ReactNode } from "react";
import style from './Section.module.css'

interface SectionProps {
  children: ReactNode;
}

export const Section: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className={style.section}>
      {children}
    </div>
  );
};