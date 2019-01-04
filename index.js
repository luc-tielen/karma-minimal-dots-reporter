var noOp = function() {};

var defaultConfig = {
  success: ".",
  failure: "x",
  width: 80,
  showSummary: true
};

var MinimalDotsReporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);
  var cfg = Object.assign(defaultConfig, config.minDotsReporter || {});

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

  this.specSuccess = function() {
    writeResult(cfg.success);
  };

  this.specFailure = function() {
    writeResult(cfg.failure);
  };

  this.onBrowserLog = noOp;

  if (!cfg.showSummary) {
    this.onRunComplete = noOp;
  }
};

MinimalDotsReporter.$inject = ["baseReporterDecorator", "config"];

module.exports = {
  "reporter:min-dots": ["type", MinimalDotsReporter]
};
