// Dependencies
// ==================================================================================
var fs = require("fs");
var helpers = require("./helper");
var fetch = require("./fetch");
var path = require("path");
var handler = require("./handlers");

// Container for workers
// ====================================================================================
var worker = {};

// Path to templates
worker.templateDir = path.join(__dirname, "./../");
worker.publicDir = path.join(__dirname, "./../public/");
var data = {
	method: "get",
	queryStringObject: {
		p: 1,
		pageLoad: Math.floor(Math.random() * 30) + 1,
	},
};

// Worker.loadPage
worker.loadPage = (callback) => {
	handler.home(data, function (status, fullString) {
		if (status == 200 && fullString) {
			fs.open(worker.templateDir + "templates" + "/" + "indexTemplate" + ".html", "r+", function (err, fileDescriptor) {
				if (!err && fileDescriptor) {
					// Truncate the file
					fs.ftruncate(fileDescriptor, function (err) {
						if (!err) {
							// Update old file with new one
							fs.writeFile(fileDescriptor, fullString, function (err) {
								if (!err) {
									// Close file
									fs.close(fileDescriptor, function (err) {
										if (!err) {
											callback(false, fullString);
										} else {
											callback("Could Not Close File");
										}
									});
								} else {
									callback("Could not Write file");
								}
							});
						} else {
							callback("Could Not Truncate File");
						}
					});
				} else {
					callback("Could Not Open File");
				}
			});
		} else console.log(err);
	});
};

worker.clearImages = function () {
	// Fetch file list
	fs.readdir(worker.publicDir + "card" + "/", function (err, files) {
		if (!err && files && files.length > 0) {
			files.forEach((file) => {
				file.replace(".jpg", "");
				if (Date.now() - parseInt(file) > 1000 * 60 * 10) {
					fs.unlink(worker.publicDir + "card" + "/" + file, function (err) {
						if (err) {
							console.log(err);
						}
					});
				}
			});
		} else {
			console.log(err);
		}
	});
};

// Export Modules
module.exports = worker;
