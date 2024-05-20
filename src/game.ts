// export class Game {
//   constructor(private _numOfWords: number, private _difficulty: number) {}

//   set;
// }

export class Position {
  constructor(private _rowPosition: number, private _cellPosition: number) {}

  set rowPosition(position: number) {
    this._rowPosition = position;
  }

  get rowPosition(): number {
    return this._rowPosition;
  }

  set cellPosition(cellPosition: number) {
    this._cellPosition = cellPosition;
  }

  get cellPosition(): number {
    return this._cellPosition;
  }
}

export class Game {
  private _position: Position = new Position(0, 0);
  private _numOfGuessedWords = 0;
  private _needsCheck = false;
  private _guessedLetters: string[] = [];
  private _gameIsCleared = false;
  // private _tables: Table[] | null = null;

  constructor(
    private _selectedWords: string[],
    // private _tables: HTMLCollectionOf<HTMLTableElement>,
    private _tables: Table[],
    private _numRows: number,
    private _numCells: number,
  ) {}

  set selectedWords(selectedWords: string[]) {
    this._selectedWords = [...selectedWords];
  }

  get selectedWords(): string[] {
    return this._selectedWords;
  }

  set tables(tables: Table[]) {
    this._tables = tables;
  }

  get tables(): Table[] {
    return this._tables;
  }

  set rowPosition(position: number) {
    this._position.rowPosition = position;
  }

  get rowPosition(): number {
    return this._position.rowPosition;
  }

  set cellPosition(cellPosition: number) {
    this._position.cellPosition = cellPosition;
  }

  get cellPosition(): number {
    return this._position.cellPosition;
  }

  get numOfGuessedWords(): number {
    return this._numOfGuessedWords;
  }

  set numOfGuessedWords(newNumber: number) {
    this._numOfGuessedWords = newNumber;
  }

  set needsCheck(needsCheck: boolean) {
    this._needsCheck = needsCheck;
  }

  get needsCheck(): boolean {
    return this._needsCheck;
  }

  get guessedLetters(): string[] {
    return this._guessedLetters;
  }

  set numRows(numRows: number) {
    this._numRows = numRows;
  }

  get numRows(): number {
    return this._numRows;
  }

  set numCells(numCells: number) {
    this._numCells = numCells;
  }

  get numCells() {
    return this._numCells;
  }

  set gameIsCleared(gameIsCleared: boolean) {
    this._gameIsCleared = gameIsCleared;
  }

  get gameIsCleared() {
    return this._gameIsCleared;
  }
}

export class Words {
  constructor(private _words: string[]) {}

  set words(newWords: string[]) {
    this._words = [...newWords];
  }

  get words(): string[] {
    return this._words;
  }
}

// export class SelectedWords {
//   constructor(private _words: string[]) {}

//   set SelectedWords(words: string[]) {
//     // const randomNum = getRandomNumber(0, words.length);
//     // let randomNums: number;
//     // const selectedWords: string[] = [];
//     // for (let i = 0; i < numOfWordsToSelect; i++) {
//     //   randomNums = getRandomNumber(0, words.length);
//     //   selectedWords.push(words[randomNums]);
//     // }
//     this._words = [...words];
//   }

//   get SelectedWords(): string[] {
//     return this._words;
//   }
// }

export class Table {
  private _cellPosition = 0;
  private _rowPosition = 0;
  private _isCleared = false;

  constructor(
    private readonly _tableHTML: HTMLTableElement,
    private readonly _selectedWord: string,
  ) {}

  get tableHTML() {
    return this._tableHTML;
  }

  get selectedWord() {
    return this._selectedWord;
  }

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
}
