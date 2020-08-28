import _ from 'lodash';
import operations from '../operations.js';

const indent = '    ';

const formatIndents = (depth) => `${indent.repeat(depth)}`;

const wrapInBrackets = (text, closeIndent) => `{\n${text}\n${closeIndent}}`;

const formatValue = (value, depthValue) => {
  if (!_.isPlainObject(value)) {
    return `${value}`;
  }
  const indents = formatIndents(depthValue);
  const content = Object.keys(value)
    .map((key) => `${indents}    ${key}: ${formatValue(value[key], (depthValue + 1))}`)
    .join('\n');
  return wrapInBrackets(content, indents);
};

const stylish = (diffObject) => {
  const iter = (innerObject, depth) => {
    const content = innerObject.flatMap((item) => {
      const indents = formatIndents(depth);
      const { type, key } = item;
      switch (type) {
        case operations.object:
          return [`${indents}    ${key}: ${iter(item.value, depth + 1)}`];
        case operations.add:
          return [`${indents}  + ${key}: ${formatValue(item.value, depth + 1)}`];
        case operations.delete:
          return [`${indents}  - ${key}: ${formatValue(item.value, depth + 1)}`];
        case operations.equal:
          return [`${indents}    ${key}: ${formatValue(item.value, depth + 1)}`];
        case operations.change:
          return [
            `${indents}  - ${key}: ${formatValue(item.value1, depth + 1)}`,
            `${indents}  + ${key}: ${formatValue(item.value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown type operation "${type}"!`);
      }
    }).join('\n');
    return wrapInBrackets(content, formatIndents(depth));
  };

  return iter(diffObject, 0);
};

export default stylish;
