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

	// initiate worker
	worker.loadPage(function (err) {
		if (err) {
			console.log(err);
		}
	});

	setInterval(() => {
		worker.loadPage(function (err) {
			if (err) {
				console.log(err);
			}
		});
	}, 1000 * 60 * 30);

	setInterval(() => {
		worker.clearImages();
	}, 1000 * 60 * 10);
};

// self-executing
// ========================================================
app.init();

// Export App
// ========================================================
module.exports = app;
