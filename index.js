import parse from './src/parse.js';
import createDiffObject from './src/createDiffObject.js';
import printResult from './src/printResult.js';

export default (path1, path2) => {
  const data1 = parse(path1);
  const data2 = parse(path2);

  const diff = createDiffObject(data1, data2);

  return printResult(diff);
};
