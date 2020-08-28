import operations from '../operations.js';

const indent = '    ';

const formatIndents = (depth) => `${indent.repeat(depth)}`;

const formatResult = (arr, depth) => `{\n${arr.join('\n')}\n${depth}}`;

const formatValue = (value, depthValue) => {
  if (typeof value !== 'object') {
    return `${value}`;
  }
  const indents = formatIndents(depthValue);
  const result = Object.keys(value).map((key) => {
    const formatedValue = formatValue(value[key], (depthValue + 1));
    return `${indents}    ${key}: ${formatedValue}`;
  });
  return formatResult(result, indents);
};

const stylish = (diffObject) => {
  const iter = (innerObject, depth) => {
    const result = innerObject.map((item) => {
      const indents = formatIndents(depth);
      const { type, key } = item;
      const formatedValue = {
        val: formatValue(item.value, depth + 1),
        val1: formatValue(item.value1, depth + 1),
        val2: formatValue(item.value2, depth + 1),
        objVal: iter(item.value, depth + 1),
      };
      switch (type) {
        case operations.object:
          return `${indents}    ${key}: ${formatedValue.objVal}`;
        case operations.add:
          return `${indents}  + ${key}: ${formatedValue.val}`;
        case operations.delete:
          return `${indents}  - ${key}: ${formatedValue.val}`;
        case operations.equal:
          return `${indents}    ${key}: ${formatedValue.val}`;
        case operations.change:
          return [
            `${indents}  - ${key}: ${formatedValue.val1}`,
            `${indents}  + ${key}: ${formatedValue.val2}`,
          ].join('\n');
        default:
          throw new Error(`Unknown type operation "${type}"!`);
      }
    });
    return formatResult(result, formatIndents(depth));
  };

  return iter(diffObject, 0);
};

export default stylish;
