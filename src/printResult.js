import operations from './operations.js';

const printResult = (diffObject) => {
  console.log('CREATED PRINT');
  console.log(diffObject);
  const result = [];
  diffObject.forEach((item) => {
    const { type, key } = item;
    switch (type) {
      case operations.object:
        result.push(`    ${key}: ${printResult(item.value)}`);
        break;
      case operations.add:
        result.push(`  + ${key}: ${item.value}`);
        break;
      case operations.delete:
        result.push(`  - ${key}: ${item.value}`);
        break;
      case operations.equal:
        result.push(`    ${key}: ${item.value}`);
        break;
      case operations.change:
        result.push(`  - ${key}: ${item.value1}`);
        result.push(`  + ${key}: ${item.value2}`);
        break;
      default:
        throw new Error(`Unknown type operation "${type}"!`);
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

export default printResult;
