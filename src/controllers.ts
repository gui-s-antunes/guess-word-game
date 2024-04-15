console.log('Controllers.ts is here!');

import { Words, Game } from './game';
import { generateWordBlocks } from './utils/generateWordBlocks';
import { getWords } from './utils/getWords';
import { selectWords } from './utils/selectWords';

export const $game = document.querySelector('.game') as HTMLDivElement;
export const $word = document.querySelector('.word') as HTMLTableElement;

generateWordBlocks($word);

interface GameActions {
  [key: string]: () => void;
}

const gameActions: GameActions = {
  ArrowRight: blockToRight,
  ArrowLeft: blocktoLeft,
  Enter: submitWord,
};

// export interface Palavra {
//   [key: string]: number;
// }

const csvFilePath = './assets/files/data.csv';

const wordsFromData = await getWords(csvFilePath);

console.log('palavras do data: ', wordsFromData);

const words = new Words(wordsFromData);

const selectedWords = selectWords(words.words); //(words, numofwords)

const game = new Game(selectedWords);

console.log('Palavras escolhidas: ', selectedWords);

document.addEventListener('keydown', (event) => {
  console.log('event key: ', event.key);
  if (event.key.length === 1) {
    if (isPressedKeyALetter(event.key)) {
      addLetterToBlock();
      return;
    }
  }

  gameAction(event.key);
});

function isPressedKeyALetter(key: string) {
  return key.match(/[a-z]/i);
}

function gameAction(key: string) {
  const fn = gameActions[key];
  console.log('fn value: ', fn);
  if (fn) fn();
}

function addLetterToBlock() {
  console.log('add letter to block');
}

function submitWord() {
  console.log('submit this word try (word validator needed)');
}

function blocktoLeft() {
  console.log('move block used to left');

  const currentCellPosition: number = game.cellPosition;
  const rows = $word.getElementsByTagName('tr');
  console.log('number of rows: ', rows.length);

  const cells = rows[game.rowPosition].getElementsByTagName('td');

  if (currentCellPosition > 0) {
    cells[currentCellPosition].removeAttribute('class');
    cells[currentCellPosition - 1].setAttribute('class', 'selectedPosition');
    game.cellPosition = currentCellPosition - 1;
  }
}

function blockToRight() {
  console.log('move block used to right');

  const currentCellPosition: number = game.cellPosition;
  const rows = $word.getElementsByTagName('tr');
  const cells = rows[game.rowPosition].getElementsByTagName('td');

  if (currentCellPosition < cells.length - 1) {
    cells[currentCellPosition].removeAttribute('class');
    cells[currentCellPosition + 1].setAttribute('class', 'selectedPosition');
    game.cellPosition = currentCellPosition + 1;
  }
}
