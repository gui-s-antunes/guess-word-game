import { Table } from '../classes/table';

export function getTables(): Table[] {
  // return document.getElementsByClassName(
  //   'word',
  // ) as HTMLCollectionOf<HTMLTableElement>;

  const tables = document.getElementsByClassName(
    'word',
  ) as HTMLCollectionOf<HTMLTableElement>;
  const tablesInstanceList: Table[] = [];

  for (let i = 0; i < tables.length; i++) {
    const tableInstance = new Table(tables[i]);
    tablesInstanceList.push(tableInstance);
  }

  return tablesInstanceList;
}
