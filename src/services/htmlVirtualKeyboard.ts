export const $keyboardContainer = document.querySelector(
  '#keyboard',
) as HTMLDivElement;

export const $keyboardButtons = document.getElementsByClassName(
  'keyboard-btn',
) as HTMLCollectionOf<HTMLButtonElement>;
