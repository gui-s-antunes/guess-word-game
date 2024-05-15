console.log('Controllers.ts is here!');

import { Words, Game, Table } from './game';
import { changeKeyboardColors } from './utils/changeKeyboardColors';
import { generateWordBlocks } from './utils/generateWordBlocks';
import { getCells } from './utils/getCells';
import { getWords } from './utils/getWords';
import { removeAccents } from './utils/removeAccents';
import { selectWords } from './utils/selectWords';

export const $game = document.querySelector('.game') as HTMLDivElement;
export const $menu = document.querySelector('.menu') as HTMLDivElement;
export const $menuButtons = $menu.getElementsByTagName(
  'button',
) as HTMLCollectionOf<HTMLButtonElement>;
export const $keyboardButtons = document.getElementsByClassName('keyboard-btn');

interface GameActions {
  [key: string]: (
    table: Table,
    cells: HTMLCollectionOf<HTMLTableCellElement>,
  ) => void;
}

type fun = (
  // currentCellPosition: number,
  table: Table,
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
const csvFilePath = './assets/files/profiles2.csv';

const wordsFromData = await getWords(csvFilePath);

console.log('palavras do data: ', wordsFromData);

// generateWordBlocks($word); // mover para baixo do getWords

const words = new Words(wordsFromData);

console.log('iniciou remoção dos acentos');
const wordsWithoutAccent = removeAccents(words.words);
console.log('sem acento: ', wordsWithoutAccent);
console.log('acabou remoção dos acentos');

function getNumOfGames(urlParams: URLSearchParams) {
  if (urlParams.get('games') === '2') return 2;
  if (urlParams.get('games') === '4') return 4;

  return 1;
}

function isThereGamesParam(urlParams: URLSearchParams) {
  return urlParams.has('games');
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if (isThereGamesParam(urlParams)) $menu.style.display = 'none';

const numOfTables = getNumOfGames(urlParams);

const selectedWords = selectWords(words.words, numOfTables); //(words, numofwords)

let selectedWordsWithoutAccent: string[] = [];

// const selectedWordsHaveAccents = haveSelectedWordsAccents(selectedWords);

// if (selectedWordsHaveAccents)
selectedWordsWithoutAccent = [...removeAccents(selectedWords)];

createTables(numOfTables);
const tables = getTables();

// ideal é colocar a sem acento também
const game = new Game(selectedWords, tables, 6, 5);

for (let i = 0; i < $menuButtons.length; i++) {
  $menuButtons[i].addEventListener('click', (event) => {
    if (!event.target) return;
    const { target } = event;
    if (target) {
      const numOfGames = Number(
        (target as HTMLButtonElement).getAttribute('value'),
      );
      console.log('numOfGames', numOfGames);

      urlParams.set('games', numOfGames.toString());

      let thisURL = window.location.href;
      const paramsIndex = thisURL.indexOf('?');

      if (paramsIndex !== -1) {
        thisURL = thisURL.split('').slice(0, paramsIndex).join('');
      }

      if (game.gameIsCleared)
        return window.location.replace(thisURL + '?' + urlParams);

      if (numOfGames > 1) {
        const newWords = selectWords(words.words, numOfGames - 1);
        createTables(numOfGames - 1);
        selectedWordsWithoutAccent = [
          ...selectedWordsWithoutAccent,
          ...removeAccents(newWords),
        ];
        game.tables = [...getTables()];
        game.selectedWords = [...game.selectedWords, ...newWords];
      }

      $menu.style.display = 'none';
    }
  });
}

for (let i = 0; i < $keyboardButtons.length; i++) {
  $keyboardButtons[i].addEventListener('click', (event) => {
    if (!event.target) return;
    const { target } = event;
    const btnText = (target as HTMLButtonElement).textContent?.trim();

    if (!btnText) return;

    keyActions(btnText);
  });
}

let gameIsRunning = true;

console.log('Palavras escolhidas: ', selectedWords);
console.log('Palavras sem acento: ', selectedWordsWithoutAccent);

document.addEventListener('keydown', (event) => {
  keyActions(event.key);
});

// action from keyboard or virtual keyboard
function keyActions(key: string) {
  if (!gameIsRunning) return;

  if (key.length === 1) {
    if (isPressedKeyALetter(key)) {
      addLetterToBlock(key);
      return;
    }
  }

  gameAction(key);
}

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
function getTables(): Table[] {
  // return document.getElementsByClassName(
  //   'word',
  // ) as HTMLCollectionOf<HTMLTableElement>;

  const tables = document.getElementsByClassName(
    'word',
  ) as HTMLCollectionOf<HTMLTableElement>;
  const tablesInstanceList: Table[] = [];

  for (let i = 0; i < tables.length; i++) {
    const tableInstance = new Table(tables[i], selectedWordsWithoutAccent[i]);
    addClickToBlocks(tableInstance);
    tablesInstanceList.push(tableInstance);
  }

  return tablesInstanceList;
}

function addClickToBlocks(table: Table) {
  const blockLines = table.tableHTML.getElementsByTagName('tr');
  // const blocks = table.tableHTML.getElementsByTagName('td');

  for (let i = 0; i < blockLines.length; i++) {
    const blocks = blockLines[i].getElementsByTagName('td');

    for (let j = 0; j < blocks.length; j++) {
      blocks[j].addEventListener('click', () => {
        if (i !== game.rowPosition) return;
        blockClickEvent(j);
      });
    }
  }
}

function blockClickEvent(newPos: number) {
  for (let i = 0; i < game.tables.length; i++) {
    if (game.tables[i].isCleared) continue;
    const cells = getCells(game, game.tables[i].tableHTML);
    cells[game.tables[i].cellPosition].removeAttribute('class');
    game.tables[i].cellPosition = newPos;
    cells[game.tables[i].cellPosition].setAttribute(
      'class',
      'selectedPosition',
    );
  }
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
    if (game.tables[i].isCleared) continue;
    const cells = getCells(game, game.tables[i].tableHTML);
    fn(game.tables[i], cells);
  }

  if (key === 'Enter') {
    game.guessedLetters.splice(0, game.guessedLetters.length);
    if (isTheLastRow()) game.needsCheck = true;

    setTimeout(() => {
      changeKeyboardColors(game);
      game.rowPosition++;
      game.cellPosition = 0;

      if (!game.needsCheck) return resumeGame();

      game.needsCheck = false;

      // one of the tables (game word) was cleared! check if there's remaining to be cleared
      if (isTheGameCleared()) return clearGame();

      // the game was not cleared and there's no more rows remaining
      if (game.rowPosition + 1 > game.numRows) return endGame();

      // There's row remaining
      return resumeGame();

      // // the game was cleared!
    }, 2600);
  }
}

// checks if the user cleared all the words
function isTheGameCleared() {
  return game.numOfGuessedWords === game.selectedWords.length;
}

function addLetterToBlock(letter: string) {
  console.log('add letter to block');

  for (let i = 0; i < game.tables.length; i++) {
    if (game.tables[i].isCleared) continue;

    game.guessedLetters[game.tables[i].cellPosition] = letter.toLowerCase();

    const rows = game.tables[i].tableHTML.getElementsByTagName('tr');
    const cells = rows[game.tables[i].rowPosition].getElementsByTagName('td');
    cells[game.tables[i].cellPosition].textContent = letter.toUpperCase();

    blockToRight(game.tables[i], cells);
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
  console.log('guessedLetters fullfil: ', game.guessedLetters);
  for (let i = 0; i < game.numCells; i++) {
    console.log('guessedLetters fullfil pos: ', game.guessedLetters[i]);
    if (!game.guessedLetters[i]) return false;
  }
  return isValid;
}

function isGuessedWordValid() {
  const isValid = true;
  const guessedWord = game.guessedLetters.join('');
  if (!wordsWithoutAccent.includes(guessedWord)) return false;
  return isValid;
}

async function submitWord(
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  pauseGame();

  cells[table.cellPosition].removeAttribute('class');

  const guessedWord = game.guessedLetters.join('');

  checkCorrectLetters(table, cells, guessedWord);

  setTimeout(() => {
    if (areAllTheCellsCorrect(cells)) {
      table.isCleared = true;
      addAccentToGuessedWord(guessedWord, cells);
      game.numOfGuessedWords++;
      game.needsCheck = true;
      return;
    }

    goToNextRow(table, cells);
  }, 2500);
}

function areAllTheCellsCorrect(cells: HTMLCollectionOf<HTMLTableCellElement>) {
  const cellsArray = Array.from(cells);

  return cellsArray.every((td) => td.getAttribute('color') === 'greenBlock');
}

function checkCorrectLetters(
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
  guessedWord: string,
) {
  // for (let i = 0; i < selectedWordsWithoutAccent.length; i++) {
  const guessedWordChars = [...guessedWord];

  let letterToCheck = '';
  const colorsPos: string[] = [];

  for (let j = 0; j < guessedWordChars.length; j++) {
    if (!guessedWordChars[j]) continue;

    let indexValue = 0;
    let cont = 0;
    letterToCheck = guessedWordChars[j];

    while (indexValue !== -1) {
      indexValue = table.selectedWord.indexOf(letterToCheck, indexValue);

      if (indexValue === -1) continue;

      if (guessedWordChars[indexValue] === '') break;

      if (guessedWordChars[indexValue] === table.selectedWord[indexValue]) {
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
  // }
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
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  removeSelectedCell(table.cellPosition, cells);

  if (isTheLastRow()) return;

  changeSelectedBlock(table, cells);

  activeNewRow(table);
}

// to know which rows (chances) the player used
function activeNewRow(table: Table) {
  const newRow =
    table.tableHTML.getElementsByTagName('tr')[table.rowPosition + 1];
  newRow.setAttribute('class', 'usedRow');
  table.rowPosition++;
  table.cellPosition = 0;
}

function changeSelectedBlock(
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
  // row: HTMLTableRowElement,
) {
  cells[table.cellPosition].removeAttribute('class');

  const newCells =
    table.tableHTML.getElementsByTagName('tr')[table.rowPosition + 1];

  newCells.children[0].setAttribute('class', 'selectedPosition');
}

function clearGame() {
  console.log('You matched the word!');
  game.gameIsCleared = true;
  changeMenuTitle('You win!');
  showSelectedWordsOnMenu();
  setTimeout(() => {
    $menu.style.display = 'flex';
  }, 1000);
}

function endGame() {
  game.needsCheck = true;
  console.log('That was your last chance!');
  game.gameIsCleared = true;
  changeMenuTitle('You failed!');
  showSelectedWordsOnMenu();
  setTimeout(() => {
    $menu.style.display = 'flex';
  }, 1000);
}

function changeMenuTitle(menuText: string) {
  const titleMenu = document.getElementById('title-menu') as HTMLHeadingElement;
  titleMenu.textContent = menuText;
}

function showSelectedWordsOnMenu() {
  const menuWords = document.getElementById(
    'menu-game-words',
  ) as HTMLParagraphElement;

  menuWords.textContent = `[${game.selectedWords.join(', ')}]`;
  menuWords.style.display = 'block';
}

// next row won't exist
// this function is called after changed the rowPosition to the next one
function isTheLastRow() {
  return game.rowPosition === game.numRows - 1;
}

function blocktoLeft(
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  if (table.cellPosition > 0) {
    cells[table.cellPosition].removeAttribute('class');
    cells[table.cellPosition - 1].setAttribute('class', 'selectedPosition');
    table.cellPosition--;
  }
}

function blockToRight(
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  if (table.cellPosition < cells.length - 1) {
    cells[table.cellPosition].removeAttribute('class');
    cells[table.cellPosition + 1].setAttribute('class', 'selectedPosition');
    table.cellPosition++;
  }
}

function clearBlock(
  table: Table,
  cells: HTMLCollectionOf<HTMLTableCellElement>,
) {
  if (cells[table.cellPosition].textContent === '')
    return blocktoLeft(table, cells);

  cells[table.cellPosition].textContent = '';

  game.guessedLetters[table.cellPosition] = '';
}
