const chalk = require("chalk");

var noOp = function() {};

var defaultConfig = {
  success: ".",
  failure: "F",
  zenGarden: false,
  colors: true,
  showSummary: true,
  showLogs: true
};

var previouslyFailed = [];

var getTestKey = function(result) {
  return result.suite.join("/") + "/" + result.description;
};

var hasPreviouslyFailed = function(result) {
  var key = getTestKey(result);
  return previouslyFailed.includes(key);
};

var removePreviouslyFailed = function(result) {
  var key = getTestKey(result);
  previouslyFailed = previouslyFailed.filter(function(k) {
    return k !== key;
  });
};

var MinimalDotsReporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);
  var cfg = Object.assign(defaultConfig, config.minDotsReporter || {});
  var success = cfg.colors ? chalk.green(cfg.success) : cfg.success;
  var failure = cfg.colors ? chalk.red(cfg.failure) : cfg.failure;

  var column = 0;
  var writeResult = function(result) {
    if (!cfg.width) {
      process.stdout.write(result);
      return;
    }

    if (column > cfg.width) {
      process.stdout.write(result);
      process.stdout.write("\r\n");
      column = 0;
    } else {
      process.stdout.write(result);
      column++;
    }
  };

  this.onBrowserLog = function(browser, log) {
    if (cfg.showLogs) {
      process.stdout.write("LOG: " + log + "\r\n");
    }
    column = 0;
  };

  this.specSuccess = function(browser, result) {
    if (cfg.zenGarden && Math.random() < 0.05) {
      if (hasPreviouslyFailed(result)) {
        const fighters = [
          "👩🏻‍🚒",
          "👩🏼‍🚒",
          "👩🏽‍🚒",
          "👩🏾‍🚒",
          "👩🏿‍🚒",
          "👨🏻‍🚒",
          "👨🏼‍🚒",
          "👨🏽‍🚒",
          "👨🏾‍🚒",
          "👨🏿‍🚒",
          "👨‍🚒",
          "👩‍🚒"
        ];
        const fighterIndex = Math.round(Math.random() * (fighters.length - 1));
        const fighter = fighters.slice(fighterIndex)[0];
        writeResult(fighter);
        removePreviouslyFailed(result);
      } else {
        const plants = ["🌳", "🌴", "🌲", "🌵", "🍀", "🌻"];
        const plantIndex = Math.round(Math.random() * (plants.length - 1));
        const plant = plants.slice(plantIndex)[0];
        writeResult(plant);
      }
      return;
    }
    writeResult(success);
  };

  this.specFailure = function(browser, result) {
    previouslyFailed.push(getTestKey(result));
    writeResult(cfg.zenGarden ? "🔥" : failure);
  };

  if (!cfg.showSummary) {
    this.onRunComplete = noOp;
  }
};

MinimalDotsReporter.$inject = ["baseReporterDecorator", "config"];

module.exports = {
  "reporter:min-dots": ["type", MinimalDotsReporter]
};
