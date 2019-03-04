(function() {
	'use strict';

	module.exports = function(grunt, config) {
		var karma = {},
			allSrcFiles = [], allTestFiles = [], allScripts = [], allExcludeFiles = [],
			ui5File = { pattern: 'http://localhost:<%= connect.server.options.port %>/resources/sap-ui-core.js', included: true },
			karmaBootstrapFile = { pattern: 'karma.ui5-qunit-bootstrap.js', included: true };

		// General config
		karma.options = {
			basePath: '',
			port: 9876,
			colors: true,
			autoWatch: true,
			browsers: ['Chrome'],
			frameworks: ['qunit'],
			//plugins: ['karma-qunit'],
			singleRun: false
		};


		function fnRegisterKarma(oProject) {
			var srcFiles = [],
				testFiles = [],
				scriptFiles = [],
				excludeFiles = [];

			// Determine script files
			if (oProject.karma && oProject.karma.scripts && typeof oProject.karma.scripts.forEach === 'function') {
				oProject.karma.scripts.forEach(function(script) {
					var scriptFile = { pattern: script, included: true };
					scriptFiles.push(scriptFile);
				});
			}

			// Determine excluded files
			if (oProject.karma && oProject.karma.exclude && typeof oProject.karma.exclude.forEach === 'function') {
				excludeFiles = excludeFiles.concat(oProject.karma.exclude);
			}

			// Determine include files
			if (oProject.karma && oProject.karma.include && typeof oProject.karma.include.forEach === 'function') { // only explicit files
				oProject.karma.include.forEach(function(include) {
					srcFiles.push({ pattern: oProject.path + include + '.js', included: false });
					srcFiles.push({ pattern: oProject.path + include + '.xml', included: false });
					testFiles.push({ pattern: oProject.path + include + '.qunit.js', included: true });
				});
			} else { // all files in lib
				srcFiles.push({ pattern: oProject.path + '/**/*.js', included: false });
				srcFiles.push({ pattern: oProject.path + '/**/*.xml', included: false });
				testFiles.push({ pattern: oProject.path + '/**/*qunit.js', included: true });
			}

			// Global files for karma:all
			allSrcFiles.concat(srcFiles);
			allTestFiles.concat(testFiles);
			allScripts = allScripts.concat(scriptFiles);
			allExcludeFiles = allExcludeFiles.concat(excludeFiles);
			karma[oProject.name] = {
				options: {
					files: [ui5File, karmaBootstrapFile].concat(scriptFiles).concat(testFiles).concat(srcFiles),
					exclude: excludeFiles
				}
			};

		}

		config.applications.forEach(fnRegisterKarma);
		config.libraries.forEach(fnRegisterKarma);

		karma.all = {
			options: {
				files: [ui5File, karmaBootstrapFile].concat(allScripts).concat(allTestFiles).concat(allSrcFiles),
				exclude: allExcludeFiles
			}
		};

		return karma;
	};
}());
