#!/usr/bin/env node;
/**
 * Run this with bun from the parent directory i.e.;
 * bun etc/regCheck.mts 
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
import * as fs from 'fs';
import path from 'path';

const debug = false;

let ignores = ['.git', '.hg', '.sl',
     'coverage', 'dist','etc',
     'migrate-from-jest', 'node_modules',
    'hasteMapIsolated.mjs', '.json', '.md','.config.ts'
  ];


/**
 * This illustrates a efficient way to crawl a directory 
 * Jest should move to something like this!
 */
class RecursiveDirectoryCrawler {
  _dirPath: string;
  _ignores: RegExp[];
  
  constructor(dirPath: string, ignores: string[]) {
    this._dirPath = dirPath;
    // not the best in terms of efficient use of RegExp
    // but efficient because it filters the directories right away
    // but works correctly 
    // see below
    this._ignores = ignores.map(i => { 
      try {
        return new RegExp(i);
      } catch (x) {
        throw new Error('Invalid RegEx(' + i + ')',x);
      }
    });
   /**
    * TODO figure out a good way to concatinate the regExp
    */
     //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
     //https://regexr.com/
     /*
     let escapedDots = ignores.map(i => i.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
     let re = `/${escapedDots.join("|")}/`;
     console.log(re);
     this._ignores = [new RegExp(re, "g")];
    */
  }
  
  public crawlDirectorySync(): string[] {
    return this.crawlDirectorySyncRec(this._dirPath, []);
  }
  
  crawlDirectorySyncRec(dir: string, paths: string[]): string[] {
    //only do a shallow read at first filtering out the subdirs etc
    const fileAndDirs = fs.readdirSync(dir, {recursive: false});
    for (const p of fileAndDirs) {
      const fullPath = path.join(dir, p);
      
      if (!this.isIgnored(fullPath)) {
        const stats = fs.statSync(fullPath);
        
        if (stats.isDirectory()) {
          this.crawlDirectorySyncRec(fullPath, paths);
        } else {
          paths.push(fullPath);
        }
      }
    }
    return paths;
  }
  
  isIgnored(fullPath: string): boolean {
    for (const r of this._ignores) {
      //console.log("r is " + r);
      if (r.test(fullPath)) {
        if (debug) {
          console.log("The following full path was ignored \n  " + fullPath);
        }
        return true;
      }
    }
    return false;
  }
}

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
const dirParts = process.cwd().split(pathSep);
var rootDirV = dirParts.join(pathSep);
if (dirParts[dirParts.length-1] === 'etc') {
    const rootDirParts = dirParts.slice(0, dirParts.length - 1);
    rootDirV = rootDirParts.join(pathSep);
}
const rootDir = rootDirV;
console.log("Root dir is " + rootDir);
let rec = new RecursiveDirectoryCrawler(rootDir, ignores);
let files = rec.crawlDirectorySync();
console.log(files);