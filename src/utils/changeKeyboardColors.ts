// import { Game } from '../game';
import { Game } from '../classes/game';
import { getCells } from './getCells';
import { replaceStringPart } from './replaceString';

interface Colors {
  [key: string]: string;
}

const colors: Colors = {
  greenBlock: 'rgb(66, 106, 64)',
  yellowBlock: 'rgb(137, 130, 54)',
  missedBlock: 'rgb(108, 108, 75)',
};

export function changeKeyboardColors(game: Game) {
  const numOfTables = game.tables.length;

  for (let i = 0; i < game.tables.length; i++) {
    const cells = getCells(game, game.tables[i].tableHTML);
    const yelledLetters = new Set();
    const greenyLetters = new Set();

    for (let j = 0; j < cells.length; j++) {
      const cellText = cells[j].textContent?.toUpperCase();
      if (yelledLetters.has(cellText)) continue;

      const colorAttribute = cells[j].getAttribute('color');

      if (greenyLetters.has(cellText)) {
        if (colorAttribute === 'missedBlock' || colorAttribute === 'greenBlock')
          continue;
      }

      if (colorAttribute === 'yellowBlock') yelledLetters.add(cellText);

      if (colorAttribute === 'greenBlock') greenyLetters.add(cellText);

      const backgroundColor = colors[colorAttribute || ''];
      if (!backgroundColor) continue;

      const btn = document.getElementById(cellText || '');
      if (!btn) continue;

      if (numOfTables === 1) {
        btn.style.background = backgroundColor;
        continue;
      }

      const style = window.getComputedStyle(btn);
      const btnBackgroundStyle = style.getPropertyValue('background');
      const regexp = /rgb\(\d+, \d+, \d+\)/g;

      let matches = [...btnBackgroundStyle.matchAll(regexp)];

      let newBackground = '';

      let matchIndex = matches[i].index;
      if (matchIndex === undefined) continue;

      newBackground = replaceStringPart(
        btnBackgroundStyle,
        matchIndex,
        matchIndex + matches[i][0].length,
        backgroundColor,
      );

      if (numOfTables === 2) {
        matches = [...newBackground.matchAll(regexp)];
        matchIndex = matches[i + 2].index;
        if (matchIndex === undefined) continue;
        newBackground = replaceStringPart(
          newBackground,
          matchIndex,
          matchIndex + matches[i + 2][0].length,
          backgroundColor,
        );
      }

      btn.style.background = newBackground;
    }
  }
}
