(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		var clean = {};
		
		config.libraries.forEach(function(oLibrary) {
			clean['target-' + oLibrary.name] = {
				dot: true,
				src: ['target/' + oLibrary.name]
			}
		});
		
		config.applications.forEach(function(oApplication) {
			clean['target-' + oApplication.name] = {
				dot: true,
				src: ['target/' + oApplication.name]
			}
		});
		
		return clean;
	};
}());
