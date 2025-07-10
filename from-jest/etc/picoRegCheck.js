#!/usr/bin/env node;
/**
 * This is a silly command line app, that pretends to change TV channels for you.
 * Modified for Jest integration example.
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

const picomatch = require('picomatch');
let options = {dot: true}
//mimic line 57 of
// from-jest/node_modules/jest-util/build/globsToMatcher.js
//const isMatch = (0, _picomatch().default)(glob, picomatchOptions, true);
const isMatch = picomatch(
    'C:/Users/example/foo/from-jest/test-from-jest/*test.mts', options, true);


console.log('isMatch from-jest/test-from-jest/exampleCliApp.test.mts should be a match and it is\n' +
   isMatch('C:/Users/example/foo/from-jest/test-from-jest/exampleCliApp.test.mts')); //=> false

console.log('isMatch from-jest/test-from-jest/exampleCliApp.test.mts should be a match but is\n' +
      picomatch.test('from-jest/test-from-jest/exampleCliApp.test.mts')); //=> false