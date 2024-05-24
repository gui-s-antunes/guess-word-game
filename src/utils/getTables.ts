import { Table } from '../classes/table';

export function getTables(numRows: number, numCells: number): Table[] {
  // return document.getElementsByClassName(
  //   'word',
  // ) as HTMLCollectionOf<HTMLTableElement>;

  const tables = document.getElementsByClassName(
    'word',
  ) as HTMLCollectionOf<HTMLTableElement>;
  const tablesInstanceList: Table[] = [];

  for (let i = 0; i < tables.length; i++) {
    const tableInstance = new Table(tables[i], numRows, numCells);
    tablesInstanceList.push(tableInstance);
  }

  return tablesInstanceList;
}
