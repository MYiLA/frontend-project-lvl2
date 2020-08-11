import fs from 'fs';

export default (path) => {
  if (path.slice(-4) === 'json') {
    const content = fs.readFileSync(path, 'utf-8');
    return JSON.parse(content);
  }

  return undefined;
};
