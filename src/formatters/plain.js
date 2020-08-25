// http://common.setting6.doge.wow recursion
import operations from '../operations.js';

const formatValue = (value) => {
  if (typeof value !== 'object') {
    if (typeof value === 'boolean') {
      return `${value}`;
    }
    return `'${value}'`;
  }

  return '[complex value]';
};

const plain = (diffObj) => {
  const iter = (innerObj, path) => {
    const result = innerObj.map((item) => {
      const { type, key } = item;
      switch (type) {
        case operations.object:
          return iter(item.value, `${path}${key}.`);
        case operations.add:
          return `Property '${path}${key}' was added with value: ${formatValue(item.value)}`;
        case operations.delete:
          return `Property '${path}${key}' was removed`;
        case operations.equal:
          return null;
        case operations.change:
          return `Property '${path}${key}' was updated. From ${formatValue(item.value1)} to ${formatValue(item.value2)}`;
        default:
          throw new Error(`Unknown type operation "${type}"!`);
      }
    });
    return result.filter(Boolean).join('\n');
  };

  const plainResult = iter(diffObj, '');
  return plainResult;
};

export default plain;
