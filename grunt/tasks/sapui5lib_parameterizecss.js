(function() {
	'use strict';
	
	module.exports = function(grunt) {
		grunt.registerMultiTask('sapui5lib_parameterizecss', 'Build task for SAPUI5 libraries - Parameterize the CSS', function() {
			var mOptions = this.options({});
			var sCssId = "#sap-ui-theme-sap\u005c." + mOptions.libraryName.replace(/\./g, "\u005c.");
			
			var parseParameters = function(mParameters) {
				return encodeURI(JSON.stringify(mParameters));
			}
			
			this.files.forEach(function(f) {
				f.src.filter(function(filepath) {
					// Warn on and remove invalid source files (if nonull was set).
					if (!grunt.file.exists(filepath)) {
						grunt.log.warn('Source file "' + filepath + '" not found.');
						return false;
					} else {
						return true;
					}
				}).forEach(function(filepath) {
					var iPrefixIndex = filepath.lastIndexOf("/");
					var sParametersFilepath = filepath.substr(0, iPrefixIndex+1) + "library-parameters.json";
					var mParameters = JSON.parse(grunt.file.read(sParametersFilepath, {encoding: 'utf-8'}));
					
					var sParams = "\n\n" + sCssId + "{background-image:url('data:text/plain;utf-8," + parseParameters(mParameters) + ")}";
					
					var mFileContent = grunt.file.read(filepath, {encoding: 'utf-8'});
					grunt.file.write(filepath, mFileContent + sParams);
					grunt.log.writeln('File ' + filepath.cyan + ' adjusted with Theme Designer parameters.');
				});
			});
		});
	};
}());
