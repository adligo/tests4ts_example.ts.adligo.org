Since [Tests4ts](https://github.com/adligo/tests4ts.ts.adligo.org/tree/main) is all TypeScript code, you can simply call the TypeScript functions in their respective classes.

## Install Jest Globally

```
npm install jest --global
```

## Assertion Context

Instances of AssertionContext can simply be created and used directly;

```
import { I_AssertionContext } from "@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs";
import { AssertionContext } from "@ts.adligo.org/tests4ts/dist/assertions.mjs";

...

let ac: I_AssertionContext = new AssertionContext();

ac.equals('foo','bar','foo should NOT equal bar, what are you thinking!';

```

## Migration from Jest to Tests4ts

Migration can be accomplished by creating a new ApiTrial (or other Trial type), and calling it's methods from the jest test methods.  For example;

#### New FooApiTrial

```
import { I_AssertionContext } from "@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs";
import { ApiTrial } from '@ts.adligo.org/tests4ts/dist/trials.mjs';

export class FooApiTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'com.example.FooApiTrial';
  
  constructor() {
    super(FooApiTrial.CLAZZ_NAME);
  }
  
  testYourMath(ac: I_AssertionContext) {
    //assert 2 + 2 = 4;
    ac.isTrue(2 + 2 === 4, '2 + 2 should equal 4');
  }
}
```

#### Jest Code

```
const fooApiTrial = new FooApiTrial();

test('adds 2 + 2 to equal 4', () => {
  fooApiTrial.testYourMath(new AssertionContext());
});

```

## Project Structure

- `src/` - Contains the main application code (similar to basic example)
- `test-from-jest/` - Jest tests that directly use Tests4ts AssertionContext
- `migrate-from-jest/` - Jest tests that call ApiTrial test methods (migration approach)

## Installation

```bash
npm install
```

## Debug Why Jest isn't picking up tests?

The quick check, edit this file and see if your path's actually matches with picomatch!

```
cd etc 
$ node picoRegCheck.js 
```

The hard check

```
node --inspect-brk node_modules/jest/bin/jest.js --runInBand --config test-from-jest4.config.ts --debug
```

[Then attach WebStorm to the Debugger Server](https://www.google.com/search?q=attach+webstorm+to+a+node+debugger+server&rlz=1C1ONGR_enUS1154US1154&oq=attach+webstorm+to+a+node+debugger+server&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRiPAtIBCTEyNDk0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8)

## Jest Walkthrough / Debugging through notes
These are just notes about the Jest codebase, for starters the maintainers don't even have a high oppinion of it as it wasn't planned and just *'**sort of happened this way**'*;

--
[Jest Architecture Maintainer Docs](https://jestjs.io/docs/architecture)

```
...
node_modules/@jest/core/build/SearchSource.js around line 140
is where the tests are discovered or not discovered then around line 150 we get
if it can find if there are describe or test functions in the file;

    if (config.testMatch.length) {
      this._testPathCases.push({
        isMatch: (0, _jestUtil().globsToMatcher)(config.testMatch),
        stat: 'testMatch'
      });
    }
...
then in 
node_modules/jest-util/build/globsToMatcher.js around line 50
it gets cached in the globsToMatchersMap
and around line 55 you will see the following which seems to determine if 
your file matched as a valid .test.(ts, js, etc) to run;
  const matchers = globs.map(glob => {
    if (!globsToMatchersMap.has(glob)) {
      const isMatch = (0, _picomatch().default)(glob, picomatchOptions, true);
      const matcher = {
        isMatch,
        // Matchers that are negated have different behavior than matchers that
        // are not negated, so we need to store this information ahead of time.
        negated: isMatch.state.negated || !!isMatch.state.negatedExtglob
      };
      globsToMatchersMap.set(glob, matcher);
    }
    return globsToMatchersMap.get(glob);
  });

This calls picomatch;
node_modules/picomatch/lib/picomatch.js around line 32
const picomatch = (glob, options, returnState = false) => {

node_modules/picomatch/lib/picomatch.js around line 66, the matcher is returned
so if you want to debug that stick a breakpoint around line 67
also note this appears to be 
brute force matching 
long file name by long file name 
a CS smell!, use a Map instead and filter directories in the tree!
i.e. @see /tests4ts_example.ts.adligo.org/from-jest/etc/regCheck.mts
const matcher = (input, returnObject = false) => {
  const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
...

finally that function returns a call back so if you
add a break point at line 69 or so 


...
node_modules/@jest/core/build/runJest.js around line 306 prints the zero tests message yea!
new (_console().CustomConsole)(outputStream, outputStream).error(
        noTestsFoundMessage
      );
```
