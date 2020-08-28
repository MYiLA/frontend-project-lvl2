import _ from 'lodash';
import operations from '../operations.js';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  return value;
};

const plain = (diffObj) => {
  const iter = (innerObj, path) => innerObj.flatMap((item) => {
    const { type, key } = item;

    switch (type) {
      case operations.object:
        return iter(item.value, `${path}${key}.`);
      case operations.add:
        return [`Property '${path}${key}' was added with value: ${formatValue(item.value)}`];
      case operations.delete:
        return [`Property '${path}${key}' was removed`];
      case operations.equal:
        return [];
      case operations.change:
        return [`Property '${path}${key}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`];
      default:
        throw new Error(`Unknown type operation "${type}"!`);
    }
  });

  return iter(diffObj, '').join('\n');
};

export default plain;
