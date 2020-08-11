// import index from '../index.js';

// test('test diff json file', () => {
//   expect(index('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(
//     '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
//   );
// });

// const sum = require('../src/sum.js');
import { test, expect } from '@jest/globals';
import sum from '../src/sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
