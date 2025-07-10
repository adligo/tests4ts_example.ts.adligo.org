import { createDefaultPreset } from "ts-jest";
import type {Config} from 'jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const rootDir = '<rootDir>';
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
  /*
  unable to discern how to do this correctly, this is still just a hopefull 
  way to exclude all the files from the HasteFS instance
  haste: {
    hasteMapModulePath: `${process.cwd()}/etc/customHasteMap.mts`
  },
  */
  roots: [
    `${rootDir}`,`${baseDir}`, `${baseTestDir}`
  ],
  testMatch:[
      `${baseTestDir}/*test.mts`
  ],
  /**
   * testPathIgnorePatterns seems to be broken or never worked,
   * regardless it is NOT excluding these files
   * from the HasteFS instance, which makes Jest very hard to debug as I have
   * 21 ish files, but only want to debug why ONE is not matching
   */
  testPathIgnorePatterns: ["<rootDir>/coverage/","<rootDir>/dist/", "<rootDir>/etc/", 
    "<rootDir>/migrate-from-jest/", "<rootDir>/*.md", "<rootDir>/*.json", "<rootDir>/*.ts"],
};

export default config;