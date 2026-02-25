import './App.css';
// import { useState, useEffect, useRef } from "react"
import Countdown from './components/Countdown';
import ParallaxHeader from './components/ParallaxHeader';
import Article from './components/Article';

const App = () => {
  return (
    <>
      <ParallaxHeader>
        <Article>
          <></>
        </Article>
      </ParallaxHeader>
      <Countdown />
      <p className="disclaimer">Unofficial website</p>
    </>

  );
};

export default App