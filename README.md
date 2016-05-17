# electron pug
This module is a simple `file` protocol interceptor for [electron](https://github.com/atom/electron) which compiles all (local) URLs to files with `.pug` extension (e.g `/home/electron-pug/index.pug`) on the fly.

<a href="https://github.com/yan-foto/neutron"><img alt="Neutron Compatible" src="https://img.shields.io/badge/neutron-compatible-004455.svg"></a>
<a href="https://www.npmjs.com/package/electron-pug"><img alt="NPM Version" src="https://img.shields.io/npm/v/electron-pug.svg"></a>
![license](https://img.shields.io/npm/l/electron-pug.svg)
# Installation

```
npm install electron-pug
```

# Usage
Just initialize this module with desired options for [Pug](https://www.npmjs.com/package/pug) package and your locals:

```js
'use strict';

const {app, BrowserWindow} = require('electron');
const locals = {/* ...*/};
const pug = require('electron-pug')({pretty: true}, locals);

// Standard stuff

app.on('ready', () => {
  let mainWindow = new BrowserWindow({ width: 800, height: 600 });

  mainWindow.loadUrl(`file://${__dirname}/index.pug`);
  // the rest...
});
```

# Even more!
If you want to have least effort when developing electron packages, take a look at [neutron](https://github.com/yan-foto/neutron)!
