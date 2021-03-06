(function() {
	'use strict';

	module.exports = function(grunt, config) {
		var tasks = {
			'serve': [
				'configureRewriteRules',
				'configureProxies:server',
				'connect:server',
				'watch'
			],
			'build': function() {
				var aTasks = [];

				config.libraries.forEach(function(oLibrary) {
					aTasks.push('clean:target-' + oLibrary.name);
					aTasks.push('copy:src-target-' + oLibrary.name);
					aTasks.push('uglify:lib-target-' + oLibrary.name);

					aTasks.push('sapui5lib_buildpreload:target-' + oLibrary.name);

					aTasks.push('openui5_theme:target-' + oLibrary.name);
					aTasks.push('sapui5lib_parameterizecss:target-' + oLibrary.name);
				});

				config.applications.forEach(function(oApplication) {
					aTasks.push('clean:target-' + oApplication.name);
					aTasks.push('copy:src-target-' + oApplication.name);

					aTasks.push('sapui5app_buildpreload:target-' + oApplication.name);
					aTasks.push('uglify:app-target-' + oApplication.name);
				});

				// Replace placeholders with actual values
				aTasks.push('replace');

				grunt.task.run(aTasks);
			},
			'bootstrap': ['copy:githooks'],
			'git:pre-push': ['eslint'],
			'testrunner': [
				'configureRewriteRules',
				'configureProxies:server',
				'connect:server',
				'karma:all'
			]
		};

		config.libraries.forEach(function(oLibrary) {
			tasks['testrunner:' + oLibrary.name] = [
				'configureRewriteRules',
				'configureProxies:server',
				'connect:server',
				'karma:' + oLibrary.name
			]
		});
		//loop through applications and register Karma tasks
		config.applications.forEach(function(oApplication) {
			tasks['testrunner:' + oApplication.name] = [
				'configureRewriteRules',
				'configureProxies:server',
				'connect:server',
				'karma:' + oApplication.name
			]
		});


		return tasks;
	};
}());
