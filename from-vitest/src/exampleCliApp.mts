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
export class TvChannelFan {
  _name: string;
  
  constructor(name: string) {
    this._name = name;
  }
}


export class TvChannel {
  _name: string;
  _fans: TvChannelFan[];
  
  constructor(name: string, fans: TvChannelFan[]) {
    this._name = name;
    this._fans = fans;
  }
}


export interface I_ConsoleLog {
  log(message: string): void;
}


export class ConsoleLog implements I_ConsoleLog {
  public log(message: string): void {
    console.log(message);
  }
}


export class Tv {
  public static getAllChannels(): Map<string, TvChannel> {
    let r: Map<string, TvChannel> = new Map();
    r.set("MTV", new TvChannel("MTV", [new TvChannelFan("John"), new TvChannelFan("Bob")]));
    r.set("Discovery", new TvChannel("Discovery", [new TvChannelFan("Ann")]));
    r.set("History", new TvChannel("History", [new TvChannelFan("John")]));
    return r;
  }
  
  _allChannels: Map<string, TvChannel> = Tv.getAllChannels();
  _currentChannel: TvChannel = this._allChannels.get("History")!;
  _log: I_ConsoleLog;
  
  constructor(log?: I_ConsoleLog) {
    if (log != undefined) {
      this._log = log;
    } else {
      this._log = new ConsoleLog();
    }
  }
  
  public setChannel(name: string): void {
    this._log.log("Trying to change channel to " + name);
    let newChannel = this._allChannels.get(name);
    if (newChannel == undefined) {
      this._log.log("The following channel is not in your Tv, better pay for some bundles; " + name);
    } else {
      this._currentChannel = newChannel;
      this._log.log("The channel is now; " + name);
      this._log.log(JSON.stringify(newChannel._fans) + '\nare now happy!');
    }
  }
  
  public getCurrentChannel(): TvChannel {
    return this._currentChannel;
  }
}


// Derail the regular script execution if you're testing
let testing = process.env.TESTING;
if (!testing) {
  let args = process.argv;
  let channel = process.argv[args.length - 1];
  let tv: Tv = new Tv();
  tv.setChannel(channel);
}