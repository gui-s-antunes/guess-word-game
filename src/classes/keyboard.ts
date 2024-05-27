import { isKeyALetter } from '../utils/isKeyALetter';
import { Game } from './game';

export class Keyboard {
  constructor(
    private readonly $keyboardContainer: HTMLDivElement,
    private readonly game: Game,
  ) {
    this.$keyboardContainer.addEventListener('click', this.isButton.bind(this));
    document.addEventListener('keydown', this.keyPressed.bind(this));
  }

  private isButton(e: Event) {
    if (!e.target) return;
    const { target } = e;

    if ((target as HTMLElement).nodeName !== 'BUTTON') return;

    const btnValue = (target as HTMLButtonElement).textContent?.trim();

    if (!btnValue) return;

    this.isLetterOrSpecialKey(btnValue);
  }

  private keyPressed(e: KeyboardEvent) {
    this.isLetterOrSpecialKey(e.key);
  }

  // keyboard letter ou a special key like enter or backspace
  private isLetterOrSpecialKey(key: string) {
    if (!this.game.isRunning) return;

    if (key.length === 1) {
      if (isKeyALetter(key)) {
        this.game.addLetterToBlock(key);
        return;
      }
    }

    this.game.gameAction(key);
  }
}
