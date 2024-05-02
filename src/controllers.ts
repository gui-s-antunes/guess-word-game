console.log('Controllers.ts is here!');

import { Words, Game } from './game';
import { generateWordBlocks } from './utils/generateWordBlocks';
import { getCells } from './utils/getCells';
import { getWords } from './utils/getWords';
import { removeAccents } from './utils/removeAccents';
import { selectWords } from './utils/selectWords';

export const $game = document.querySelector('.game') as HTMLDivElement;
// export const $word = document.querySelector('.word') as HTMLTableElement;

interface GameActions {
  [key: string]: (
    // currentCellPosition: number,
    cells: HTMLCollectionOf<HTMLTableCellElement>,
  ) => void;
}

type fun = (
  // currentCellPosition: number,
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

// const csvFilePath = './assets/files/data.csv';
const csvFilePath = './assets/files/profiles.csv';

const wordsFromData = await getWords(csvFilePath);

console.log('palavras do data: ', wordsFromData);

// generateWordBlocks($word); // mover para baixo do getWords

const words = new Words(wordsFromData);

console.log('iniciou remoção dos acentos');
const wordsWithoutAccent = removeAccents(words.words);
console.log('sem acento: ', wordsWithoutAccent);
console.log('acabou remoção dos acentos');

const selectedWords = selectWords(words.words); //(words, numofwords)

let selectedWordsWithoutAccent: string[] = [];

// const selectedWordsHaveAccents = haveSelectedWordsAccents(selectedWords);

// if (selectedWordsHaveAccents)
selectedWordsWithoutAccent = [...removeAccents(selectedWords)];

createTables(1);
const tables = getTables();

// ideal é colocar a sem acento também
const game = new Game(selectedWords, tables, 6, 5);

let gameIsRunning = true;

console.log('Palavras escolhidas: ', selectedWords);
console.log('Palavras sem acento: ', selectedWordsWithoutAccent);

document.addEventListener('keydown', (event) => {
  if (!gameIsRunning) return;
  console.log('event key: ', event.key);
  if (event.key.length === 1) {
    if (isPressedKeyALetter(event.key)) {
      addLetterToBlock(event.key);
      return;
    }
  }

  gameAction(event.key);
});

// function haveSelectedWordsAccents(selectedWords: string[]): boolean {
//   let hasAccents = false;
//   for (let i = 0; i < selectedWords.length; i++) {
//     // const slapora = selectedWords[i].match(/[^a-z]/i);
//     // console.log('slapohra: ', slapora);
//     if (selectedWords[i].match(/[^a-z]/i)) hasAccents = true;
//   }

//   return hasAccents;
// }

// creates a number of table games
function createTables(numOfTables: number, rows?: number, cells?: number) {
  for (let i = 0; i < numOfTables; i++) {
    const tbl = document.createElement('table');
    tbl.setAttribute('class', 'word');
    generateWordBlocks(tbl, rows, cells);
    $game.appendChild(tbl);
  }
}

// get all the table games
function getTables(): HTMLCollectionOf<HTMLTableElement> {
  return document.getElementsByClassName(
    'word',
  ) as HTMLCollectionOf<HTMLTableElement>;
}

function isPressedKeyALetter(key: string) {
  return key.match(/[a-z]/i);
}

function gameAction(key: string) {
  const fn: fun = gameActions[key];
  if (!fn) return;

  if (key === 'Enter') {
    if (!isBlocksFulfilled() || !isGuessedWordValid()) return;
  }

  for (let i = 0; i < game.tables.length; i++) {
    const cells = getCells(game, game.tables[i]);
    fn(cells);
  }

  if (key === 'Enter') {
    if (isTheLastRow()) game.needsCheck = true;

    setTimeout(() => {
      game.rowPosition++;
      game.cellPosition = 0;

      if (!game.needsCheck) return resumeGame();

      game.needsCheck = false;

      // one of the tables (game word) was cleared! check if there's remaining to be cleared
      if (isTheGameCleared()) return clearGame();

      // the game was not cleared and there's no more rows remaining
      if (game.rowPosition + 1 > game.numRows) return endGame();

      // There's row remaining
      resumeGame();

      // // the game was cleared!
    }, 2600);
  }
}

// checks if the user cleared all the words
function isTheGameCleared() {
  return game.numOfGuessedWords === selectedWords.length;
}

function addLetterToBlock(letter: string) {
  console.log('add letter to block');

  for (let i = 0; i < game.tables.length; i++) {
    const rows = game.tables[i].getElementsByTagName('tr');
    const cells = rows[game.rowPosition].getElementsByTagName('td');
    cells[game.cellPosition].textContent = letter.toUpperCase();

    game.guessedLetters[game.cellPosition] = letter;

    blockToRight(cells);
  }
}

function pauseGame() {
  gameIsRunning = false;
}

function resumeGame() {
  gameIsRunning = true;
}

// checks if user fullfil the blocks and word validator
function isBlocksFulfilled() {
  const isValid = true;
  for (let i = 0; i < game.numCells; i++) {
    if (!game.guessedLetters[i].length) return false;
  }
  return isValid;
}

function isGuessedWordValid() {
  const isValid = true;
  const guessedWord = game.guessedLetters.join('');
  if (!wordsWithoutAccent.includes(guessedWord)) return false;
  return isValid;
}

async function submitWord(cells: HTMLCollectionOf<HTMLTableCellElement>) {
  pauseGame();

  const guessedWord = game.guessedLetters.join('');

  checkCorrectLetters(cells, guessedWord);

  setTimeout(() => {
    if (areAllTheCellsCorrect(cells)) {
      addAccentToGuessedWord(guessedWord, cells);
      game.numOfGuessedWords++;
      game.needsCheck = true;
      return;
    }

    goToNextRow(cells);
  }, 2500);
}

function areAllTheCellsCorrect(cells: HTMLCollectionOf<HTMLTableCellElement>) {
  const cellsArray = Array.from(cells);

  return cellsArray.every((td) => td.getAttribute('color') === 'greenBlock');
}

function checkCorrectLetters(
  cells: HTMLCollectionOf<HTMLTableCellElement>,
  guessedWord: string,
) {
  for (let i = 0; i < selectedWordsWithoutAccent.length; i++) {
    const guessedWordChars = [...guessedWord];

    let letterToCheck = '';
    const colorsPos: string[] = [];

    for (let j = 0; j < guessedWordChars.length; j++) {
      if (!guessedWordChars[j]) continue;

      let indexValue = 0;
      let cont = 0;
      letterToCheck = guessedWordChars[j];

      while (indexValue !== -1) {
        indexValue = selectedWordsWithoutAccent[i].indexOf(
          letterToCheck,
          indexValue,
        );

        if (indexValue === -1) continue;

        if (guessedWordChars[indexValue] === '') break;

        if (
          guessedWordChars[indexValue] ===
          selectedWordsWithoutAccent[i][indexValue]
        ) {
          // cells[indexValue].setAttribute('color', 'greenBlock');
          colorsPos[indexValue] = 'greenBlock';
          guessedWordChars[indexValue] = '';
          indexValue++;
          continue;
        }

        cont++;
        indexValue++;
      }

      if (cont === 0) continue;

      guessedWordChars.forEach((char, index) => {
        if (cont > 0 && char === letterToCheck) {
          // cells[index].setAttribute('color', 'yellowBlock');
          colorsPos[index] = 'yellowBlock';
          cont--;
        }
      });
    }

    addColorAttributeToBlocks(cells, colorsPos);
  }
}

function addColorAttributeToBlocks(
  cells: HTMLCollectionOf<HTMLTableCellElement>,
  colorsPos: string[],
) {
  for (let i = 0; i < cells.length; i++) {
    setTimeout(() => {
      cells[i].setAttribute('color', colorsPos[i] || 'missedBlock');
    }, 0.3 * i * 1000);
  }
}

// // a letter that doesn't exist in the word
// function checkIncorrectLetters() {}

// // a letter that exists but it's on the word position
// function checkIncorrectPositionLetters() {}

function addAccentToGuessedWord(
  guessedWord: string,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  const guessedWordChars = [...guessedWord];
  for (let i = 0; i < selectedWords.length; i++) {
    if (selectedWordsWithoutAccent[i] !== guessedWord) continue;

    for (let j = 0; j < selectedWords[i].length; j++) {
      if (selectedWords[i][j] === guessedWordChars[j]) continue;
      guessedWordChars[j] = selectedWords[i][j];
    }
  }
  const guessedWordWithAccent = guessedWordChars.join('');
  blocksToGetAccent(guessedWordWithAccent, cells);
}

function blocksToGetAccent(
  guessedWordWithAccent: string,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  for (let i = 0; i < cells.length; i++) {
    if (guessedWordWithAccent[i] === cells[i].textContent) continue;
    cells[i].textContent = guessedWordWithAccent[i].toUpperCase();
  }
}

function removeSelectedCell(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  cells[currentCellPosition].removeAttribute('class');
}

function goToNextRow(cells: HTMLCollectionOf<HTMLTableCellElement>) {
  removeSelectedCell(game.cellPosition, cells);

  if (isTheLastRow()) return;

  changeSelectedBlock(cells, cells[0].parentNode as HTMLTableRowElement);

  activeNewRow(cells[0].parentNode as HTMLTableRowElement);
}

// to know which rows (chances) the player used
function activeNewRow(oldRow: HTMLTableRowElement) {
  if (!oldRow.parentNode) return;
  const newRow = oldRow.parentNode.children[oldRow.rowIndex + 1];
  newRow.setAttribute('class', 'usedRow');
}

function changeSelectedBlock(
  cells: HTMLCollectionOf<HTMLTableCellElement>,
  row: HTMLTableRowElement,
) {
  cells[game.cellPosition].removeAttribute('class');

  if (!row.parentNode) return;

  const newRow = row.parentNode.children[row.rowIndex + 1];

  const newCells = newRow.getElementsByTagName('td');

  newCells[0].setAttribute('class', 'selectedPosition');
}

function clearGame() {
  console.log('You matched the word!');
}

function endGame() {
  game.needsCheck = true;
  console.log('That was your last chance!');
}

// next row won't exist
// this function is called after changed the rowPosition to the next one
function isTheLastRow() {
  return game.rowPosition === game.numRows - 1;
}

function blocktoLeft(cells: HTMLCollectionOf<HTMLTableCellElement>) {
  console.log('move block used to left');

  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // console.log('number of rows: ', rows.length);

  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  if (game.cellPosition > 0) {
    cells[game.cellPosition].removeAttribute('class');
    cells[game.cellPosition - 1].setAttribute('class', 'selectedPosition');
    game.cellPosition = game.cellPosition - 1;
  }
}

function blockToRight(cells: HTMLCollectionOf<HTMLTableCellElement>) {
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

function clearBlock(cells: HTMLCollectionOf<HTMLTableCellElement>) {
  if (cells[game.cellPosition].textContent === '') return blocktoLeft(cells);
  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  // const cells = getCells(game, $word);
  // selectedCell.textContent = '';
  cells[game.cellPosition].textContent = '';
  // cells[currentCellPosition].textContent = '';

  game.guessedLetters[game.cellPosition] = '';
}
