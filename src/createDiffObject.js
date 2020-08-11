import _ from 'lodash';
import operations from './operations.js';

export default (data1, data2) => {
  const diff = [];

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const keysUnique = _.uniq(keys1.concat(keys2)).sort();

  keysUnique.forEach((key) => {
    if (!_.has(data1, key)) {
      diff.push({ type: operations.add, key, value: data2[key] });
    } else if (!_.has(data2, key)) {
      diff.push({ type: operations.delete, key, value: data1[key] });
    } else {
      const value1 = data1[key];
      const value2 = data2[key];
      if (value1 === value2) {
        diff.push({ type: operations.equal, key, value: value1 });
      } else {
        diff.push(
          {
            type: operations.change, key, value1, value2,
          },
        );
      }
    }
  });

  return diff;
};
