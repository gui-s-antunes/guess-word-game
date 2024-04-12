import { getRandomNumber } from './randomNum';

export function selectWords(
  words: string[],
  numOfWordsToSelect?: number | undefined,
): string[] {
  const selectedWords: string[] = [];
  const numOfWords: number = words.length;
  for (let i = 0; i < (numOfWordsToSelect || 1); i++) {
    selectedWords.push(words[getRandomNumber(0, numOfWords)]);
  }
  return selectedWords;
}
