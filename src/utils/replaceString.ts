export function replaceStringPart(
  str: string,
  startPos: number,
  endPos: number,
  substitute: string,
) {
  return str.slice(0, startPos) + substitute + str.slice(endPos);
}
