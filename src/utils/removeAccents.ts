interface Accent {
  [key: string]: string;
}

const accents: Accent = {
  á: 'a',
  é: 'e',
  í: 'i',
  ó: 'o',
  ú: 'u',
  â: 'a',
  ê: 'e',
  ô: 'o',
  ã: 'a',
  õ: 'o',
  à: 'a',
  ç: 'c',
};

export function removeAccents(words: string[]): string[] {
  const wordsWithoutAccent: string[] = [];

  for (let i = 0; i < words.length; i++) {
    const wordChars = [...words[i]];
    for (let j = 0; j < words[i].length; j++) {
      const accent = accents[wordChars[j]];
      if (accent) wordChars[j] = accent;
    }
    wordsWithoutAccent.push(wordChars.join(''));
  }

  return wordsWithoutAccent;
}
