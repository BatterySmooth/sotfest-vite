import { useContext } from 'react';
import { AppContext } from '@core/AppProvider';
import { Theme } from '@core/Theme'
import type { SvgIcon } from '@/types/SvgIcon';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
  href: string,
  text: string,
  Icon: SvgIcon,
  theme?: Theme,
  color?: React.CSSProperties['color'],
  backgroundColor?: React.CSSProperties['color'],
  renderFlat?: boolean,
  rotation?: number,
  className?: string,
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, text, Icon, theme, color, backgroundColor, renderFlat = false, rotation = 0, className }) => {
  const context = useContext(AppContext);
  if (!context) throw new Error("Must be used inside AppProvider");
  
  const hoverRotationDiff = context.isReducedMotion ? 0 : 1;
  const hoverRotation = rotation >= 0 ? rotation + hoverRotationDiff : rotation - hoverRotationDiff;
  const hoverScale = context.isReducedMotion ? 1 : 1.1;
  const cssColor = color ?? `var(--theme-${theme}-d60)`;
  const cssBackgroundColor = backgroundColor ?? `var(--theme-${theme})`;
  return (
    <a target="blank" href={href}
      className={`${styles.link} ${renderFlat ? '' : styles.weathered} ${className}`}
      style={{
        '--rotation': `${rotation}deg`,
        '--hover-rotation': `${hoverRotation}deg`,
        '--hover-scale': hoverScale,
        color: cssColor,
        backgroundColor: cssBackgroundColor,
      } as React.CSSProperties }
    >
      <Icon style={{
        color: cssColor,
        width: 64,
        height: 64,
      }}/>
      {text}
    </a>
  );
};