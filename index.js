'use strict';

var doc = typeof document === 'undefined' ? null : document;
module.exports = function(bundleName) {
  var bundlePattern = new RegExp(bundleName + '(\.min|)\.js(\.gz|)$');
  var scripts = doc.getElementsByTagName('script');
  var src;
  for (var i = 0; i < scripts.length; i++) {
    src = scripts[i].src;
    if (bundlePattern.test(src)) {
      return src.substring(0, src.lastIndexOf('/') + 1);
    }
  }
};
// Used to mock the document object for testing
module.exports.setDocument = function(document) {
  doc = document;
};
