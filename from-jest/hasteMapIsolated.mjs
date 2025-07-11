#!/usr/bin/env node;
/**
 * I'm trying to figure out how to filter the files to a single dir, this code is inspired from;
 * From the 2nd video here https://jestjs.io/docs/architecture
 *
 * Copyright 2025 Adligo Inc / Scott Morgan
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
console.log("Run this from the parent folder or this folder;");
console.log("You can also debug it with \n");
console.log("node --inspect-brk etc/hasteMapIsolated.mjs --runInBand ")

import Haste from 'jest-haste-map';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import {cpus} from 'os';
function getPathSeperator() {
    if (isWindows()) {
        return '\\';
    } else {
        return '/';
    }
}

function isWindows() {
    return process.platform === "win32"
}

const isWin = isWindows();
const pathSep = getPathSeperator();
const dirParts = dirname(fileURLToPath(import.meta.url)).split(pathSep);
var rootDirV = dirParts.join(pathSep);
if (dirParts[dirParts.length-1] === 'etc') {
    const rootDirParts = dirParts.slice(0, dirParts.length - 1);
    rootDirV = rootDirParts.join(pathSep);
}
const rootDir = rootDirV;
console.log("Root dir is " + rootDir);

const hasteMap= new Haste.default({
  extensions: ['mjs','mts'],
  ignorePattern: new RegExp(['.git', '.hg', '.sl',
     'coverage', '*dist*','dist/*.mjs','dist/*.mts','*etc*','etc/*.mjs','etc/*.mts',
     'migrate-from-jest', 'node_modules',
    'hasteMapIsolated.mjs'
  ]),
  maxWorkers: cpus().length,
  rootDir: rootDir,
  roots: [rootDir],

  platforms: [],

  name: 'jj'
});

/**
 This blows up with messages like;
 node:fs:553
   return binding.open(
                  ^

 Error: ENOENT: no such file or directory, open ''
     at Object.openSync (node:fs:553:18)
     at writeFileSync (node:fs:2422:35)
     at HasteMap._persist (C:\ ... \from-jest\node_modules\jest-haste-map\build\index.js:714:37)        
     at C:\ ... \from-jest\node_modules\jest-haste-map\build\index.js:380:16
     at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
     at async file:///C:/ ... /from-jest/etc/hasteMapIsolated.mjs:57:19 {
   errno: -4058,
   code: 'ENOENT',
   syscall: 'open',
   path: ''
 }
 * 
 */
const {hasteFS} = await hasteMap.build();

console.log(hasteFS.getAllFiles());