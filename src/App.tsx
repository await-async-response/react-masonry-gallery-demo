import './App.css';
import MasonryGallery from './MasonryGallery/MasonryGallery';

function App() {
  return (
    <div className="App">
      <div className="masonry-container">
        <MasonryGallery images={[
          { url: '/svg/horizontal/1.svg', caption: 'Horizontal 1' },
          { url: '/svg/square/1.svg', caption: 'Square 1' },
          { url: '/svg/horizontal/2.svg', caption: 'Horizontal 2' },
          { url: '/svg/square/2.svg', caption: 'Square 2' },
          { url: '/svg/horizontal/3.svg', caption: 'Horizontal 3' },
          { url: '/svg/vertical/1.svg', caption: 'Vertical 1' },
          { url: '/svg/horizontal/4.svg', caption: 'Horizontal 4' },
          { url: '/svg/vertical/2.svg', caption: 'Vertical 2' },
          { url: '/svg/square/3.svg', caption: 'Square 3' },
          { url: '/svg/horizontal/5.svg', caption: 'Horizontal 5' },
          { url: '/svg/vertical/3.svg', caption: 'Vertical 3' },
        ]} />
      </div>
    </div>
  );
}

export default App;
