(function() {
	'use strict';

	module.exports = function(grunt, config) {
		var eslint = {
			options: {
				quiet: true
			}
		};

		var aDefault = [];

		// Lint all applications
		config.applications.forEach(function(oApplication) {
			eslint[oApplication.name] = [oApplication.path];
		});

		// Lint all libraries
		config.libraries.forEach(function(oLibrary) {
			eslint[oLibrary.name] = [oLibrary.path];
		});

		return eslint;
	};
}());
