import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

const baseDir = '<rootDir>/dist/test-from-jest/src';
const baseTestDir = '<rootDir>/dist/test-from-jest/test-from-jest';

/** @type {import("jest").Config} **/
export default {
  preset: 'ts-jest',
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
      `${baseDir}/**/*.mjs`
  ],
  testMatch:[
      `${baseTestDir}/test-from-jest/exampleCliApp.test.js`
  ]
};

