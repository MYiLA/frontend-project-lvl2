import _ from 'lodash';
import operations from './operations.js';

const createDiffObject = (data1, data2) => {
//  const diff = [];

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keysUnique = _.uniq(keys1.concat(keys2)).sort();

  const diff = keysUnique.map((key) => {
    if (!_.has(data1, key)) {
      return { type: operations.add, key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: operations.delete, key, value: data1[key] };
    }
    if ((typeof data1[key] === 'object') && (typeof data2[key] === 'object')) {
      return {
        type: operations.object, key, value: createDiffObject(data1[key], data2[key]),
      };
    }
    const value1 = data1[key];
    const value2 = data2[key];
    if (value1 === value2) {
      return { type: operations.equal, key, value: value1 };
    }
    return {
      type: operations.change, key, value1, value2,
    };
  });
  return diff;
};

export default createDiffObject;
