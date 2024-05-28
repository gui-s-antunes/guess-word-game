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
    this.isThereGamesParam();
  }

  isButton(e: Event) {
    if (!e.target) return;
    const { target } = e;

    if ((target as HTMLElement).nodeName !== 'BUTTON') return;

    const numOfGames = (target as HTMLButtonElement).getAttribute('value');

    if (numOfGames === null) return;

    if (Number(numOfGames) > 1 || this.game.gameEnded) {
      this.game.newGame(numOfGames);
    } else {
      this.hiddenMenu();
    }
  }

  hiddenMenu() {
    this._menuContainer.style.display = 'none';
  }

  showMenu() {
    this._menuContainer.style.display = 'flex';
  }

  changeMenuTitle(text: string) {
    const titleMenu = document.getElementById(
      'title-menu',
    ) as HTMLHeadingElement;
    titleMenu.textContent = text;
  }

  changeMenuWordsSelected(selectedWords: string) {
    const $menuWords = document.getElementById(
      'menu-game-words',
    ) as HTMLParagraphElement;

    $menuWords.textContent = selectedWords;
    $menuWords.style.display = 'block';
  }

  private isThereGamesParam() {
    if (window.location.search) this.hiddenMenu();
  }
}
