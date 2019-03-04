(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		var sapui5lib_parameterizecss = {};
		
		config.libraries.forEach(function(oLibrary) {
			var sLibraryTarget = 'target/' + oLibrary.name;
			
			sapui5lib_parameterizecss['target-' + oLibrary.name] = {
				options: {
					libraryName: oLibrary.name
				},
				files: [{
					expand: true,
					cwd: sLibraryTarget,
					src: '**/themes/*/{library,library-RTL}.css'
				}]
			}
		});
		
		return sapui5lib_parameterizecss;
	};
}());
