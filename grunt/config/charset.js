(function() {
	'use strict';

	module.exports = function(grunt, config) {
		return {
			dist: {
				options: {
					from: 'UTF-8',
					to: 'cp1251',
					fileTypes: {
					}
				},
				files: [{
					expand: true,
					src: ['target/*/resources/i18n/i18n_ru.properties']
				}]
			}
		}
	};
}());
