export class Table {
  private _cellPosition = 0;
  private _rowPosition = 0;
  private _isCleared = false;

  constructor(
    private readonly _tableHTML: HTMLTableElement, // private readonly _selectedWord: string,
  ) {}

  get tableHTML() {
    return this._tableHTML;
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
}
