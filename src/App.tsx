import { AppProvider } from '@core/AppProvider';
import { AppHeader } from '@components/AppHeader';
import { ParallaxHeader } from '@components/ParallaxHeader';
import { ImageGallery } from '@blocks/ImageGallery';
// import { Article } from '@blocks/Article';
import '@/App.css';

const App = () => {
  return (
    <AppProvider>
      <ParallaxHeader>
        {/* <Article /> */}
        <ImageGallery />
      </ParallaxHeader>
      <AppHeader />
      {/* <p className="disclaimer">Unofficial website</p> */}
    </AppProvider>
  );
};


export default App