import fs from 'fs';
import _ from 'lodash';

//библиотека//////////////
const ADD = 'add';
const DELETE = 'delete';
const EQUAL = 'equal';
const CHANGE = 'change';
/////////////////////////////

export default (path1, path2) => {
  const content1 = fs.readFileSync(path1, 'utf-8');
  const content2 = fs.readFileSync(path2, 'utf-8');

  const data1 = JSON.parse(content1);
  const data2 = JSON.parse(content2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  
  const keysUnique = _.uniq(keys1.concat(keys2)).sort();

  const diff = [];

  for (const key of keysUnique) {
    if (!_.has(data1, key)) {
      diff.push({ type: ADD, key, value: data2[key] });
    } else if (!_.has(data2, key)) {
      diff.push({ type: DELETE, key, value: data1[key] });
    } else {
      const value1 = data1[key];
      const value2 = data2[key];
      
      if (value1 === value2) {
        diff.push({ type: EQUAL, key, value: value1 });
      } else {
        diff.push({ type: CHANGE, key, value1, value2 });
      }
    }
  }

  const result = [];

  for (const operation of diff) {
    const { type, key } = operation;

    switch (type) {
      case ADD:
        result.push(`  + ${key}: ${operation.value}`);
        break;
      case DELETE:
        result.push(`  - ${key}: ${operation.value}`);
        break;
      case EQUAL:
        result.push(`    ${key}: ${operation.value}`);
        break;
      case CHANGE:
        result.push(`  - ${key}: ${operation.value1}`);
        result.push(`  + ${key}: ${operation.value2}`);
        break;
    }
  }

  return `{\n${result.join('\n')}\n}`
};