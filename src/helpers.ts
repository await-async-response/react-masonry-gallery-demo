import type { TileData } from "./MasonryTile/MasonryTile";

  export function calcColumnLayout(images: TileData[], container: HTMLDivElement) {
    const containerWidth = Number(getComputedStyle(container).width.split('px')[0]);
    const columns: TileData[][] = containerWidth >= 900
      ? [[], [], []]
      : containerWidth >= 600
        ? [[], []]
        : [[]];

    images.map((image, index) => {
      columns[index % columns.length].push(image);
    });

    return columns;
  };