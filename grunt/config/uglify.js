(function() {
	'use strict';

	module.exports = function(grunt, config) {
		var uglify = {};

		config.libraries.forEach(function(oLibrary) {
			var sLibraryTarget = 'target/' + oLibrary.name;

			uglify['lib-target-' + oLibrary.name] = {
				files: [{
					expand: true,
					cwd: sLibraryTarget + '/resources',
					src: ['**/*.js'],
					dest: sLibraryTarget + '/resources/',
					rename: function(dest, src) {
						return dest + src.replace(/-dbg\.js$/i, ".js");
					}
				}]
			}
		});

		config.applications.forEach(function(oApplication) {
			var sApplicationTarget = 'target/' + oApplication.name;

			uglify['app-target-' + oApplication.name] = {
				files: [{
					src: sApplicationTarget + '/resources/Component-preload-dbg.js',
					dest: sApplicationTarget + '/resources/Component-preload.js'
				}]
			}
		});

		return uglify;
	};
}());
