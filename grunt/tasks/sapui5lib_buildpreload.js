(function() {
	'use strict';
	
	module.exports = function(grunt) {
		grunt.registerMultiTask('sapui5lib_buildpreload', 'Build task for SAPUI5 applications - Preload File', function() {
			// Merge task-specific and/or target-specific options with these defaults.
			var mOptions = this.options({});
			var mLibrary = mOptions.libraryConfig;
			var aPreloadDependencies = []; /*mLibrary.dependencies.map(function(sLib) {
				return sLib + ".library-preload";
			});*/
			
			var mPreload = {
				version: mLibrary.version,
				name: mLibrary.name ? mLibrary.name + ".library-preload" : null,
				dependencies: aPreloadDependencies,
				modules: {}
			}
			
			// now create the library.json
			this.files.forEach(function(f) {
				// derive the library path
				var iPathIndex = f.dest.lastIndexOf("/")+1;
				var sDest = f.dest.substr(0,iPathIndex) + mLibrary.name.replace(/\./g, "/") + "/library-preload.json";
				
				f.src.filter(function(filepath) {
					// Warn on and remove invalid source files (if nonull was set).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					}
					
					// Only include .js and .xml, but not *-dbg.js
					return /^(.(?!-dbg\.js))*\.(js|xml)$/i.test(filepath);
				}).forEach(function(filepath) {
					var iPrefixIndex = filepath.indexOf(mLibrary.name.replace(/\./g, "/"));
					var sAdjustedFilepath = filepath.substr(iPrefixIndex, filepath.length-1);
					var sContent = grunt.file.read(filepath, {encoding: 'utf-8'});
					
					mPreload.modules[sAdjustedFilepath] = sContent;
				});
				
				grunt.file.write(sDest, JSON.stringify(mPreload, null, '\t'));
				grunt.log.writeln('File ' + sDest.cyan + ' created.');
			});
		});
	};
}());
