(function () {
	'use strict';

	module.exports = function (grunt, config) {
		var aJSDocConfigs = {};

		config.allApplications.forEach(function (oApplicationConfig) {
			const oJSDocConfig = {
				src: [oApplicationConfig.path + '/**/*.js', oApplicationConfig.path + '/**/README.md'],
				options: {
					destination: 'docs/' + oApplicationConfig.name,
					template: "node_modules/ink-docstrap/template",
					configure: "node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
			aJSDocConfigs["app-name-" + oApplicationConfig.name] = oJSDocConfig;
		});

		config.allLibraries.forEach(function (oLibraryConfig) {
			const oJSDocConfig = {
				src: [oLibraryConfig.path + '/**/*.js', oLibraryConfig.path + '/**/README.md'],
				options: {
					destination: 'docs/' + oLibraryConfig.name,
					template: "node_modules/ink-docstrap/template",
					configure: "node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
			aJSDocConfigs["lib-name-" + oLibraryConfig.name] = oJSDocConfig;
		});

		return aJSDocConfigs;
	};
}());
