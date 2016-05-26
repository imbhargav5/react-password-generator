var hook = require('css-modules-require-hook');
var path = require('path');
var jsdom = require('jsdom');
require('babel-core/register');
var sass = require('node-sass');
var fetch = require('isomorphic-fetch');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = {userAgent: 'node.js'};
global.jQuery = require('jquery')(window);
global.URL = window.URL;
global.Headers = window.Headers;
global.fetch = fetch;
global.FormData = window.FormData;
global.location = {
	protocol : 'http:',
	host : 'alex.localhost:8000'
};



hook({
  extensions: [ '.css' ],
  preprocessCss: data => sass.renderSync({ data }).css
})
