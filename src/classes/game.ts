import { Words } from './words';
import { Table } from './table';
import { getCells } from '../utils/getCells';
import { callClassMethod } from '../utils/callClassMethod';

export class Game {
  private _isRunning = false;
  private _guessedLetters: string[] = [];
  private _rowPosition = 0;

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

  set isRunning(flag: boolean) {
    this._isRunning = flag;
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
    // adicionar letra
  }

  gameAction(key: string) {
    if (key === 'ArrowLeft') return this.processTablesAction('blockToLeft');
    if (key === 'ArrowRight') return this.processTablesAction('blockToRight');
    if (key === 'Backspace') return this.processTablesAction('clearBlock');
    if (key === 'Enter') return this.enterAction();
  }

  private enterAction() {
    if (!this.isBlocksFulfilled() || !this.isGuessedWordValid()) return;

    this.processTablesAction('submitGuess');
  }

  private processTablesAction(methodToCall: string) {
    for (let i = 0; i < this.tables.length; i++) {
      if (this.tables[i].isCleared) continue;
      const cells = getCells(this, this.tables[i].tableHTML);
      callClassMethod(this.tables[i], methodToCall, cells);
    }
  }

  private isBlocksFulfilled() {
    for (let i = 0; i < this.tables[0].numCells; i++) {
      if (!this.guessedLetters[i]) return false;
    }
  }

  private isGuessedWordValid() {
    const guessedWord = this.guessedLetters.join('');
    if (!this.dbWordsWithoutAccent.words.includes(guessedWord)) return false;
  }
}
