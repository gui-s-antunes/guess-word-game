import { Game } from '../game';

export function getCells(
  game: Game,
  $word: HTMLTableElement,
): HTMLCollectionOf<HTMLTableCellElement> {
  const rows = $word.getElementsByTagName('tr');
  const cells = rows[game.rowPosition].getElementsByTagName('td');

  return cells;
}
