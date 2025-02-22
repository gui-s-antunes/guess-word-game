export function generateWordBlocks(
  table: HTMLTableElement,
  newTable: boolean,
  rows?: number,
  cells?: number,
): void {
  for (let i = 0; i < (rows || 6); i++) {
    const tr = table.insertRow();

    if (i === 0 && newTable) tr.setAttribute('class', 'usedRow');

    for (let j = 0; j < (cells || 5); j++) {
      const td = tr.insertCell();
      // const text = document.createTextNode(`Cell I${i}/J${j}`); // texto a ser inserido na célula
      // td.appendChild(text); // texto na célula inserido
      // td.style.border = '1px solid black';

      if (j === 0 && i === 0 && newTable) {
        td.setAttribute('class', 'selectedPosition');
      }
    }
  }
}
