import { Words } from './words';
import { Table } from './table';

export class Game {
  constructor(
    private readonly tables: Table[],
    private readonly dbWords: Words,
    private readonly selectedWords: Words,
    private readonly selectedWordsWithoutAccent: Words,
    private readonly numOfGames: number,
  ) {}

  // setTables(numOfGames: number) {
  //   //
  // }

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
}
