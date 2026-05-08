import { useEffect, useRef } from 'react';
import './MasonryTile.css';

export type TileData = {
  url: string;
  caption?: string;
}

type MasonryTileProps = {
  image: TileData;
  selected: TileData | undefined;
  setSelected: (selected: TileData | undefined) => void;
}

function MasonryTile({ image, selected, setSelected }: MasonryTileProps) {
  const ref = useRef<HTMLImageElement>(null);
  const refSelected = useRef<HTMLImageElement>(null);
  const originalPosition = useRef<{ left: number, top: number, width: number, height: number } | null>(null);
  const transitioning = useRef(false);

  const handleSelect = () => {
    if (transitioning.current) return;
    transitioning.current = true;
    setSelected(image);
    if (ref.current) {
      const pos = ref.current.getBoundingClientRect();
      originalPosition.current = { left: pos.left, top: pos.top, width: pos.width, height: pos.height };
    }
  };

  const handleUnselect = () => {
    if (transitioning.current) return;
    if (!originalPosition.current || !refSelected.current) return;
    refSelected.current.style.left = originalPosition.current.left + 'px';
    refSelected.current.style.top = originalPosition.current.top + 'px';
    refSelected.current.style.width = originalPosition.current.width + 'px';
    refSelected.current.style.height = originalPosition.current.height + 'px';
    setTimeout(() => {
      if (refSelected.current) {
        refSelected.current.style.display = 'none';
        refSelected.current.style.left = '';
        refSelected.current.style.top = '';
        refSelected.current.style.width = '';
        refSelected.current.style.height = '';
      }
      setSelected(undefined);
      transitioning.current = false;
    }, 300);
  };

  useEffect(() => {
    if (ref.current) {
      const pos = ref.current.getBoundingClientRect();
      originalPosition.current = { left: pos.left, top: pos.top, width: pos.width, height: pos.height };
    }
  }, []);

  useEffect(() => {
    if (!originalPosition.current || !ref.current || !refSelected.current) return;
    if (selected === image && ref.current && refSelected.current) {
      refSelected.current.src = image.url;
      refSelected.current.alt = image.caption || '';
      refSelected.current.style.display = 'block';
      refSelected.current.style.position = 'fixed';
      refSelected.current.style.left = `${originalPosition.current.left}px`;
      refSelected.current.style.top = `${originalPosition.current.top}px`;
      refSelected.current.style.width = `${originalPosition.current.width}px`;
      refSelected.current.style.height = `${originalPosition.current.height}px`;
      setTimeout(() => {
        if (refSelected.current) {
          // Calculate the new position and size to center the image
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;
          const imageAspectRatio = originalPosition.current!.width / originalPosition.current!.height;
          let newWidth, newHeight;
          
          if (viewportWidth / viewportHeight > imageAspectRatio) {
            newHeight = viewportHeight;
            newWidth = newHeight * imageAspectRatio;
          } else {
            newWidth = viewportWidth;
            newHeight = newWidth / imageAspectRatio;
          }

          refSelected.current.style.left = `${(viewportWidth - newWidth) / 2}px`;
          refSelected.current.style.top = `${(viewportHeight - newHeight) / 2}px`;
          refSelected.current.style.width = `${newWidth}px`;
          refSelected.current.style.height = `${newHeight}px`;

          transitioning.current = false;
        }
      }, 0);
    }
  }, [selected]);

  return (
    <>
      <img
        ref={ref}
        src={image.url} alt={image.caption}
        className="masonry-tile"
        onClick={handleSelect}
      />
      <img
        ref={refSelected}
        src={selected === image ? image.url : undefined} alt={selected === image ? image.caption : ''}
        className="masonry-tile-selected"
        style={{ display: selected === image ? '' : 'none' }}
        onClick={handleUnselect}
      />
    </>
  );
}

export default MasonryTile;