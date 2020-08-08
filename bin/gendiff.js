#!/usr/bin/env node
import commander from 'commander';

const file1 = {};
const file2 = {};

commander
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')

commander.parse(process.argv)

//получила аргументы
console.log(`'Я БИБЛИОТЕКА' ${process.argv.slice(2)}`);

// нашла нужные файлы по названию
// спарсила json в объекты с данными
// сравнила данные и собрала из них строчку для вывода

const compare = (filepath1, filepath12) => {
  
}