
# karma-minimal-dots-reporter

A minimal reporter for when using karma.


## Features

All the following options are configurable:

- Colorized output
- Configurable symbols for successful / failed tests
- Configurable width of printed symbols
- Can optionally hide summary at end of test suite
- Can optionally hide loggings during test suite


## Configuration

- Add the latest version of karma-minimal-dots-reporter to your package.json.
- Add the following to your karma config:

```javascript
module.exports = function(karma) {
  karma.set({
    // ...

    reporters: ["min-dots"],
    minDotsReporter: {
      success: ".",
      failure: "x",
      width: 100,
      showSummary: false,
      showLogs: false,
      colors: true
    }

    // ...
  });
};
```

Now you can start using karma as usual!

