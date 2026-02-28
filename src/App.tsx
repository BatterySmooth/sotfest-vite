import './App.css';
import { Countdown } from './components/Countdown';
import { ParallaxHeader } from './components/ParallaxHeader';
import { Article } from './components/Article';
import { useEffect, useState } from 'react';

const App = () => {

  function useShouldDisableParallax() {
    const [disable, setDisable] = useState(false);
    useEffect(() => {
      const touch = window.matchMedia("(pointer: coarse)").matches;
      const noHover = window.matchMedia("(hover: none)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDisable(touch || noHover || reducedMotion);
    }, []);
    return disable;
  }

  const disableParallax = useShouldDisableParallax();

  return (
    <>
      <ParallaxHeader disableParallax={disableParallax}>
        <Article />
      </ParallaxHeader>
      <Countdown />
      <p className="disclaimer">Unofficial website</p>
    </>

  );
};

export default App