# electron jade
This module is a simple `file` protocol interceptor for [electron](https://github.com/atom/electron) which compiles all (local) URLs to files with `.jade` extension (e.g `/home/electron-jade/index.jade`) on the fly.

<a href="https://github.com/yan-foto/neutron"><img alt="Neutron Compatible" src="https://img.shields.io/badge/neutron-compatible-004455.svg"></a>
<a href="https://www.npmjs.com/package/electron-jade"><img alt="NPM Version" src="https://img.shields.io/npm/v/electron-jade.svg"></a>
![license](https://img.shields.io/npm/l/electron-jade.svg)
# Installation

```
npm install electron-jade
```

# Usage
Just initialize this module with desired options for [Jade](https://www.npmjs.com/package/jade) package and your locals:

```js
'use strict';

var app = require('app');
var locals = {/* ...*/};
var j = require('electron-jade')({pretty: true}, locals);
var BrowserWindow = require('browser-window');

// Standard stuff

app.on('ready', function () {
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadUrl('file://' + __dirname + '/index.jade');
  // the rest...
});
```

# Even more!
If you want to have least effort when developing electron packages, take a look at [neutron](https://github.com/yan-foto/neutron)!
