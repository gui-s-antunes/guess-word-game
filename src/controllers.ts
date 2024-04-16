console.log('Controllers.ts is here!');

import { Words, Game } from './game';
import { generateWordBlocks } from './utils/generateWordBlocks';
import { getCells } from './utils/getCells';
import { getWords } from './utils/getWords';
import { selectWords } from './utils/selectWords';

export const $game = document.querySelector('.game') as HTMLDivElement;
export const $word = document.querySelector('.word') as HTMLTableElement;

interface GameActions {
  [key: string]: (
    currentCellPosition: number,
    cells: HTMLCollectionOf<HTMLTableCellElement>,
  ) => void;
}

type fun = (
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) => void;

const gameActions: GameActions = {
  ArrowRight: blockToRight,
  ArrowLeft: blocktoLeft,
  Enter: submitWord,
  Backspace: clearBlock,
};

// export interface Palavra {
//   [key: string]: number;
// }

const csvFilePath = './assets/files/data.csv';

const wordsFromData = await getWords(csvFilePath);

console.log('palavras do data: ', wordsFromData);

generateWordBlocks($word); // mover para baixo do getWords

const words = new Words(wordsFromData);

const selectedWords = selectWords(words.words); //(words, numofwords)

const game = new Game(selectedWords);

console.log('Palavras escolhidas: ', selectedWords);

document.addEventListener('keydown', (event) => {
  console.log('event key: ', event.key);
  if (event.key.length === 1) {
    if (isPressedKeyALetter(event.key)) {
      addLetterToBlock(event.key);
      return;
    }
  }

  gameAction(event.key);
});

function isPressedKeyALetter(key: string) {
  return key.match(/[a-z]/i);
}

function gameAction(key: string) {
  const fn: fun = gameActions[key];
  // console.log('fn value: ', fn);
  const currentCellPosition = game.cellPosition;
  const cells = getCells(game, $word);
  if (fn) fn(currentCellPosition, cells);
}

function addLetterToBlock(letter: string) {
  console.log('add letter to block');

  const currentCellPosition: number = game.cellPosition;
  const rows = $word.getElementsByTagName('tr');
  const cells = rows[game.rowPosition].getElementsByTagName('td');

  cells[currentCellPosition].textContent = letter.toUpperCase();

  blockToRight(game.cellPosition, getCells(game, $word));
}

function submitWord(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  console.log('submit this word try (word validator needed)');
}

function blocktoLeft(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  console.log('move block used to left');

  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // console.log('number of rows: ', rows.length);

  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  if (currentCellPosition > 0) {
    cells[currentCellPosition].removeAttribute('class');
    cells[currentCellPosition - 1].setAttribute('class', 'selectedPosition');
    game.cellPosition = currentCellPosition - 1;
  }
}

function blockToRight(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  console.log('move block used to right');

  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  // const cells = getCells(game, $word);

  if (game.cellPosition < cells.length - 1) {
    cells[game.cellPosition].removeAttribute('class');
    cells[game.cellPosition + 1].setAttribute('class', 'selectedPosition');
    game.cellPosition = game.cellPosition + 1;
  }
}

function clearBlock(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  // const cells = getCells(game, $word);
  // selectedCell.textContent = '';
  cells[game.cellPosition].textContent = '';
  // cells[currentCellPosition].textContent = '';
}
