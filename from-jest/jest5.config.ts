import type { JestConfigWithTsJest } from 'ts-jest'

const rootDir = '<rootDir>';
const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/test-from-jest';

const jestConfig: JestConfigWithTsJest = {
  // [...]
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  testMatch:[
      `${baseTestDir}/*test.ts`
  ],
  /**
   * testPathIgnorePatterns seems to be broken or never worked,
   * regardless it is NOT excluding these files
   * from the HasteFS instance, which makes Jest very hard to debug as I have
   * 21 ish files, but only want to debug why ONE is not matching
   */
  testPathIgnorePatterns: ["<rootDir>/coverage/","<rootDir>/dist/", "<rootDir>/etc/", 
    "<rootDir>/migrate-from-jest/", "<rootDir>/*.md", "<rootDir>/*.json", "<rootDir>/*.ts"]
}

export default jestConfig