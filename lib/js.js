/**
 * noprotocol.js() 
 * 
 * Input: clean ES6 js
 * Output: Bundled, ES5 compatible, minified, sourcemapped js file.
 *
 * Usage: 
 * gulp.src('./js/*.js')
 *   .pipe(noprotocol.js())
 *   .on('error', noprotocol.notify)
 *   .pipe(gulp.dest('./dest'));
 */
"use strict";

var sourcemaps = require('gulp-sourcemaps');
var traceur = require('gulp-traceur');
var uglify = require('gulp-uglify');
var combine = require('stream-combiner2').obj;
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat');

/**
 * Gulp stream that outputs js.
 *
 * - traceur
 * - annotate
 * - uglify
 *
 * @param {Object} options {
 *   minify: {Boolean} (default: true)
 *   annotate: {Boolean} (default: false)
 *   sourcemaps: {*} (default: {})
 *   bundle: {String} filename (default: false)
 * }
 */
module.exports = function js(options) {
	options = options || {};
    options.minify = (typeof options.minify === 'undefined') ? true : options.minify;
    options.traceur = (typeof options.traceur === 'undefined') ? {} : options.traceur;
    options.sourcemaps = (typeof options.sourcemaps === 'undefined') ? {} : options.sourcemaps;
    options.annotate = options.annotate || false;
    options.bundle = options.bundle || false;
    var pipeline = [];
    if (options.sourcemaps) {
        pipeline.push(sourcemaps.init(options.sourcemaps));
    }
    if (options.bundle) {
        pipeline.push(concat(options.bundle));
    }
    if (options.traceur) { 
        pipeline.push(traceur(options.traceur));
    }
    if (options.annotate) {
    	pipeline.push(ngAnnotate(options.ngAnnotate));
    }
    if (options.minify) {
    	pipeline.push(uglify(options.uglify));
    }
    if (options.sourcemaps) {
        pipeline.push(sourcemaps.write('.'));
    }
	return combine(pipeline);
}