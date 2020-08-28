import fs from 'fs';
import path from 'path';
import parseData from './src/parseData.js';
import createDiffObject from './src/createDiffObject.js';
import format from './src/formatters/index.js';

export default (path1, path2, formatterType) => {
  const data1 = fs.readFileSync(path1, 'utf-8');
  const data2 = fs.readFileSync(path2, 'utf-8');

  const format1 = path.extname(path1).substr(1);
  const format2 = path.extname(path2).substr(1);

  const dataObject1 = parseData(data1, format1);
  const dataObject2 = parseData(data2, format2);

  const diff = createDiffObject(dataObject1, dataObject2);

  const result = format(diff, formatterType);

  return result;
};
