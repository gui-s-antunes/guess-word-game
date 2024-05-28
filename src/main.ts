import { getWords } from './utils/getWords';
import { getNumOfGames } from './utils/getNumOfGames';
import { generateTables } from './utils/generateTables';
import { $game } from './services/htmlGameDiv';
import { getTables } from './utils/getTables';
import { selectWords } from './utils/selectWords';
import { removeAccents } from './utils/removeAccents';
import { $menu } from './services/htmlMenu';
import { $keyboardContainer } from './services/htmlVirtualKeyboard';
import { Game } from './classes/game';
import { Menu } from './classes/menu';
import { Words } from './classes/words';
import { Keyboard } from './classes/keyboard';

const wordsFilePath = './assets/files/profiles2.csv';

const listOfWordsFromFile = await getWords(wordsFilePath);

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const numOfGames = getNumOfGames(urlParams);

const numRows = numOfGames + 5;
const numCells = 5;

const dbWords = new Words(listOfWordsFromFile);
const dbWordsWithoutAccent = new Words([...removeAccents(dbWords.words)]);
const selectedWords = new Words(selectWords(listOfWordsFromFile, numOfGames));
const selectedWordsWithoutAccent = new Words([
  ...removeAccents(selectedWords.words),
]);

generateTables($game, numOfGames, numOfGames + 5, numCells);
const tables = getTables(
  selectedWords.words,
  selectedWordsWithoutAccent.words,
  numRows,
  numCells,
);

const game = new Game(
  tables,
  dbWords,
  dbWordsWithoutAccent,
  selectedWords,
  selectedWordsWithoutAccent,
  numOfGames,
);

const menu = new Menu(game, $menu);
game.menu = menu;

const keyboard = new Keyboard($keyboardContainer, game);

game.resumeGame();
