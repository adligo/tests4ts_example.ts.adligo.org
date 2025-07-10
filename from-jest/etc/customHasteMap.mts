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
import Runtime from 'jest-runtime';
import HasteMap from 'jest-haste-map';

const serializedModuleMapJsonString = `{
  "clocks": {},
  "files": {},
  "map": {},
  "mocks": {}
}`;

// Parse the JSON string into an object
const rt: Runtime = Runtime.prototype;
const serializableModuleMap = JSON.parse(serializedModuleMapJsonString);
const dmm = HasteMap.default;
const mm = dmm.getModuleMapFromJSON(serializableModuleMap);
export default mm;