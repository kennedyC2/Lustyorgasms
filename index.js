/*
 *
 * API Launcher file
 *
 */

// Dependencies
// =====================================================================================
var server = require("./lib/server");
var worker = require("./lib/worker");

// App Container
// ====================================================================================
var app = {};

// init function
// =====================================================================================
app.init = function () {
	// Initiate server
	server.init();

	worker.loadPage(function (err) {
		if (err) {
			console.log(err);
		}
	});

	// initiate worker
	setInterval(() => {
		worker.loadPage(function (err) {
			if (err) {
				console.log(err);
			}
		});
	}, 1000 * 60 * 60);
};

// self-executing
// ========================================================
app.init();

// Export App
// ========================================================
module.exports = app;
