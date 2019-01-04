var defaultConfig = {
  success: ".",
  failure: "x"
};

var MinimalDotsReporter = function(baseReporterDecorator, config) {
  baseReporterDecorator(this);
  var cfg = Object.assign(defaultConfig, config.minDotsReporter || {});

  this.specSuccess = function() {
    process.stdout.write(cfg.success);
  };

  this.specFailure = function() {
    process.stdout.write(cfg.failure);
  };

  this.onBrowserLog = function() {}; // no-op
};

MinimalDotsReporter.$inject = ["baseReporterDecorator", "config"];

module.exports = {
  "reporter:min-dots": ["type", MinimalDotsReporter]
};
