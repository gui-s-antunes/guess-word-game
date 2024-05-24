export function callClassMethod(obj: any, objMethod: string, ...params: any[]) {
  obj[objMethod](...params);
}
