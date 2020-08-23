import operations from '../operations.js';

const indent = '    ';

const formatIndents = (type, depth, key) => `${indent.repeat(depth)}  ${type} ${key}: `;

const formatValue = (value, depthValue) => {
  if (typeof value !== 'object') {
    return `${value}`;
  }
  const result = [];
  Object.keys(value).forEach((key) => {
    result.push(`${formatIndents(' ', depthValue, key)}${formatValue(value[key], (depthValue + 1))}`);
  });
  return `{\n${result.join('\n')}\n${indent.repeat(depthValue)}}`;
};

const stylish = (diffObject) => {
  const iter = (innerObject, depth) => {
    const result = [];
    innerObject.forEach((item) => {
      const { type, key } = item;
      switch (type) {
        case operations.object:
          result.push(`${formatIndents(' ', depth, key)}${iter(item.value, depth + 1)}`);
          break;
        case operations.add:
          result.push(`${formatIndents('+', depth, key)}${formatValue(item.value, depth + 1)}`);
          break;
        case operations.delete:
          result.push(`${formatIndents('-', depth, key)}${formatValue(item.value, depth + 1)}`);
          break;
        case operations.equal:
          result.push(`${formatIndents(' ', depth, key)}${formatValue(item.value, depth + 1)}`);
          break;
        case operations.change:
          result.push(`${formatIndents('-', depth, key)}${formatValue(item.value1, depth + 1)}`);
          result.push(`${formatIndents('+', depth, key)}${formatValue(item.value2, depth + 1)}`);
          break;
        default:
          throw new Error(`Unknown type operation "${type}"!`);
      }
    });
    return `{\n${result.join('\n')}\n${indent.repeat(depth)}}`;
  };
  const diff = iter(diffObject, 0);
  return diff;
};

export default stylish;
