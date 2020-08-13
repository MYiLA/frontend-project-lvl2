//import { fileURLToPath, pathToFileURL } from 'url';
//import { dirname } from 'path';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

//const getFixturePath = (filename) => path.join(__dirname, '...', '__fixtures__', filename)
import index from '../index.js';

test('test diff json file', () => {
  expect(index('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
  );
});
