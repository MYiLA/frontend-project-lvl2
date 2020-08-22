import parsers from './src/parsers.js';
import createDiffObject from './src/createDiffObject.js';
import printResult from './src/printResult.js';

export default (path1, path2) => {
  const data1 = parsers(path1);
  const data2 = parsers(path2);

  const diff = createDiffObject(data1, data2);

  return printResult(diff, 0);
};
