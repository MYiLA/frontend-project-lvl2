import index from '../index.js';

test('test diff json file', () => {
  expect(index('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
  );
});

test('test diff yaml file', () => {
  expect(index('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(
    '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}',
  );
});
