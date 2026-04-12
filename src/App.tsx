import { AppProvider } from '@core/AppProvider';
import { ImageGallery } from '@blocks/ImageGallery';
import { AppHeader } from '@components/AppHeader';
import { ParallaxHeader } from '@components/ParallaxHeader';
import { Section } from '@components/Section';
import { SectionHeader } from '@components/SectionHeader';
// import { Article } from '@blocks/Article';
import '@/App.css';

const App = () => {
  return (
    <AppProvider>
      <ParallaxHeader>
        {/* <Article /> */}
        <ImageGallery />
        <Section>
          <SectionHeader text="Credits"/>
          <div className="credits-container">
            <p>Artwork:</p>
            <a href="https://www.instagram.com/zaque_art/" target="blank">@zaque_art</a>
          </div>
        </Section>
      </ParallaxHeader>
      <AppHeader />
      {/* <p className="disclaimer">Unofficial website</p> */}
    </AppProvider>
  );
};

export default App