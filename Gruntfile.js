/*
 * Copyright (c) 2014-2015 SAP SE
 */

(function () {
	'use strict';

	var path = require('path');

	module.exports = function (grunt) {
		// Force unix linefeeds (see https://github.com/gruntjs/grunt/issues/1123)
		grunt.util.linefeed = '\n';

		// Load all custom tasks from grunt/tasks dir
		grunt.loadTasks(path.join(process.cwd(), 'grunt/tasks'));

		grunt.registerTask('default', ['lint', 'test', 'jsdoc']);

		var gruntData = {
			sapui5: {
				resourcePath: '/Users/i326574/WebstormProjects/sapui5workspace/sapui5-dist-static'
			},
			allApplications: [],
			allLibraries: []
		};

		var oOptions = {
			// set of applications to use (e.g. --apps=sample.app)
			apps: grunt.option('apps'),
			// set of libraries to use (e.g. --libs=sample.lib)
			libs: grunt.option('libs')
		};
		var aApplications = oOptions.apps ? oOptions.apps.split(',') : null;
		var aLibraries = oOptions.libs ? oOptions.libs.split(',') : null;

		if (aApplications || aLibraries) {
			gruntData.applications = !aApplications ? [] : gruntData.allApplications.filter(function (oApplication) {
					return aApplications.indexOf(oApplication.name) > -1;
				});

			gruntData.libraries = !aLibraries ? [] : gruntData.allLibraries.filter(function (oLibrary) {
					return aLibraries.indexOf(oLibrary.name) > -1;
				});
		} else {
			gruntData.applications = gruntData.allApplications;
			gruntData.libraries = gruntData.allLibraries;
		}

		// Load all grunt config files (in grunt subfolder) and all tasks installed via npm
		require('load-grunt-config')(grunt, {
			configPath: path.join(process.cwd(), 'grunt/config'),

			// Load grunt plugins just-in-time (faster than using load-grunt-tasks)
			jitGrunt: {
				staticMappings: {
					replace: 'grunt-text-replace',
					configureProxies: 'grunt-connect-proxy',
					configureRewriteRules: 'grunt-connect-rewrite',
					openui5_theme: 'grunt-openui5'
				}
			},

			data: gruntData
		});
	};
}());
