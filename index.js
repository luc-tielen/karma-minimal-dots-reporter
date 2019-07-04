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

  this.specSuccess = function() {
    if (cfg.zenGarden && Math.random() < 0.05) {
      const plants = ["🌳", "🌴", "🌲", "🌵", "☘️", "🍀", "🌻"];
      const plantIndex = Math.round(Math.random() * (plants.length - 1));
      const plant = plants.slice(plantIndex)[0];
      writeResult(plant);
      return;
    }
    writeResult(success);
  };

  this.specFailure = function() {
    writeResult(failure);
  };

  if (!cfg.showSummary) {
    this.onRunComplete = noOp;
  }
};

MinimalDotsReporter.$inject = ["baseReporterDecorator", "config"];

module.exports = {
  "reporter:min-dots": ["type", MinimalDotsReporter]
};
