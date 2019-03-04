/*global document, window*/
(function(window) {
	"use strict";

	document.body.innerHTML += '<h1 id="qunit-header"></h1>' +
								'<h2 id="qunit-banner"></h2>' +
								'<h2 id="qunit-userAgent"></h2>' +
								'<div id="qunit-testrunner-toolbar"></div>' +
								'<ol id="qunit-tests"></ol>' +
								'<div id="qunit-testresult"></div>' +
								'<div id="qunit-fixture"></div>';

	try {
		var port = jQuery("script[src$='sap-ui-core.js']").attr("src").match(/:(\d+)\//)[1];
		window["sap-ui-config"] = {
			src : "http://localhost:" + port + "/resources/sap-ui-core.js",
			theme: "sap_bluecrystal",
			libs: "sap.m"
		};
	} catch(e) {
		throw e;
	}

	// Load libraries, apparently they are not preloaded
	jQuery.sap.require("sap.m.library");

	jQuery.sap.require("sap.ui.qunit.qunit-css");
    jQuery.sap.require("sap.ui.thirdparty.qunit");
    jQuery.sap.require("sap.ui.thirdparty.sinon");
    jQuery.sap.require("sap.ui.thirdparty.sinon-qunit");
    jQuery.sap.require("sap.ui.qunit.QUnitUtils");
    jQuery.sap.require("sap.ui.qunit.qunit-coverage");

	jQuery.sap.registerModulePath("td.sample.lib", "http://localhost:" + port + "/test-resources/td/sample/lib");

	QUnit.config.autostart = false;
	sinon.config.useFakeTimers = false;

})(window);
