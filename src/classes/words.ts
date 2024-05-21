export class Words {
  constructor(private readonly _words: string[]) {}

  get words() {
    return this._words;
  }
}
