(function() {
	'use strict';

	module.exports = function(grunt, config) {
		var upload = {}

		// src-to-target copy of applications and libraries (for build process)
		config.applications.forEach(function(oApplication) {
			upload['target-' + oApplication.name] = {
				options: {
					conn: {
						server: oApplication.server,
						useStrictSSL: oApplication.useStrictSSL
					},
					auth: {
						user: oApplication.user,
						pwd: oApplication.pwd
					},
					ui5: {
						package: oApplication.package,
						bspcontainer: oApplication.bspcontainer,
						bspcontainer_text: oApplication.bspcontainer_text,
						transportno: oApplication.transportno,
						calc_appindex: oApplication.calc_appindex
					},
					resources: {
						cwd: 'target/' + oApplication.name + '/resources/',
						src: ['**/*.*']
					}
				}
			};
		});

		config.libraries.forEach(function(oLibrary) {
			upload['target-' + oLibrary.name] = {
					options: {
							conn: {
								server: oLibrary.server
							},
							auth: {
								user: oLibrary.user,
								pwd: oLibrary.pwd
							},
							ui5: {
								package: oLibrary.package,
								bspcontainer: oLibrary.bspcontainer,
								bspcontainer_text: oLibrary.bspcontainer_text,
								transportno: oLibrary.transportno
							},
							resources: {
								cwd: 'target/' + oLibrary.name + '/resources/',
								src: ['**/*.*']
							}
					}
			};
		});
		return upload;
}
}());
