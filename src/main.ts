import { getWords } from './utils/getWords';
import { getNumOfGames } from './utils/getNumOfGames';
import { generateTables } from './utils/generateTables';
import { $game } from './services/htmlGameDiv';
import { getTables } from './utils/getTables';
import { selectWords } from './utils/selectWords';
import { removeAccents } from './utils/removeAccents';
import { $menu } from './services/htmlMenu';
import { Game } from './classes/game';
import { Menu } from './classes/menu';
import { Words } from './classes/words';

const wordsFilePath = './assets/files/profiles2.csv';

const listOfWordsFromFile = await getWords(wordsFilePath);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const numOfGames = getNumOfGames(urlParams);

generateTables($game, numOfGames, numOfGames + 5);
const tables = getTables();

const dbWords = new Words(listOfWordsFromFile);
const selectedWords = new Words(selectWords(listOfWordsFromFile, numOfGames));
const selectedWordsWithoutAccent = new Words([
  ...removeAccents(selectedWords.words),
]);

const game = new Game(
  tables,
  dbWords,
  selectedWords,
  selectedWordsWithoutAccent,
  numOfGames,
);

const menu = new Menu(game, $menu);
