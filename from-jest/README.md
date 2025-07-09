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

```
node --inspect-brk node_modules/jest/bin/jest.js --runInBand --config test-from-jest4.config.ts --debug
```

[Attach WebStorm to the Debugger Server](https://www.google.com/search?q=attach+webstorm+to+a+node+debugger+server&rlz=1C1ONGR_enUS1154US1154&oq=attach+webstorm+to+a+node+debugger+server&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRiPAtIBCTEyNDk0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8)
