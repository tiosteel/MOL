(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		var sapui5lib_buildpreload = {};
		
		config.libraries.forEach(function(oLibrary) {
			var sLibraryTarget = 'target/' + oLibrary.name;
			
			sapui5lib_buildpreload['target-' + oLibrary.name] = {
				options: {
					libraryConfig: oLibrary
				}
			}
			sapui5lib_buildpreload['target-' + oLibrary.name]['files'] = {};
			sapui5lib_buildpreload['target-' + oLibrary.name]['files'][sLibraryTarget + '/resources/library-preload.json'] = [sLibraryTarget + '/**/*.js', sLibraryTarget + '/**/*.xml'];
		});
		
		return sapui5lib_buildpreload;
	};
}());
