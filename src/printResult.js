import operations from './operations.js';

const indent = '    ';

const printValue = (value, depth) => {
  const result = [];

  if (typeof value === 'object') {
    Object.keys(value).forEach((key) => {
      result.push(`${indent.repeat(depth + 1)}${key}: ${printValue(value[key], (depth + 1))}`);
    });
  } else {
    return `${value}`;
  }

  return `{\n${result.join('\n')}\n${indent.repeat(depth)}}`;
  // const count = printValue(value);
  // `{\n${result.join('\n')}\n}`;
};

printValue();

const printResult = (diffObject, depth) => {
  const result = [];
  diffObject.forEach((item) => {
    const { type, key } = item;
    switch (type) {
      case operations.object:
        result.push(`${indent.repeat(depth + 1)}${key}: ${printResult(item.value, depth + 1)}`);
        break;
      case operations.add:
        result.push(`${indent.repeat(depth)}  + ${key}: ${printValue(item.value, depth + 1)}`);
        break;
      case operations.delete:
        result.push(`${indent.repeat(depth)}  - ${key}: ${printValue(item.value, depth + 1)}`);
        break;
      case operations.equal:
        result.push(`${indent.repeat(depth)}    ${key}: ${printValue(item.value, depth + 1)}`);
        break;
      case operations.change:
        result.push(`${indent.repeat(depth)}  - ${key}: ${printValue(item.value1, depth + 1)}`);
        result.push(`${indent.repeat(depth)}  + ${key}: ${printValue(item.value2, depth + 1)}`);
        break;
      default:
        throw new Error(`Unknown type operation "${type}"!`);
    }
  });
  return `{\n${result.join('\n')}\n${indent.repeat(depth)}}`;
};

export default printResult;
