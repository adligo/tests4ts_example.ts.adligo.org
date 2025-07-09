import { createDefaultPreset } from "ts-jest";
import type {Config} from 'jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/test-from-jest';

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
      `${baseTestDir}/exampleCliApp.test.mts`
  ]
};

export default config;