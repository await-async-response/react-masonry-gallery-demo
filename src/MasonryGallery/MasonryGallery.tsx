import { useEffect, useRef, useState } from "react";
import { calcColumnLayout } from "../helpers";
import MasonryTile, { type TileData } from "../MasonryTile/MasonryTile";
import './MasonryGallery.css';

type MasonryGalleryProps = {
  images: TileData[];
  random?: boolean;
}

// Compare two layout structures to avoid unnecessary re-renders
function layoutsEqual(prev: TileData[][], next: TileData[][]): boolean {
  if (prev.length !== next.length) return false;
  return prev.every((column, i) => 
    column.length === next[i].length &&
    column.every((tile, j) => tile.url === next[i][j].url)
  );
}

function MasonryGallery({ images, random }: MasonryGalleryProps) {
  const galleryRef = useRef<HTMLDivElement>(null);
  const prevLayoutRef = useRef<TileData[][]>([[]]);
  const [selected, setSelected] = useState<TileData | undefined>();
  const [columns, setColumns] = useState<TileData[][]>([[]]);

  useEffect(() => {
    if (!galleryRef.current) return;

    let imagesToLayout = images;
    if (random) {
      imagesToLayout = [...images].sort(() => Math.random() - 0.5);
    }

    const handleResize = () => {
      if (galleryRef.current) {
        const newLayout = calcColumnLayout(imagesToLayout, galleryRef.current);
        if (!layoutsEqual(prevLayoutRef.current, newLayout)) {
          prevLayoutRef.current = newLayout;
          setColumns(newLayout);
        }
      }
    };
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(galleryRef.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, [images, random]);

  return (
    <div ref={galleryRef} className="masonry-gallery">
      {columns.map((column, columnIndex) => (
        <div key={`masonry-column-${columnIndex}`} className="masonry-gallery__column">
          {column.map((image, index) => (
            <MasonryTile key={`masonry-tile-${index}`} image={image} selected={selected} setSelected={setSelected} />
          ))}
        </div>
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