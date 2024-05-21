export const $menu = document.querySelector('.menu') as HTMLDivElement;

export const $menuButtons = $menu.getElementsByTagName(
  'button',
) as HTMLCollectionOf<HTMLButtonElement>;

export const $menuTitle = $menu.querySelector(
  '#title-menu',
) as HTMLHeadingElement;

export const $menuDescription = $menu.querySelector(
  '#description-menu',
) as HTMLParagraphElement;

export const $menuGameWords = $menu.querySelector(
  '#menu-game-words',
) as HTMLParagraphElement;
