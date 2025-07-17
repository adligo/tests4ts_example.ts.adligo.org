import { defineConfig } from 'vite'


const baseDir = './src';
const baseTestDir = 'test-from-vitest';

export default defineConfig({
  test: {
    /* for example, use global to avoid globals imports (describe, test, expect): */
    // globals: true,
    exclude: [
      "**/coverage/**",
      "**/dist/**",
      "**/node_modules/**"
    ],
    include:[
        `${baseTestDir}/*.test.mts`
    ],
    includeSource: [
      `${baseDir}/*.mts`
    ]
  }

})