import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (diff, formatterType) => {
  let result = '';

  switch (formatterType) {
    case 'stylish':
      result = stylish(diff);
      break;
    case 'plain':
      result = plain(diff);
      break;
    case 'json':
      result = json(diff);
      break;
    default:
      throw new Error(`Unknown formatter type "${formatterType}"!`);
  }

  return result;
};
