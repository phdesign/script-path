'use strict';
var test = require('tape');

test('should ignore non-js files', function (assert) {
  var scriptPath = require('./');
  scriptPath.setDocument({
    getElementsByTagName: function() {
      return [
        { src: 'https://example.com/wrongext.css' },
        { src: 'https://example.com/similarext.jsx' }
      ]; 
    }
  });

  assert.plan(2);
  assert.strictEqual(scriptPath('wrongext'), undefined);
  assert.strictEqual(scriptPath('similarext'), undefined);
});

test('should support dots in filename', function (assert) {
  var scriptPath = require('./');
  scriptPath.setDocument({
    getElementsByTagName: function() {
      return [
        { src: 'https://example.com/dot.dot.min.js' },
        { src: 'https://example.com/dot.dot.dot.js' }
      ]; 
    }
  });

  assert.plan(2);
  assert.strictEqual(scriptPath('dot.dot'), 'https://example.com/');
  assert.strictEqual(scriptPath('dot.dot.dot'), 'https://example.com/');
});

test('should find valid script paths', function (assert) {
  var scriptPath = require('./');
  scriptPath.setDocument({
    getElementsByTagName: function() {
      return [
        { src: 'https://example.com/libs/subfoldermin.min.js' },
        { src: 'https://example.com/libs/subfolder.js' },
        { src: 'https://example.com/rootmin.min.js' },
        { src: 'https://example.com/root.js' }
      ]; 
    }
  });

  assert.plan(4);
  assert.strictEqual(scriptPath('subfoldermin'), 'https://example.com/libs/');
  assert.strictEqual(scriptPath('subfolder'), 'https://example.com/libs/');
  assert.strictEqual(scriptPath('rootmin'), 'https://example.com/');
  assert.strictEqual(scriptPath('root'), 'https://example.com/');
});

test('should not crash on bad urls', function (assert) {
  var scriptPath = require('./');
  scriptPath.setDocument({
    getElementsByTagName: function() {
      return [
        { src: 'I\'m not a /URL\\' }
      ]; 
    }
  });

  assert.plan(1);
  assert.strictEqual(scriptPath('nothing'), undefined);
});
