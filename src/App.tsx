import { Countdown } from './components/Countdown';
import { ParallaxHeader } from './components/ParallaxHeader';
import { Article } from './components/Article';
import './App.css';

const App = () => {
  return (
    <>
      <ParallaxHeader>
        <Article />
      </ParallaxHeader>
      <Countdown />
      <p className="disclaimer">Unofficial website</p>
    </>
  );
};

export default App