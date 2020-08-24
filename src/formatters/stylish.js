import operations from '../operations.js';

const indent = '    ';

const formatIndents = (depth) => `${indent.repeat(depth)}`;

const formatValue = (value, depthValue) => {
  if (typeof value !== 'object') {
    return `${value}`;
  }
  const result = [];
  const indents = formatIndents(depthValue);
  Object.keys(value).forEach((key) => {
    result.push(`${indents}    ${key}: ${formatValue(value[key], (depthValue + 1))}`);
  });
  return `{\n${result.join('\n')}\n${indent.repeat(depthValue)}}`;
};

const stylish = (diffObject) => {
  const iter = (innerObject, depth) => {
    const result = [];
    innerObject.forEach((item) => {
      const indents = formatIndents(depth);
      const { type, key } = item;
      switch (type) {
        case operations.object:
          result.push(`${indents}    ${key}: ${iter(item.value, depth + 1)}`);
          break;
        case operations.add:
          result.push(`${indents}  + ${key}: ${formatValue(item.value, depth + 1)}`);
          break;
        case operations.delete:
          result.push(`${indents}  - ${key}: ${formatValue(item.value, depth + 1)}`);
          break;
        case operations.equal:
          result.push(`${indents}    ${key}: ${formatValue(item.value, depth + 1)}`);
          break;
        case operations.change:
          result.push(`${indents}  - ${key}: ${formatValue(item.value1, depth + 1)}`);
          result.push(`${indents}  + ${key}: ${formatValue(item.value2, depth + 1)}`);
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
