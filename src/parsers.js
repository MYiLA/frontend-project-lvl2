import fs from 'fs';
import yaml from 'js-yaml';

export default (path) => {
  const content = fs.readFileSync(path, 'utf-8');

  if (path.slice(-4) === 'json') {
    return JSON.parse(content);
  }

  if (path.slice(-3) === 'yml') {
    return yaml.safeLoad(content);
  }

  return undefined;
};
