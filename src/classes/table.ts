import { Game } from './game';

export class Table {
  private _cellPosition = 0;
  private _rowPosition = 0;
  private _isCleared = false;

  constructor(
    private readonly _tableHTML: HTMLTableElement, // private readonly _selectedWord: string,
    private readonly _selectedWord: string,
    private readonly _selectedWordWithoutAccent: string,
    private readonly _numRows: number,
    private readonly _numCells: number,
  ) {}

  get tableHTML() {
    return this._tableHTML;
  }

  get selectedWordWithoutAccent() {
    return this._selectedWordWithoutAccent;
  }

  get selectedWord() {
    return this._selectedWord;
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

  submitGuess(cells: HTMLCollectionOf<HTMLTableCellElement>, game: Game) {
    console.log('submitGuess');
    game.pauseGame();

    cells[this.cellPosition].removeAttribute('class');

    const guessedWord = game.guessedLetters.join('');

    this.checkCorrectLetters(cells, guessedWord);

    setTimeout(() => {
      if (this.areAllTheCellsCorrect(cells)) {
        this.isCleared = true;
        this.addAccentToGuessedWord(cells, guessedWord);
        return;
      }

      this.goToNextRow(cells);
    }, 2500);
  }

  private checkCorrectLetters(
    cells: HTMLCollectionOf<HTMLTableCellElement>,
    guessedWord: string,
  ) {
    const guessedWordChars = [...guessedWord];

    let letterToCheck = '';
    const colorsPos: string[] = [];

    for (let j = 0; j < guessedWordChars.length; j++) {
      if (!guessedWordChars[j]) continue;

      let indexValue = 0;
      let cont = 0;
      letterToCheck = guessedWordChars[j];

      while (indexValue !== -1) {
        indexValue = this.selectedWordWithoutAccent.indexOf(
          letterToCheck,
          indexValue,
        );

        if (indexValue === -1) continue;

        if (guessedWordChars[indexValue] === '') break;

        if (
          guessedWordChars[indexValue] ===
          this.selectedWordWithoutAccent[indexValue]
        ) {
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
          colorsPos[index] = 'yellowBlock';
          cont--;
        }
      });
    }

    this.addColorAttributeToBlocks(cells, colorsPos);
  }

  private addColorAttributeToBlocks(
    cells: HTMLCollectionOf<HTMLTableCellElement>,
    colorsPos: string[],
  ) {
    for (let i = 0; i < cells.length; i++) {
      setTimeout(() => {
        cells[i].setAttribute('color', colorsPos[i] || 'missedBlock');
      }, 0.3 * i * 1000);
    }
  }

  private areAllTheCellsCorrect(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    const cellsArray = Array.from(cells);

    return cellsArray.every((td) => td.getAttribute('color') === 'greenBlock');
  }

  private addAccentToGuessedWord(
    cells: HTMLCollectionOf<HTMLTableCellElement>,
    guessedWord: string,
  ) {
    const guessedWordChars = [...guessedWord];
    for (let i = 0; i < this.selectedWordWithoutAccent.length; i++) {
      if (this.selectedWord[i] === guessedWordChars[i]) continue;
      guessedWordChars[i] = this.selectedWord[i];
    }
    const guessedWordWithAccent = guessedWordChars.join('');
    this.blocksToGetAccent(guessedWordWithAccent, cells);
  }

  private blocksToGetAccent(
    guessedWordWithAccent: string,
    cells: HTMLCollectionOf<HTMLTableCellElement>,
  ) {
    for (let i = 0; i < cells.length; i++) {
      if (guessedWordWithAccent[i] === cells[i].textContent) continue;
      cells[i].textContent = guessedWordWithAccent[i].toUpperCase();
    }
  }

  private goToNextRow(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    this.removeSelectedCell(cells);

    const nextRow = this.getNextRow();
    if (this.isTheLastRow(nextRow)) return;

    this.changeSelectedBlock(cells, nextRow);

    this.activeNewRow(nextRow);
  }

  private removeSelectedCell(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    cells[this.cellPosition].removeAttribute('class');
  }

  private getNextRow() {
    return this.tableHTML.getElementsByTagName('tr')[this.rowPosition + 1];
  }

  private isTheLastRow(row: HTMLTableRowElement) {
    if (row === null || !row) return true;
  }

  private changeSelectedBlock(
    cells: HTMLCollectionOf<HTMLTableCellElement>,
    nextRow: HTMLTableRowElement,
  ) {
    cells[this.cellPosition].removeAttribute('class');
    nextRow.children[0].setAttribute('class', 'selectedPosition');
  }

  private activeNewRow(nextRow: HTMLTableRowElement) {
    nextRow.setAttribute('class', 'usedRow');
    this.rowPosition++;
    this.cellPosition = 0;
  }

  blockToLeft(cells: HTMLCollectionOf<HTMLTableCellElement>) {
    if (this.cellPosition > 0) {
      cells[this.cellPosition].removeAttribute('class');
      cells[this.cellPosition - 1].setAttribute('class', 'selectedPosition');
      this.cellPosition--;
    }
  }

  blockToRight(cells: HTMLCollectionOf<HTMLTableCellElement>) {
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
