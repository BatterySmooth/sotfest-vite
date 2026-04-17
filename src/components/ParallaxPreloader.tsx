import style from '@components/ParallaxPreloader.module.css';

export const ParallaxPreloader: React.FC = () => {
  return (
    <div className={style.loaderScreen}>
      <div className={style.spinner} />
    </div>
  );
}