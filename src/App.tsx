import './App.css';
import MasonryGallery from './MasonryGallery/MasonryGallery';

function App() {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <div className="App">
      <div className="masonry-container">
        <MasonryGallery images={[
          { url: `${baseUrl}svg/horizontal/1.svg`, caption: 'Horizontal 1' },
          { url: `${baseUrl}svg/square/1.svg`, caption: 'Square 1' },
          { url: `${baseUrl}svg/horizontal/2.svg`, caption: 'Horizontal 2' },
          { url: `${baseUrl}svg/square/2.svg`, caption: 'Square 2' },
          { url: `${baseUrl}svg/horizontal/3.svg`, caption: 'Horizontal 3' },
          { url: `${baseUrl}svg/vertical/1.svg`, caption: 'Vertical 1' },
          { url: `${baseUrl}svg/horizontal/4.svg`, caption: 'Horizontal 4' },
          { url: `${baseUrl}svg/vertical/2.svg`, caption: 'Vertical 2' },
          { url: `${baseUrl}svg/square/3.svg`, caption: 'Square 3' },
          { url: `${baseUrl}svg/horizontal/5.svg`, caption: 'Horizontal 5' },
          { url: `${baseUrl}svg/vertical/3.svg`, caption: 'Vertical 3' },
        ]} />
      </div>
    </div>
  );
}

export default App;
