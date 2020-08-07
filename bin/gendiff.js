#!/usr/bin/env node
import commander from 'commander';

commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')

commander.parse(process.argv)

const compare = (filepath1, filepath12) => {
  
}