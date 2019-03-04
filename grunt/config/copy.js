(function () {
	'use strict';

	module.exports = function (grunt, config) {
		var copy = {
			options: {
				// encoding: 'utf8',
				process: function (content, srcpath) {
					return grunt.util.normalizelf(content);
				},
				processContentExclude: [
					'**/*.{png,gif,jpg,ico,psd,jpeg}'
				]
			}
		};

		// src-to-target copy of applications and libraries (for build process)
		config.applications.forEach(function (oApplication) {
			copy['src-target-' + oApplication.name] = {
				files: [{
					expand: true,
					dot: true,
					cwd: (oApplication.name.indexOf("inbox") > 0) ?  oApplication.path + '/webapp' : oApplication.path + '/src/main/webapp',
					src: [
						'**',
						'!local*.html',
						'!*.jsp',
						'!model/mock/**'
					],
					dest: 'target/' + oApplication.name + '/resources/'
				}]
			};
		});

		config.libraries.forEach(function (oLibrary) {
			copy['src-target-' + oLibrary.name] = {
				files: [{
					expand: true,
					dot: true,
					cwd: oLibrary.path + '/src',
					src: [
						'**'
					],
					dest: 'target/' + oLibrary.name + '/resources/',
					rename: function (dest, src) {
						return dest + src.replace(/\.js$/i, "-dbg.js");
					}
				}]
			};
		});

		// copy git-hooks (for bootstrap)
		copy['githooks'] = {
			files: [{
				expand: true,
				cwd: 'tools/githooks',
				src: '*',
				dest: '.git/hooks'
			}]
		};

		return copy;
	};
}());
