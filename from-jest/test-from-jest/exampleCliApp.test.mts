// test-from-jest/exampleCliApp.test.mts
/**
 * Jest tests that use Tests4ts AssertionContext directly
 */

import { I_AssertionContext } from "@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs";
import { AssertionContext } from "@ts.adligo.org/tests4ts/dist/assertions.mjs";
import { I_ConsoleLog, Tv, TvChannel, TvChannelFan } from '../src/exampleCliApp.mjs';

/*
const { I_AssertionContext } = require("@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs");
const { AssertionContext } = require ("@ts.adligo.org/tests4ts/dist/assertions.mjs");
const { I_ConsoleLog, Tv, TvChannel, TvChannelFan } = require("../src/exampleCliApp.mjs");
*/
class MockConsoleLog implements I_ConsoleLog {
  private _messages: string[] = [];


  clear(): void {
    this._messages = [];
  }


  getMessage(idx: number): string {
    return this._messages[idx];
  }


  getMessageCount(): number {
    return this._messages.length;
  }


  log(message: string): void {
    this._messages.push(message);
  }
}


describe('TV Channel App with Tests4ts AssertionContext', () => {
  let consoleMock: MockConsoleLog;
  let tv: Tv;
  let ac: I_AssertionContext;


  beforeEach(() => {
    consoleMock = new MockConsoleLog();
    tv = new Tv(consoleMock);
    ac = new AssertionContext();
  });


  test('should change channel to MTV successfully', () => {
    tv.setChannel("MTV");

    ac.isTrue(1 < consoleMock.getMessageCount(), "The console mock should have received one or more messages");
    ac.equals("Trying to change channel to MTV", consoleMock.getMessage(0), "The messages should match.");
    ac.isTrue(2 < consoleMock.getMessageCount(), "The console mock should have received two or more messages");
    ac.equals("The channel is now; MTV", consoleMock.getMessage(1), "The messages should match.");
    ac.isTrue(3 <= consoleMock.getMessageCount(), "The console mock should have received three or more messages");
    ac.equals("[{\"_name\":\"John\"},{\"_name\":\"Bob\"}]\n" +
      "are now happy!", consoleMock.getMessage(2), "The messages should match.");

    // Verify the assertion count
    expect(ac.getCount()).toBeGreaterThan(0);
  });


  test('should handle invalid channel gracefully', () => {
    tv.setChannel("InvalidChannel");

    ac.isTrue(1 < consoleMock.getMessageCount(), "Should have at least 2 messages");
    ac.equals("Trying to change channel to InvalidChannel", consoleMock.getMessage(0));
    ac.equals("The following channel is not in your Tv, better pay for some bundles; InvalidChannel",
      consoleMock.getMessage(1));

    // Channel should remain unchanged (History)
    ac.equals("History", tv.getCurrentChannel()._name, "Channel should remain History");
  });


  test('should verify channel fans correctly', () => {
    tv.setChannel("Discovery");

    let currentChannel = tv.getCurrentChannel();
    ac.equals("Discovery", currentChannel._name, "Channel should be Discovery");
    ac.equals(1, currentChannel._fans.length, "Discovery should have 1 fan");
    ac.equals("Ann", currentChannel._fans[0]._name, "Fan should be Ann");
  });


  test('should test assertion context error handling', () => {
    ac.error('Test error message', () => {
      throw new Error('Test error message');
    });

    // Test that assertion count increased
    expect(ac.getCount()).toBe(1);
  });
});
export {};