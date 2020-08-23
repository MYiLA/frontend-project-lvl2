import readData from './src/readData.js';
import parseData from './src/parseData.js';
import createDiffObject from './src/createDiffObject.js';
import stylish from './src/formatters/stylish.js';
import plain from './src/formatters/plain.js';
import json from './src/formatters/json.js';

export default (path1, path2, formatterType = 'stylish') => {
  let result = '';

  const data1 = readData(path1);
  const data2 = readData(path2);

  const dataObject1 = parseData(data1.content, data1.extname);
  const dataObject2 = parseData(data2.content, data2.extname);

  const diff = createDiffObject(dataObject1, dataObject2);

  switch (formatterType) {
    case 'stylish':
      result = stylish(diff);
      break;
    case 'plain':
      result = plain(diff);
      break;
    case 'json':
      result = json(diff);
      break;
    default:
      throw new Error(`Unknown formatter type "${formatterType}"!`);
  }

  return result;
};
