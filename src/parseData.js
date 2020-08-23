import yaml from 'js-yaml';
import ini from 'ini';

export default (content, extname) => {
  let result = {};

  switch (extname) {
    case '.json':
      result = JSON.parse(content);
      break;
    case '.yml':
      result = yaml.safeLoad(content);
      break;
    case '.ini':
      result = ini.parse(content);
      break;
    default:
      throw new Error(`Unknown file format "${extname}"!`);
  }

  return result;
};
