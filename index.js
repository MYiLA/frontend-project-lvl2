import readData from './src/readData.js';
import parseData from './src/parseData.js';
import createDiffObject from './src/createDiffObject.js';
import stylish from './src/formatters/stylish.js';

export default (path1, path2) => {
  const data1 = readData(path1);
  const data2 = readData(path2);

  const dataObject1 = parseData(data1.content, data1.extname);
  const dataObject2 = parseData(data2.content, data2.extname);

  const diff = createDiffObject(dataObject1, dataObject2);

  return stylish(diff); // parametrs in defolt // https://ru.hexlet.io/blog/posts/sovershennyy-kod-plohie-i-horoshie-praktiki-pri-proektirovanii-parametrov-funktsiy
};
