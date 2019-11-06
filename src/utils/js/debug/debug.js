const { log: logFunc, info: infoFunc, warn: warnFunc } = console;
const WARN_LEVEL = 1;
const INFO_LEVEL = 2;
const DEBUG_LEVEL = 4;

export default class DebugUtil {
  constructor() {
    this.debugLevel = 0;
    this.debugEnabled = true;
    this.infoEnabled = false;
    this.warnEnabled = false;
  }

  static setDebugLevel(debugLevel = 0) {
    this.debugLevel = debugLevel;

    if (Number.isNaN(this.debugLevel)) {
      this.debugLevel = 0;
    }


    if (this.debugLevel >= DEBUG_LEVEL) {
      this.debugLevel -= DEBUG_LEVEL;
      this.debugEnabled = true;
    }

    if (this.debugLevel >= INFO_LEVEL) {
      this.debugLevel -= INFO_LEVEL;
      this.infoEnabled = true;
    }

    if (this.debugLevel >= WARN_LEVEL) {
      this.debugLevel -= WARN_LEVEL;
      this.warnEnabled = true;
    }
  }

  static getPropertyContents(prop) {
    return typeof prop === 'object' ? JSON.stringify(prop) : prop;
  }

  static log(...args) {
    if (this.debugEnabled && typeof logFunc === 'function') {
      logFunc.apply(console, args);
    }
  }

  static info(...args) {
    if (this.infoEnabled && console && typeof infoFunc === 'function') {
      infoFunc.apply(console, args);
    }
  }

  static warn(...args) {
    if (this.warnEnabled && console && typeof warnFunc === 'function') {
      warnFunc.apply(console, args);
    }
  }
}
