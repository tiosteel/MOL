(function() {
	'use strict';

	module.exports = function(grunt) {
		grunt.registerMultiTask('sapui5app_buildpreload', 'Build task for SAPUI5 applications - Preload File', function() {
			// Merge task-specific and/or target-specific options with these defaults.
			var mOptions = this.options({});
			var sFilesBasePath = mOptions.appConfig.name.replace(/\./g, "/") + "/";
			var mPreload = {
				name: mOptions.appConfig.name.split(".").concat(["Component-preload"]).join("/"),
				version: '2.0',
				modules: {}
			}

			var fnStringInsert = function(source, index, string) {
				return (index > 0) ? source.substring(0, index) + string + source.substring(index, source.length) : string + this;
			};

			// now create the library.json
			this.files.forEach(function(f) {
				// grunt.log.writeln(JSON.stringify({ sources: f.src }));
				var sTargetPath = f.dest.substr(0, f.dest.lastIndexOf("/")+1);

				var sJsFileContents = f.src.filter(function(filepath) {
					// Warn on and remove invalid source files (if nonull was set).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					}

					return /\.js$/i.test(filepath); // Only js for now; xml can be handled differently
				}).map(function(filepath) {
					var sJsContent = grunt.file.read(filepath, {encoding: 'utf-8'});
					var sActualFilepath = filepath.substr(sTargetPath.length, filepath.length);
					var sAdjustedJsFilepath = sFilesBasePath + sActualFilepath;

					return '\t"' + sAdjustedJsFilepath + '": function() {' + sJsContent.replace(/\r\n/g, "\n") + '}'
				}).join(",\n");

				f.src.filter(function(filepath) {
					// Warn on and remove invalid source files (if nonull was set).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					}

					return /\.xml$/i.test(filepath);
				}).forEach(function(filepath) {
					var sXmlContent = grunt.file.read(filepath, {encoding: 'utf-8'});
					var sAdjustedXmlFilepath = sFilesBasePath + filepath.substr(sTargetPath.length, filepath.length);

					mPreload.modules[sAdjustedXmlFilepath] = sXmlContent;
				});

				f.src.filter(function(filepath) {
					// Warn on and remove invalid source files (if nonull was set).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					}
					console.dir(filepath);
					return /\.properties$/i.test(filepath);
				}).forEach(function(filepath) {
					var sI18nContent = grunt.file.read(filepath, {encoding: 'utf-8'});
					var sAdjustedI18NFilepath = sFilesBasePath + filepath.substr(sTargetPath.length, filepath.length);

					mPreload.modules[sAdjustedI18NFilepath] = sI18nContent;
				});

				var sDestFileContent = "jQuery.sap.registerPreloadedModules(\n" + JSON.stringify(mPreload, null, '\t') + ");";
				var sModuleIdentifier = '"modules": {';
				var iModulesInjectionStart = sDestFileContent.indexOf(sModuleIdentifier);
				if (iModulesInjectionStart > -1 && sJsFileContents !== "") {
					iModulesInjectionStart += sModuleIdentifier.length;
					sDestFileContent = fnStringInsert(sDestFileContent, iModulesInjectionStart, "\n" + sJsFileContents + ",\n");
				}

				grunt.file.write(f.dest, sDestFileContent);
				grunt.log.writeln('File ' + f.dest.cyan + ' created.');
			});
		});
	};
}());
