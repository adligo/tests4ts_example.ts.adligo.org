/**
 * ApiTrial class for migration example
 */
import { I_AssertionContext } from "@ts.adligo.org/i_tests4ts/dist/i_tests4ts.mjs";
import { AssertionContext } from "@ts.adligo.org/tests4ts/dist/assertions.mjs";
import { ApiTrial } from '@ts.adligo.org/tests4ts/dist/trials.mjs';
import { I_ConsoleLog, Tv, TvChannel, TvChannelFan } from '../src/exampleCliApp.mjs';


export class MockConsoleLog implements I_ConsoleLog {
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


export class ExampleCliAppTrial extends ApiTrial {
  public static readonly CLAZZ_NAME = 'com.example.fromjest.ExampleCliAppTrial';
  
  constructor() {
    super(ExampleCliAppTrial.CLAZZ_NAME);
  }
  
  testChannelChange(ac: I_AssertionContext): void {
    let consoleMock = new MockConsoleLog();
    let tv: Tv = new Tv(consoleMock);
    tv.setChannel("MTV");
    
    ac.isTrue(1 < consoleMock.getMessageCount(), "The console mock should have received one or more messages");
    ac.equals("Trying to change channel to MTV", consoleMock.getMessage(0), "The messages should match.");
    ac.isTrue(2 < consoleMock.getMessageCount(), "The console mock should have received two or more messages");
    ac.equals("The channel is now; MTV", consoleMock.getMessage(1), "The messages should match.");
    ac.isTrue(3 <= consoleMock.getMessageCount(), "The console mock should have received three or more messages");
    ac.equals("[{\"_name\":\"John\"},{\"_name\":\"Bob\"}]\n" +
        "are now happy!", consoleMock.getMessage(2), "The messages should match.");
  }
  
  testInvalidChannel(ac: I_AssertionContext): void {
    let consoleMock = new MockConsoleLog();
    let tv: Tv = new Tv(consoleMock);
    tv.setChannel("NonExistentChannel");
    
    ac.isTrue(2 <= consoleMock.getMessageCount(), "Should have at least 2 messages");
    ac.equals("Trying to change channel to NonExistentChannel", consoleMock.getMessage(0));
    ac.equals("The following channel is not in your Tv, better pay for some bundles; NonExistentChannel", 
              consoleMock.getMessage(1));
  }
  
  testChannelFans(ac: I_AssertionContext): void {
    let channels = Tv.getAllChannels();
    let mtvChannel = channels.get("MTV");
    
    ac.notNull(mtvChannel, "MTV channel should exist");
    ac.equals("MTV", mtvChannel!._name, "Channel name should be MTV");
    ac.equals(2, mtvChannel!._fans.length, "MTV should have 2 fans");
    ac.equals("John", mtvChannel!._fans[0]._name, "First fan should be John");
    ac.equals("Bob", mtvChannel!._fans[1]._name, "Second fan should be Bob");
  }
}