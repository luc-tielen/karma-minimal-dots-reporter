var noOp = function() {};

var defaultConfig = {
  success: ".",
  failure: "x",
  colors: true,
  width: 80,
  showSummary: true
};

var green = function(str) {
  return "\u001b[32m" + str + "\u001b[0m";
};

var red = function(str) {
  return "\u001b[31m" + str + "\u001b[0m";
};

var MinimalDotsReporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);
  var cfg = Object.assign(defaultConfig, config.minDotsReporter || {});
  var success = cfg.colors ? green(cfg.success) : cfg.success;
  var failure = cfg.colors ? red(cfg.failure) : cfg.failure;

  var column = 0;
  var writeResult = function(result) {
    if (column > cfg.width) {
      process.stdout.write(result);
      process.stdout.write("\r\n");
      column = 0;
    } else {
      process.stdout.write(result);
      column++;
    }
  };

  this.onBrowserLog = function() {
    column = 0;
  };

  this.specSuccess = function() {
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
