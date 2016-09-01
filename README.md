# script-path
Retrieves the path of the specified script on the page, used to dynamically load assets relative the current script.

## Install
```
npm install script-path --save
```

## Usage
```
# bundleName is the final name of your bundle (without .min or .js)
var bundleName = 'app';
var scriptPath = require('script-path')(bundleName);
```

script-path returns the path to the script file as passed in, use it to load assets relative to your bundle, not to the
page. 

## Example
If your page is running at `https://example.com/mypage` but it's loading your bundle from 
`https://cdn.somewhereelse.com/libs/myscript.min.js`, the following code will return 
`https://cdn.somewhereelse.com/libs/`.

```
var scriptPath = require('script-path')('myscript');
```

## Usage with webpack
Webpack enables you to load chunks dynamically from your script, it uses a config setting `publicPath` 
(https://github.com/webpack/docs/wiki/Configuration#outputpublicpath) to determine the path to load the chunks from,
however this means you either have to load them relative to the current page or know the exact URL at build time.
Rather than settings the `publicPath` property you can include set the path at runtime by assigning it to 
`__webpack_public_path__` on your entry point. Using script-path you don't need to know where it's going to hosted
or where it's running from, you can query that at runtime, e.g.

```
__webpack_public_path__ = require('script-path')('myscript');
```
