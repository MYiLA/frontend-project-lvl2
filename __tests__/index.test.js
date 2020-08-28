import genDiff from '../index.js';

const stylish = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      - setting3: true\n      + setting3: {\n            key: value\n        }\n      + setting4: blah blah\n      + setting5: {\n            key5: value5\n        }\n        setting6: {\n            doge: {\n              - wow: too much\n              + wow: so much\n            }\n            key: value\n          + ops: vops\n        }\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n      - nest: {\n            key: value\n        }\n      + nest: str\n    }\n  - group2: {\n        abc: 12345\n        deep: {\n            id: 45\n        }\n    }\n  + group3: {\n        fee: 100500\n        deep: {\n            id: {\n                number: 45\n            }\n        }\n    }\n}';
const stylishIni = '{\n    common: {\n      + follow: false\n        setting1: Value 1\n      - setting2: 200\n      + setting4: blah blah\n    }\n    group1: {\n      - baz: bas\n      + baz: bars\n        foo: bar\n    }\n  - group2: {\n        abc: 12345\n    }\n  + group3: {\n        fee: 100500\n    }\n}';
const plain = "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to [complex value]\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group1.nest' was updated. From [complex value] to 'str'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]";
const plainIni = "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]";
const json = '[{"type":"object","key":"common","value":[{"type":"add","key":"follow","value":false},{"type":"equal","key":"setting1","value":"Value 1"},{"type":"delete","key":"setting2","value":200},{"type":"change","key":"setting3","value1":true,"value2":{"key":"value"}},{"type":"add","key":"setting4","value":"blah blah"},{"type":"add","key":"setting5","value":{"key5":"value5"}},{"type":"object","key":"setting6","value":[{"type":"object","key":"doge","value":[{"type":"change","key":"wow","value1":"too much","value2":"so much"}]},{"type":"equal","key":"key","value":"value"},{"type":"add","key":"ops","value":"vops"}]}]},{"type":"object","key":"group1","value":[{"type":"change","key":"baz","value1":"bas","value2":"bars"},{"type":"equal","key":"foo","value":"bar"},{"type":"change","key":"nest","value1":{"key":"value"},"value2":"str"}]},{"type":"delete","key":"group2","value":{"abc":12345,"deep":{"id":45}}},{"type":"add","key":"group3","value":{"fee":100500,"deep":{"id":{"number":45}}}}]';
const jsonIni = '[{"type":"object","key":"common","value":[{"type":"add","key":"follow","value":false},{"type":"equal","key":"setting1","value":"Value 1"},{"type":"delete","key":"setting2","value":"200"},{"type":"add","key":"setting4","value":"blah blah"}]},{"type":"object","key":"group1","value":[{"type":"change","key":"baz","value1":"bas","value2":"bars"},{"type":"equal","key":"foo","value":"bar"}]},{"type":"delete","key":"group2","value":{"abc":"12345"}},{"type":"add","key":"group3","value":{"fee":"100500"}}]';

const paths = {
  json1: '__fixtures__/file1.json',
  json2: '__fixtures__/file2.json',
  yml1: '__fixtures__/file1.yml',
  yml2: '__fixtures__/file2.yml',
  ini1: '__fixtures__/file1.ini',
  ini2: '__fixtures__/file2.ini',
};

test.each([
  [paths.json1, paths.json2, 'stylish', stylish],
  [paths.yml1, paths.yml2, 'stylish', stylish],
  [paths.ini1, paths.ini2, 'stylish', stylishIni],
  [paths.json1, paths.json2, 'plain', plain],
  [paths.yml1, paths.yml2, 'plain', plain],
  [paths.ini1, paths.ini2, 'plain', plainIni],
  [paths.json1, paths.json2, 'json', json],
  [paths.yml1, paths.yml2, 'json', json],
  [paths.ini1, paths.ini2, 'json', jsonIni],
])('test(%s, %s, %s)', (a, b, c, expected) => {
  expect(genDiff(a, b, c)).toBe(expected);
});
