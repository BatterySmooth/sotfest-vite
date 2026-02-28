import styles from './LinkButton.module.css';

interface LinkButtonProps {
  href: string,
  text: string,
  image: string,
  color: React.CSSProperties['color'],
  backgroundColor: React.CSSProperties['color'],
  renderFlat?: boolean,
  rotation?: number,
  className?: string,
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, text, image, color, backgroundColor, renderFlat = false, rotation = 0, className }) => {
  const hoverRotation = rotation >= 0 ? rotation + 1 : rotation - 1;
  return (
    <a target="blank" href={href}
      className={`${styles.link} ${renderFlat ? '' : styles.weathered} ${className}`}
      style={{
        '--rotation': `${rotation}deg`,
        '--hover-rotation': `${hoverRotation}deg`,
        color: color,
        backgroundColor: backgroundColor
      } as React.CSSProperties }
    >
      <img width="64" height="64" src={image} />
      {text}
    </a>
  );
};