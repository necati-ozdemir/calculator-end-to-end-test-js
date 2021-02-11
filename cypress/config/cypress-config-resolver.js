// const fs = require('fs-extra');
// import customData from './config.json'
const path = require('path');

const cypressConfigResolverByFile = (filename) => {
  // const pathToConfigFile = path.resolve(__dirname, `${filename}.json`);
  return null;
};
const calculatorConfigResolver = () =>
  cypressConfigResolverByFile(process.env.CYPRESS_ENV || 'config');

module.exports.calculatorConfigResolver = calculatorConfigResolver;

