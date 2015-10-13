var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var SafariBrowser = function(baseBrowserDecorator) {
  baseBrowserDecorator(this);

  this._start = function(url) {
    var HTML_TPL = path.normalize(__dirname + '/safari.html');
    var self = this;

    fs.readFile(HTML_TPL, function(err, data) {
      var content = data.toString().replace('%URL%', url);
      var staticHtmlPath = self._tempDir + '/redirect.html';

      fs.writeFile(staticHtmlPath, content, function(err) {
        self._execCommand(self._getCommand(), [staticHtmlPath]);
      });
    });
  };

  this.kill = function() {
    this.state = 4; // FINISHED
    exec('osascript -e \'quit app "Safari"\'');
  };

  this.forceKill = function() {
    this.kill();

    return {
      then: function(todo) {
        todo();
      }
    };
  };

  this.restart = function() {
    // nevermind
  };
};


SafariBrowser.prototype = {
  name: 'Safari (kill hack)',

  DEFAULT_CMD: {
    darwin: '/Applications/Safari.app/Contents/MacOS/Safari',
    win32: process.env['ProgramFiles(x86)'] + '\\Safari\\Safari.exe'
  },
  ENV_CMD: 'SAFARI_BIN'
};

SafariBrowser.$inject = ['baseBrowserDecorator'];


// PUBLISH DI MODULE
module.exports = {
  'launcher:Safari': ['type', SafariBrowser]
};
