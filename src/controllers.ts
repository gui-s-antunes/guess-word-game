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

// ideal é colocar a sem acento também
const game = new Game(selectedWords);

console.log('Palavras escolhidas: ', selectedWords);
console.log('Palavras sem acento: ', selectedWordsWithoutAccent);

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

// function haveSelectedWordsAccents(selectedWords: string[]): boolean {
//   let hasAccents = false;
//   for (let i = 0; i < selectedWords.length; i++) {
//     // const slapora = selectedWords[i].match(/[^a-z]/i);
//     // console.log('slapohra: ', slapora);
//     if (selectedWords[i].match(/[^a-z]/i)) hasAccents = true;
//   }

//   return hasAccents;
// }

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
  // verificar se todas as células estão preenchidas
  // pegar as cells do row e juntar letras
  // verificar se a palavra é válida (procurar palavra na lista do words)
  // verificar se a palavra resultante é a palavra escolhida
  // se não é valida, não fazer nada (depoiis a gente faz alguma animação de falha pro user)
  console.log('submite word');

  let guessedWord = '';
  let isGuessedWordInvalid = false;

  for (let i = 0; i < cells.length; i++) {
    if (!cells[i].textContent) {
      isGuessedWordInvalid = true;
      break;
    }
    console.log('cell value: ', cells[i].textContent);
    guessedWord += cells[i].textContent;
  }

  if (isGuessedWordInvalid) return console.log('palavra incompleta');

  console.log('guessed word: ', guessedWord);

  if (!wordsWithoutAccent.includes(guessedWord.toLowerCase()))
    return console.log('palavra nao esta no data');

  // change to game.selectedWords.includes()
  console.log('selectedwords without accents: ', selectedWordsWithoutAccent);
  console.log('guessed word lowercase: ', guessedWord.toLowerCase());
  if (!selectedWordsWithoutAccent.includes(guessedWord.toLowerCase()))
    return goToNextRow(currentCellPosition, cells);

  if (selectedWordsWithoutAccent.length)
    addAccentToGuessedWord(guessedWord.toLowerCase(), cells);

  game.numOfGuessedWords++;
  goToNextRow(currentCellPosition, cells); // vai ser usado apenas se houver 2+ palavras a serem adivinhadas
}

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

function goToNextRow(
  currentCellPosition: number,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  console.log('próxima palavra');
  if (isTheLastRow()) return endGame();
  changeSelectedBlock(currentCellPosition, cells);
  // game.rowPosition++;
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
  // const currentCellPosition: number = game.cellPosition;
  // const rows = $word.getElementsByTagName('tr');
  // const cells = rows[game.rowPosition].getElementsByTagName('td');

  // const cells = getCells(game, $word);
  // selectedCell.textContent = '';
  cells[game.cellPosition].textContent = '';
  // cells[currentCellPosition].textContent = '';
}
