import { createDefaultPreset } from "ts-jest";
import type {Config} from 'jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const baseDir = './dist/test-from-jest/src';
const baseTestDir = './dist/test-from-jest/test-from-jest';

const config: Config =  {
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

export default config;