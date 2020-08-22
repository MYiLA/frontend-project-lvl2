import index from '../index.js';

const ansver = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: too much\n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        fee: 100500\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n    }\n}';
const ansverIni = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      + setting4: blah blah\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';

test('test diff .json file', () => {
  expect(index('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(ansver);
});

test('test diff .yml file', () => {
  expect(index('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(ansver);
});

test('test diff .ini file', () => {
  expect(index('__fixtures__/file1.ini', '__fixtures__/file2.ini')).toBe(ansverIni);
});
