import { Words } from './words';
import { Table } from './table';
import { getCells } from '../utils/getCells';
import { callClassMethod } from '../utils/callClassMethod';
import { changeKeyboardColors } from '../utils/changeKeyboardColors';
import { Menu } from './menu';

export class Game {
  private _isRunning = false;
  private _gameEnded = false;
  private _guessedLetters: string[] = [];
  private _rowPosition = 0;
  private _menu: Menu | null = null;

  constructor(
    private readonly _tables: Table[],
    private readonly dbWords: Words,
    private readonly dbWordsWithoutAccent: Words,
    private readonly selectedWords: Words,
    private readonly selectedWordsWithoutAccent: Words,
    private readonly numOfGames: number,
  ) {}

  get isRunning() {
    return this._isRunning;
  }

  get gameEnded() {
    return this._gameEnded;
  }

  pauseGame() {
    this._isRunning = false;
  }

  resumeGame() {
    this._isRunning = true;
  }

  setGuessedLetters(letter: string, pos: number) {
    const actualLetters = [...this.guessedLetters];
    actualLetters[pos] = letter;
    this._guessedLetters = actualLetters;
  }

  get guessedLetters() {
    return this._guessedLetters;
  }

  setRowPos() {
    this._rowPosition++;
  }

  get rowPosition() {
    return this._rowPosition;
  }

  set menu(menu: Menu) {
    this._menu = menu;
  }

  get menu(): Menu | null {
    return this._menu;
  }

  get tables() {
    return this._tables;
  }

  // restart page with a new number of games set
  newGame(newNumOfGames: string) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    urlParams.set('games', newNumOfGames);

    let thisURL = window.location.href;
    const paramsIndex = thisURL.indexOf('?');

    if (paramsIndex !== -1) {
      thisURL = thisURL.split('').slice(0, paramsIndex).join('');
    }

    return window.location.replace(thisURL + '?' + urlParams);
  }

  addLetterToBlock(letter: string) {
    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].isCleared) continue;

      this.guessedLetters[this.tables[i].cellPosition] = letter.toLowerCase();

      const rows = this.tables[i].tableHTML.getElementsByTagName('tr');
      const cells = rows[this.tables[i].rowPosition].getElementsByTagName('td');
      cells[this.tables[i].cellPosition].textContent = letter.toUpperCase();

      this.tables[i].blockToRight(cells);
    }
  }

  gameAction(key: string) {
    if (key === 'ArrowLeft') return this.processTablesAction('blockToLeft');
    if (key === 'ArrowRight') return this.processTablesAction('blockToRight');
    if (key === 'Backspace')
      return this.processTablesAction('clearBlock', this);
    if (key === 'Enter') return this.enterAction();
  }

  private enterAction() {
    if (!this.isBlocksFulfilled() || !this.isGuessedWordValid()) return;

    this.processTablesAction('submitGuess', this);

    this.cleanGuessedLetters();

    setTimeout(() => {
      changeKeyboardColors(this);
      this.setRowPos();

      if (!this.isLastRow() && !this.areAllTablesCleared())
        return this.resumeGame();

      // one of the tables (game word) was cleared! check if there's remaining to be cleared
      if (this.areAllTablesCleared()) return this.gameEnd('You win!');
      else if (this.isLastRow()) return this.gameEnd('You lose!');

      // There's row remaining
      return this.resumeGame();

      // // the game was cleared!
    }, 2600);
  }

  private cleanGuessedLetters() {
    this.guessedLetters.splice(0, this.guessedLetters.length);
  }

  private isLastRow() {
    return this.rowPosition === this.tables[0].numRows;
  }

  private areAllTablesCleared() {
    return this.tables.every((table) => table.isCleared);
  }

  // this games was finished
  private gameEnd(text: string) {
    this._gameEnded = true;
    this.menu?.changeMenuTitle(text);

    const wordsText = `[${this.selectedWords.words.join(', ')}]`;
    this.menu?.changeMenuWordsSelected(wordsText);

    setTimeout(() => {
      this.menu?.showMenu();
    }, 1000);
  }

  private processTablesAction(methodToCall: string, game?: Game) {
    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].isCleared) continue;
      const cells = getCells(this, this.tables[i].tableHTML);
      callClassMethod(this.tables[i], methodToCall, cells, game);
    }
  }

  private isBlocksFulfilled() {
    for (let i = 0; i < this.tables[0].numCells; i++) {
      if (!this.guessedLetters[i]) return false;
    }
    return true;
  }

  private isGuessedWordValid() {
    const guessedWord = this.guessedLetters.join('');
    if (!this.dbWordsWithoutAccent.words.includes(guessedWord)) return false;

    return true;
  }
}
