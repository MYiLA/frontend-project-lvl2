import operations from '../operations.js';

const formatValue = (value) => {
  if (typeof value === 'object') {
    return '[complex value]';
  }
  if (typeof value === 'boolean') {
    return value;
  }
  return `'${value}'`;
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

  return iter(diffObj, '');
};

export default plain;
