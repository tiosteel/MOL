// (function() {
// 	'use strict';
//
// 	module.exports = function(grunt, config) {
// 		var openui5_theme = {
// 			// default options for all targets
// 			options: {
// 				// pass in src folders of all libraries to support @import directives
// 				// across all library projects
// 				rootPaths: config.allLibraries.map(function(oLibrary) {
// 					return oLibrary.path + '/src';
// 				}),
//
// 				// set compress flag using grunt option (--minifiy-css)
// 				compiler: {
// 					compress: grunt.option('minify-css')
// 				}
// 			}
// 		};
//
// 		config.libraries.forEach(function(oLibrary) {
// 			openui5_theme['target-' + oLibrary.name] = {
// 				// Note: Theme must be built from src files, not target copy
// 				//       Reason is that relative @import paths must be retained
// 				//       @import paths in target would no longer be valid (different path depth / libraries not contained in build)
// 				files: [
// 					{
// 						expand: true,
// 						cwd: oLibrary.path + '/src',
// 						src: '**/themes/*/library.source.less',
// 						dest: 'target/' + oLibrary.name + '/resources'
// 					}
// 				]
// 			}
// 		});
//
// 		return openui5_theme;
// 	};
// }());
