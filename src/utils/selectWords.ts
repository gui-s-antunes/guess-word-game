import { getRandomNumber } from './randomNum';

export function selectWords(
  words: string[],
  numOfWordsToSelect?: number | undefined,
): string[] {
  const selectedWords: string[] = [];
  const numOfWords: number = words.length;
  const addedWords = new Set();
  for (let i = 0; i < (numOfWordsToSelect || 1); i++) {
    let newWord = words[getRandomNumber(0, numOfWords)];
    while (addedWords.has(newWord)) {
      newWord = words[getRandomNumber(0, numOfWords)];
    }
    addedWords.add(newWord);
    selectedWords.push(newWord);
  }
  return selectedWords;
}
