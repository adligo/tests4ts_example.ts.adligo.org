import type { Config } from '@jest/types'

const rootDir = '<rootDir>';
const baseDir = '<rootDir>/src';
const baseTestDir = '<rootDir>/test-from-jest';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch:[
      `${baseTestDir}/*test.ts`
    ]
}

export default config;