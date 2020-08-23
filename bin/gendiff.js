#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

// отделить
commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, cmdObj) => {
    console.log(genDiff(filepath1, filepath2, cmdObj.format));
  });

commander.parse(process.argv);
