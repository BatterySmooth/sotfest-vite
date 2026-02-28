import type { ReactNode } from 'react';
import style from './ColumnLayout.module.css'

interface ColumnLayoutProps {
  children: ReactNode;
}

export const ColumnLayout: React.FC<ColumnLayoutProps> = ({ children }) => {
  return (
    <main className={style.main}>
      {children}
    </main>
  );
};