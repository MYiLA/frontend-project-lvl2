import fs from 'fs';
import yaml from 'js-yaml';
import ini from 'ini';

export default (path) => {
  const content = fs.readFileSync(path, 'utf-8');

  if (path.slice(-4) === 'json') {
    return JSON.parse(content);
  }

  if (path.slice(-3) === 'yml') {
    return yaml.safeLoad(content);
  }

  if (path.slice(-3) === 'ini') {
    return ini.parse(content);
  }

  return console.log('files format undefined');
};
