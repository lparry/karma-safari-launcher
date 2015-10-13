Hack for https://github.com/karma-runner/karma-safari-launcher to close Safari "properly," using AppleScript, preventing it from reopening tabs regardless of browser settings, causing Karma test runs to stack up.

It kind of circumvents the event/signal system for killing/restarting browser processes in Karma, so it's probably not really a proper solution.

To use (karma.conf):
```js
module.exports = function(config) {
  config.set({
    browsers: ['Safari']
  });
};
```

Or from the command line:
```bash
karma start --browsers Safari
```

[homepage]: http://karma-runner.github.com
