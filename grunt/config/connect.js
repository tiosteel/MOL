(function () {
	'use strict';

	module.exports = function (grunt, config) {
		// set default port
		grunt.option('port', 7999);  // use a system-assigned port

		var aRewriteRules = [];
		config.libraries.forEach(function (oLibrary) {
			var sLibraryPath = oLibrary.name.replace(/\./g, '/');
			aRewriteRules.push({
				from: '^/resources/' + sLibraryPath + '/(.*)$',
				// the library path begins with src/, but src already is the base mount path for the grunt server
				// so we need to strip it from oLibrary.path
				to: '/' + oLibrary.path.replace(/^src\//, '') + '/src/' + sLibraryPath + '/$1'
			});
			aRewriteRules.push({
				from: '^/test-resources/' + sLibraryPath + '/(.*)$',
				// the library path begins with src/, but src already is the base mount path for the grunt server
				// so we need to strip it from oLibrary.path
				to: '/' + oLibrary.path.replace(/^src\//, '') + '/test/' + sLibraryPath + '/$1'
			});
		});

		config.applications.forEach(function (oApplication) {
			var sLibraryPath = oApplication.name.replace(/\./g, '/');

			aRewriteRules.push({
				from: '^/resources/' + sLibraryPath + '/(.*)$',
				// the application path begins with src/, but src already is the base mount path for the grunt server
				// so we need to strip it from oApplication.path
				to: '/' + oApplication.path.replace(/^src\//, '') + '/src/main/webapp/$1'
			});
			aRewriteRules.push({
				from: '^/test-resources/' + sLibraryPath + '/(.*)$',
				// the application path begins with src/, but src already is the base mount path for the grunt server
				// so we need to strip it from oApplication.path
				to: '/' + oApplication.path.replace(/^src\//, '') + '/src/test/qunit/$1'
			});
			aRewriteRules.push({
					from: '^(.*)/webapp/index.html(.*)$',
					to: '$1/webapp/localIndex.html$2'
				}
			);
			aRewriteRules.push(
				{
					from: '^(.*)/webapp/[?](.*)$',
					to: '$1/webapp/localIndex.html?$2'
				});
			aRewriteRules.push(
				{
					from: '^(.*)/webapp/$',
					to: '$1/webapp/localIndex.html'
				});
		});

		aRewriteRules.push({
			from: '^/appconfig/fioriSandboxConfig.json',
			to: '/fioriSandboxConfig.json'
		});

		return {
			server: {
				options: {
					port: '<%= grunt.option("port") %>',
					hostname: 'localhost',
					base: 'src',
					open: true,
					middleware: function (connect, options) {
						if (!Array.isArray(options.base)) {
							options.base = [options.base];
						}

						var middlewares = [];

						// Setup rewrite rules and proxy
						middlewares.push(require('grunt-connect-rewrite/lib/utils').rewriteRequest);
						middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

						// Serve static files
						options.base.forEach(function (base) {
							middlewares.push(connect.static(base));
						});

						// Make directory browsable
						var directory = options.directory || options.base[options.base.length - 1];
						middlewares.push(connect.directory(directory));

						// Inject the static SAPUI5 sources
						// It is important to inject this middleware AFTER the rewrite middleware because
						// the rewrite middleware will serve sources like /resources/<library namespace>/*
						// (i.e. the specific resources), whereas <sapui5.resourcePath> maps the generic
						// /resources and /test-resources of the SAPUI5 library
						middlewares.push(connect.static(config.sapui5.resourcePath));

						// Enable CORS (e.g. for Karma)
						middlewares.unshift(function (req, res, next) {
							res.setHeader('Access-Control-Allow-Origin', '*');
							res.setHeader('Access-Control-Allow-Methods', '*');
							return next();
						});

						console.log('Port: ' + grunt.template.process('<%= connect.server.options.port %>'));

						return middlewares;
					}
				},
				proxies: [
					{
						context: '/sap/opu/odata/sap/Z_FL_ADDIT_INFO_SRV',
						host: '172.16.41.25',
						port: 8000,
						https: false
					},
					{
						context: '/xsodata/services.xsodata',
						host: 'ktzhisddb.ktzh.railways.local',
						port: 51082,
						https: true,
						xforward: true,
						changeOrigin: true
					},
					{
						context: '/sap',
						host: 'vlg-sap-rio1.megafon.ru',
						port: 80,
						https: false,
						xforward: true,
						ws: true
					}
				]
			},
			rules: aRewriteRules
		};
	};
}());
