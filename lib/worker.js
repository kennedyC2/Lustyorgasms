// Dependencies
// ==================================================================================
var fs = require("fs");
var path = require("path");

// Container for workers
// ====================================================================================
var worker = {};

// Path to public directory
worker.publicDir = path.join(__dirname, "./../public/");

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
