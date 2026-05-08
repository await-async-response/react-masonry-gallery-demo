import { useState } from "react";
import MasonryTile, { type TileData } from "../MasonryTile/MasonryTile";
import './MasonryGallery.css';

type MasonryGalleryProps = {
  images: TileData[];
}

function MasonryGallery({ images }: MasonryGalleryProps) {
  const [selected, setSelected] = useState<TileData | undefined>();

  return (
    <div className="masonry-gallery">
      {images.map((image, index) => (
        <MasonryTile key={`masonry-tile-${index}`} image={image} selected={selected} setSelected={setSelected} />
      ))}
      <div className="masonry-gallery__backdrop" style={{
        opacity: selected ? 1 : 0,
        pointerEvents: selected ? 'auto' : 'none',
      }} />
      <div className="masonry-gallery__caption" style={{
        opacity: selected ? 1 : 0,
        pointerEvents: selected ? 'auto' : 'none',
      }}>
        {selected ? selected.caption : ''}
      </div>
    </div>
  );
}

export default MasonryGallery;