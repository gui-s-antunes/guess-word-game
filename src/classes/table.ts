import { Game } from './game';

export class Table {
  private _cellPosition = 0;
  private _rowPosition = 0;
  private _isCleared = false;

  constructor(
    private readonly _tableHTML: HTMLTableElement, // private readonly _selectedWord: string,
    private readonly _numRows: number,
    private readonly _numCells: number,
  ) {}

  get tableHTML() {
    return this._tableHTML;
  }

  get numRows() {
    return this._numRows;
  }

  get numCells() {
    return this._numCells;
  }

  // get selectedWord() {
  //   return this._selectedWord;
  // }

  get isCleared() {
    return this._isCleared;
  }

  set isCleared(isCleared: boolean) {
    this._isCleared = isCleared;
  }

  set cellPosition(cellPosition: number) {
    this._cellPosition = cellPosition;
  }

  get cellPosition() {
    return this._cellPosition;
  }

  set rowPosition(rowPosition: number) {
    this._rowPosition = rowPosition;
  }

  get rowPosition() {
    return this._rowPosition;
  }

  private submitGuess(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    console.log('submitGuess');
  }

  blockToLeft(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    if (this.cellPosition > 0) {
      cells[this.cellPosition].removeAttribute('class');
      cells[this.cellPosition - 1].setAttribute('class', 'selectedPosition');
      this.cellPosition--;
    }
  }

  blockToRight(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    console.log(cells);
    if (this.cellPosition < cells.length - 1) {
      cells[this.cellPosition].removeAttribute('class');
      cells[this.cellPosition + 1].setAttribute('class', 'selectedPosition');
      this.cellPosition++;
    }
  }

  clearBlock(cells: HTMLCollectionOf<HTMLTableCellElement>, game: Game) {
    if (cells[this.cellPosition].textContent === '')
      return this.blockToLeft(cells);

    cells[this.cellPosition].textContent = '';

    if (game) game.guessedLetters[this.cellPosition] = '';
  }
}
