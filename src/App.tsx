import { AppHeader } from '@components/AppHeader';
import { ParallaxHeader } from '@components/ParallaxHeader';
import { Article } from '@blocks/Article';
import '@/App.css';

const App = () => {
  return (
    <>
      <ParallaxHeader>
        <Article />
      </ParallaxHeader>
      <AppHeader />
      <p className="disclaimer">Unofficial website</p>
    </>
  );
};

export default App