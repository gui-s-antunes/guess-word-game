export function generateWordBlocks(
  table: HTMLTableElement,
  rows: number,
  cells: number,
): void {
  for (let i = 0; i < rows; i++) {
    const tr = table.insertRow();

    for (let j = 0; j < cells; j++) {
      const td = tr.insertCell();
      const text = document.createTextNode(`Cell I${i}/J${j}`); // texto a ser inserido na célula
      td.appendChild(text); // texto na célula inserido
      td.style.border = '1px solid black';
    }
  }
}
