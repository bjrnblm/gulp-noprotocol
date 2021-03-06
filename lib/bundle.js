/**
 * Defined set of options for noprotocol.js()
 * Tailored toward concatting minified libs into a single file.
 */
"use strict";

var js = require('./js');

module.exports = function bundle(filename, options) {
    options = options || {};
    options.bundle = filename;
    options.traceur = options.traceur || false;
    options.minify = options.minify || false;
    options.sourcemaps = options.sourcemaps || {};
    options.sourcemaps.loadMaps = true;
    return js(options);
};