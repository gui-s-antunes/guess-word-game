export function getNumOfGames(urlParams: URLSearchParams) {
  if (urlParams.get('games') === '2') return 2;
  if (urlParams.get('games') === '4') return 4;

  return 1;
}
