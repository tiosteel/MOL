(function() {
	'use strict';
	
	module.exports = function(grunt, config) {
		return {
			target: {
				// replace patterns in all relevant files in the target resources dir
				src: [
					'target/*/resources/**/*.{js,css,less,json,xml,html}',
					'target/*/resources/**/.*'
				],
				
				// overwrite target files instead of copying into a dist dir
				overwrite: true,
				
				replacements: [
					// ${copyright} or @copyright@
					{
						from: /(?:\$\{copyright\}|@copyright@)/g,
						to:
							'ACS Passport by SAP Custom Development' + '\n' +
							' * (c) Copyright 2014-' + new Date().getFullYear() + ' SAP SE or an SAP affiliate company.'
					},
					
					// ${version} or @version@
					{
						from: /(?:\$\{version\}|@version@)/g,
						to: '<%= package.version %>' // use version defined in package.json
					},
					
					// ${buildtime} or @buildtime@
					{
						from: /(?:\$\{buildtime\}|@buildtime@)/g,
						to: '<%= buildtime %>'
					},
					
					// ${lastchange} or @lastchange@
					{
						from: /(?:\$\{lastchange\}|@lastchange@)/g,
						to: '<%= lastchange %>'
					}
				]
			}
		};
	};
}());
