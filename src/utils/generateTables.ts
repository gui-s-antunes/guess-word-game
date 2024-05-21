import { generateWordBlocks } from './generateWordBlocks';

export function generateTables(
  $game: HTMLDivElement,
  numOfTables: number,
  rows?: number,
  cells?: number,
) {
  for (let i = 0; i < numOfTables; i++) {
    const tbl = document.createElement('table');
    tbl.setAttribute('class', 'word');
    generateWordBlocks(tbl, true, rows, cells);
    $game.appendChild(tbl);
  }
}
