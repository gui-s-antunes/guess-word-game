console.log('Controllers.ts is here!');

import { Words, Game } from './game';
import { generateWordBlocks } from './utils/generateWordBlocks';
import { getCells } from './utils/getCells';
import { getWords } from './utils/getWords';
import { removeAccents } from './utils/removeAccents';
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

// const csvFilePath = './assets/files/data.csv';
const csvFilePath = './assets/files/profiles.csv';

const wordsFromData = await getWords(csvFilePath);

console.log('palavras do data: ', wordsFromData);

generateWordBlocks($word); // mover para baixo do getWords

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
const game = new Game(selectedWords, tables);

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
function createTables(numOfTables: number) {
  for (let i = 0; i < numOfTables; i++) {
    const tbl = document.createElement('table');
    tbl.setAttribute('class', 'word');
    generateWordBlocks(tbl);
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

function pauseGame() {
  gameIsRunning = false;
}

function resumeGame() {
  gameIsRunning = true;
}

async function submitWord(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  // verificar se todas as células estão preenchidas
  // pegar as cells do row e juntar letras
  // verificar se a palavra é válida (procurar palavra na lista do words)
  // verificar se a palavra resultante é a palavra escolhida
  // se não é valida, não fazer nada (depoiis a gente faz alguma animação de falha pro user)
  console.log('submite word');

  pauseGame();

  let guessedWord = '';
  let isGuessedWordInvalid = false;

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].textContent) {
      isGuessedWordInvalid = true;
      break;
    }
    console.log('cell value: ', cells[i].textContent);
    guessedWord += cells[i].textContent?.toLowerCase();
  }

  if (isGuessedWordInvalid) {
    resumeGame();
    return console.log('palavra incompleta');
  }

  console.log('guessed word: ', guessedWord);

  if (!wordsWithoutAccent.includes(guessedWord)) {
    resumeGame();
    return console.log('palavra nao esta no data');
  }

  checkCorrectLetters(cells, guessedWord);

  setTimeout(() => {
    if (!selectedWordsWithoutAccent.includes(guessedWord)) {
      return goToNextRow(currentCellPosition, cells);
    }

    if (selectedWordsWithoutAccent.length)
      addAccentToGuessedWord(guessedWord.toLowerCase(), cells);

    game.numOfGuessedWords++;
    goToNextRow(currentCellPosition, cells); // vai ser usado apenas se houver 2+ palavras a serem adivinhadas
  }, 2500);
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

function goToNextRow(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  removeSelectedCell(currentCellPosition, cells);
  console.log('próxima palavra');
  if (game.numOfGuessedWords === selectedWords.length) return clearGame();
  if (isTheLastRow()) return endGame();
  changeSelectedBlock(currentCellPosition, cells);
  activeNewRow();
  resumeGame();
  // game.rowPosition++;
}

// to know which rows (chances) the player used
function activeNewRow() {
  const rows = $word.getElementsByTagName('tr');
  rows[game.rowPosition].setAttribute('class', 'usedRow');
}

function changeSelectedBlock(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  cells[currentCellPosition].removeAttribute('class');
  game.rowPosition++;
  game.cellPosition = 0;

  const newCells = getCells(game, $word);

  newCells[game.cellPosition].setAttribute('class', 'selectedPosition');
}

function clearGame() {
  console.log('You matched the word!');
}

function endGame() {
  console.log('That was your last chance!');
}

function isTheLastRow() {
  const numOfRows = $word.getElementsByTagName('tr').length;
  return game.rowPosition === numOfRows - 1;
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
  if (cells[game.cellPosition].textContent === '')
    return blocktoLeft(currentCellPosition, cells);
  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  // const cells = getCells(game, $word);
  // selectedCell.textContent = '';
  cells[game.cellPosition].textContent = '';
  // cells[currentCellPosition].textContent = '';
}
