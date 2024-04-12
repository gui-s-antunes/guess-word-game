console.log('Controllers.ts is here!');

import { Words } from './game';
import { generateWordBlocks } from './utils/generateWordBlocks';
import { getWords } from './utils/getWords';
import { selectWords } from './utils/selectWords';

export const game = document.querySelector('.game') as HTMLDivElement;
export const word = document.querySelector('.word') as HTMLTableElement;

generateWordBlocks(word, 6, 5);

// export interface Palavra {
//   [key: string]: number;
// }

const csvFilePath = './assets/files/data.csv';

const wordsFromData = await getWords(csvFilePath);

console.log('palavras do data: ', wordsFromData);

const words = new Words(wordsFromData);

const selectedWords = selectWords(words.words, 5);

console.log('Palavras escolhidas: ', selectedWords);
