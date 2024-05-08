import Papa from 'papaparse';

// export interface ParsedData {
//   palavra: string;
//   tf: number;
//   dicts: number;
//   corpus: number;
//   title: number;
//   dmap: string;
// }

async function getData(filePath: string) {
  return new Promise((resolve: any) => {
    Papa.parse(filePath, {
      header: true,
      download: true,
      dynamicTyping: true,
      complete: function (results) {
        // console.log(results);
        resolve(results.data);
      },
    });
  });
}

// const result = await getData(csvFilePath);

export const getWords = async (csvFilePath: string) => {
  const parsedData: any = await getData(csvFilePath);
  console.log('passou');
  console.log('parsedData: ', parsedData);
  // console.log(parsedData[0].tf);
  let contador = 0;
  const dbWords: string[] = [];
  // let palavraTamanho = '1';
  for (let i = 0; i < parsedData.length; i++) {
    if (parsedData[i].tf >= 50000 && parsedData[i].palavra.length == 5) {
      // console.log('tamanho da palavra fora: ', parsedData[i].palavra.length);
      // if (parsedData[i].palavra.length <= 6) {
      //   palavraTamanho = parsedData[i].palavra.length.toString();
      //   // console.log('tamanho da palavra: ', palavraTamanho);
      //   palavras[palavraTamanho]++;
      // }
      dbWords.push(parsedData[i].palavra);
      contador++;
    }
  }
  // console.log('tipo: ', typeof parsedData[0].palavra.length);
  console.log('Número de palavras com tf a partir de 500k: ', contador);

  // console.log(palavras);
  return dbWords;
};
