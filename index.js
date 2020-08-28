import readData from './src/readData.js';
import parseData from './src/parseData.js';
import createDiffObject from './src/createDiffObject.js';
import format from './src/formatters/index.js';

export default (path1, path2, formatterType) => {
  const data1 = readData(path1);
  const data2 = readData(path2);

  const dataObject1 = parseData(data1);
  const dataObject2 = parseData(data2);

  const diff = createDiffObject(dataObject1, dataObject2);

  const result = format(diff, formatterType);

  return result;
};
