/**
 * This is a silly command line app, that pretends to change TV channels for you.
 *
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

import { I_AssertionContext,I_AssertionContextConsumer, I_AssertionContextFactory,
  I_FileConverter, I_Runnable, I_Test,
  I_TestResult, I_TestResultFactory, I_Trial, TrialType
} from "@ts.adligo.org/i_tests4ts/src/i_tests4ts.mjs";
import { ApiTrial } from '@ts.adligo.org/tests4ts/dist/trials.mjs';
import { Test, TestParams, TrialSuite, TrialSuiteParams } from '@ts.adligo.org/tests4ts/dist/tests4ts.mjs';
import { I_ConsoleLog, Tv, TvChannel, TvChannelFan } from '../src/exampleCliApp.mjs';
import { JUnitXmlGenerator } from '@ts.adligo.org/junit-xml-tests4j/dist/junitXmlTests4jGenerator.mjs'
import {AssertionContext} from "@ts.adligo.org/tests4ts/dist/assertions.mjs";
import { I_Equatable } from "@ts.adligo.org/i_obj/src/i_obj.mjs";

export class MockConsoleLog implements I_ConsoleLog {
  _messages: string[] = [];

  clear() {
    this._messages = [];
  }

  getMessaage(idx: number) {
    return this._messages[idx];
  }

  getMessageCount(): number {
    return this._messages.length;
  }

  log(message: string) {
    this._messages.push(message);
  }
}

export class ExampleCliAppTrial extends ApiTrial {
  public static readonly testExample = new Test(TestParams.of('org.adligo.ts.tests4ts_example.ExampleCliAppTrial.' +
      'testExample'), (ac: I_AssertionContext) => {
    let consoleMock = new MockConsoleLog();
    let tv: Tv = new Tv(consoleMock);
    tv.setChannel("MTV");
    ac.isTrue(1 < consoleMock.getMessageCount(), "The console mock should have received one or more messages");
    ac.equals("Trying to change channel to MTV", consoleMock.getMessaage(0), "The messages should match.");
    ac.isTrue(2 < consoleMock.getMessageCount(), "The console mock should have received two or more messages");
    ac.equals("The channel is now; MTV", consoleMock.getMessaage(1), "The messages should match.");
    ac.isTrue(3 <= consoleMock.getMessageCount(), "The console mock should have received three or more messages");
    ac.equals("[{\"_name\":\"John\"},{\"_name\":\"Bob\"}]\n" +
        "are now happy!", consoleMock.getMessaage(2), "The messages should match.");

    let acc: MtvAssertionContext = ac as MtvAssertionContext;
    acc.assertGirlsJustWantToHaveFunMightBePlayed(tv);
  });

  constructor() {
    super('ExampleCliAppTrial', [ExampleCliAppTrial.testExample
    ]);
  }
}

export class MtvAssertionContext extends AssertionContext implements I_AssertionContext {
  equals(expected: any, actual: any, message?: string): void { super.equals(expected, actual, message); }
  getCount(): number { return super.getCount(); }
  isFalse(check: boolean, message?: string): void { super.isFalse(check, message); }
  isTrue(check: boolean, message?: string): void { super.isTrue(check, message); }
  notEquals(expected: I_Equatable, actual: any, message?: string): void { super.notEquals(expected, actual, message); }
  notSame(expected: string, actual: string, message?: string): void { super.notSame(expected, actual, message); }
  same(expected: string, actual: string, message?: string): void { super.same(expected, actual, message); }
  thrown(error: Error, runner: I_Runnable, message?: string): void { super.thrown(error, runner, message); }

  assertGirlsJustWantToHaveFunMightBePlayed(tv: Tv) {
    if (tv._currentChannel._name != "MTV") {
      throw Error("Only MTV would play Girls Just Wantta Have Fun.");
    }
    //increment the assertion count
    super._increment();
  }
}

export class MtvAssertionContextFactory implements  I_AssertionContextFactory {
  newAssertionContext(): I_AssertionContext {
    return new MtvAssertionContext();
  }

}
//Actually run the code
export const suite = new TrialSuite(TrialSuiteParams.of('Example Cli App Trial Suite ')
        .withAssertionContextFactory(new MtvAssertionContextFactory()),
    [new ExampleCliAppTrial()]);
suite.run().printTextReport().printTestReportFiles(new JUnitXmlGenerator());