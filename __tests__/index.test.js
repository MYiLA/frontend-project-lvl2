import genDiff from '../index.js';

const paths = {
  json1: '__fixtures__/file1.json',
  json2: '__fixtures__/file2.json',
  yml1: '__fixtures__/file1.yml',
  yml2: '__fixtures__/file2.yml',
  ini1: '__fixtures__/file1.ini',
  ini2: '__fixtures__/file2.ini',
};

describe('genDiff', () => {
  describe.each(['stylish', 'plain', 'json'])('%s', (format) => {
    test.each([
      [paths.json1, paths.json2],
      [paths.yml1, paths.yml2],
      [paths.ini1, paths.ini2],
    ])('test(%s, %s)', (path1, path2) => {
      expect(genDiff(path1, path2, format)).toMatchSnapshot();
    });
  });
});
