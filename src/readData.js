import fs from 'fs';
import path from 'path';

export default (dataPath) => {
  const content = fs.readFileSync(dataPath, 'utf-8');
  const extname = path.extname(dataPath);
  console.log(extname);
  return { content, extname };
};
