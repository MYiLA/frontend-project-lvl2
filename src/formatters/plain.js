// http://common.setting6.doge.wow recursion
import operations from '../operations.js';

const formatValue = (value) => {
  if (typeof value !== 'object') {
    return `${value}`;
  }
  return '[complex value]';
};

const plain = (diffObj) => {
  const iter = (innerObj, path) => {
    const result = [];
    innerObj.forEach((item) => {
      const { type, key } = item;
      switch (type) {
        case operations.object:
          console.log(key);
          console.log(item);
          result.push(iter(item.value, `${path}${key}.`));
          break;
        case operations.add:
          result.push(`Property '${path}${key}' was added with value: ${formatValue(item.value)}`);
          break;
        case operations.delete:
          result.push(`Property '${path}${key}' was removed`);
          break;
        case operations.equal:
          break;
        case operations.change:
          result.push(`Property '${path}${key}' was updated. From '${formatValue(item.value1)}' to '${formatValue(item.value2)}'`);
          break;
        default:
          throw new Error(`Unknown type operation "${type}"!`);
      }
    });
    return `${result.join('\n')}`;
  };

  const plainResult = iter(diffObj, '');
  return plainResult;
};

export default plain;
