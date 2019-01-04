var MinimalDotsReporter = function(baseReporterDecorator) {
  baseReporterDecorator(this);

  this.specSuccess = function() {
    process.stdout.write(".");
  };

  this.specFailure = function() {
    process.stdout.write("x");
  };

  this.onBrowserLog = function() {}; // no-op
};

MinimalDotsReporter.$inject = ["baseReporterDecorator"];

module.exports = {
  "reporter:min-dots": ["type", MinimalDotsReporter]
};
