import { Table } from '../classes/table';

export function addClickToBlocks(tables: Table[]) {
  // const blockLines = table.tableHTML.getElementsByTagName('tr');
  // // const blocks = table.tableHTML.getElementsByTagName('td');

  // for (let i = 0; i < blockLines.length; i++) {
  //   const blocks = blockLines[i].getElementsByTagName('td');

  //   for (let j = 0; j < blocks.length; j++) {
  //     blocks[j].addEventListener('click', () => {
  //       if (i !== table.rowPosition) return;
  //       blockClickEvent(j);
  //     });
  //   }
  // }

  for (let i = 0; i < tables.length; i++) {
    const blockLines = tables[i].tableHTML.getElementsByTagName('tr');

    for (let j = 0; j < blockLines.length; j++) {
      const blocks = blockLines[j].getElementsByTagName('td');

      for (let k = 0; k < blocks.length; k++) {
        blocks[k].addEventListener('click', () => {
          if (j !== tables[i].rowPosition) return;
          blockClickEvent(k, tables);
        });
      }
    }
  }
}

function blockClickEvent(newPos: number, tables: Table[]) {
  for (let i = 0; i < tables.length; i++) {
    if (tables[i].isCleared) continue;
    const rows = tables[i].tableHTML.getElementsByTagName('tr');
    const cells = rows[tables[i].rowPosition].getElementsByTagName('td');
    cells[tables[i].cellPosition].removeAttribute('class');
    tables[i].cellPosition = newPos;
    cells[tables[i].cellPosition].setAttribute('class', 'selectedPosition');
  }
}
