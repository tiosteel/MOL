(function () {
	'use strict';

	module.exports = function (grunt, config) {
		var sapui5app_buildpreload = {};

		config.applications.forEach(function (oApplication) {
			var sApplicationTarget = 'target/' + oApplication.name + '/resources';

			sapui5app_buildpreload['target-' + oApplication.name] = {
				options: {
					appConfig: oApplication
				},
				files: [{
					src: [sApplicationTarget + '/**/*.{js,xml,properties}',
						'!' + sApplicationTarget + '/model/mock/**',
						'!' + sApplicationTarget + '/lib/**',
						'!' + sApplicationTarget + '/Component-preload-dbg.js',
						'!' + sApplicationTarget + '/Component-preload.js',
					],
					dest: sApplicationTarget + '/Component-preload-dbg.js'
				}]
			}
		});

		return sapui5app_buildpreload;
	};
}());
