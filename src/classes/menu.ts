// VAI TER:
// o container menu
// o h1
// o p
// os botões do menu
// o p das palavras

import { Game } from './game';

export class Menu {
  constructor(
    private readonly game: Game,
    private readonly _menuContainer: HTMLDivElement, // private readonly _title: HTMLHeadingElement, // private readonly _subtitle: HTMLParagraphElement, // private readonly _buttons: HTMLCollectionOf<HTMLButtonElement>, // private readonly _gameWords: HTMLParagraphElement,
  ) {
    this._menuContainer.addEventListener('click', this.isButton.bind(this));
  }

  isButton(e: Event) {
    console.log('isButton');

    if (!e.target) return;
    const { target } = e;

    if ((target as HTMLElement).nodeName !== 'BUTTON') return;

    const numOfGames = (target as HTMLButtonElement).getAttribute('value');

    if (numOfGames === null) return;

    if (Number(numOfGames) > 1) {
      this.game.newGame(numOfGames);
    } else {
      this.hiddenMenu();
    }
  }

  hiddenMenu() {
    console.log('hiddenMenu');
    this._menuContainer.style.display = 'none';
  }

  showMenu() {
    console.log('showMenu');
    this._menuContainer.style.display = 'flex';
  }
}
