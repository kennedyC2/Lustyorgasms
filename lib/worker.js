// Dependencies
// ==================================================================================
var fs = require("fs");
var helpers = require("./helper");
var fetch = require("./fetch");
var path = require("path");

// Container for workers
// ====================================================================================
var worker = {};

// Path to templates
worker.templateDir = path.join(__dirname, "./../");
worker.publicDir = path.join(__dirname, './../public/');

// Worker.loadPage
worker.loadPage = function (callback) {
	fetch.allCategories(false, function (err, straight, gay) {
		if ((!err && straight, gay)) {
			const pageLoad = Math.floor(Math.random() * 30) + 1;
			// Video folders
			var line = ['mv', 'rt'];
			// Randomize line
			var n = Math.floor(Math.random() * 2);
			if (line[n] == 'mv') {
				// fetch most viewed videos
				fetch.listVideos_mv(true, pageLoad, function (err, list) {
					if (!err && list) {
						//console.log(videoData);
						// Prepare data for interpolation
						var templateData = {
							"head.title": "Lust & Orgasms",
							"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
							"body.class": "index",
							"body.title": "Lusty Orgasms | Porn Videos",
							"body.title1": "Lusty Orgasms | Porn Videos",
							"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
							"body.url1": "https://lustyorgasms.com",
							"body.url2": "https://lustyorgasms.com",
							"body.url3": "https://lustyorgasms.com",
							"body.straight": straight,
							"body.gay": gay,
							"ipBody.straight": straight,
							"ipBody.gay": gay,
							"dpBody.straight": straight,
							"dpBody.gay": gay,
							"body.one": list,
							"body.two": list,
							"body.three": list,
							"body.page": 2,
							"body.close": ''
						};

						// Get index template
						helpers.getTemplate("index", templateData, function (err, templateString) {
							if (!err && templateString) {
								//console.log(templateData);
								helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
									if (!err && fullString) {
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
									} else {
										callback("Error Getting Full String");
									}
								});
							} else {
								callback("Error With Template String");
							}
						});
					} else {
						callback("Error Fetching Most Viewed Videos");
					}
				});
			} else {
				// fetch most viewed videos
				fetch.listVideos_rt(true, pageLoad, function (err, list) {
					if (!err && list) {
						//console.log(videoData);
						// Prepare data for interpolation
						var templateData = {
							"head.title": "Lust & Orgasms",
							"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
							"body.class": "index",
							"body.title": "Lusty Orgasms | Porn Videos",
							"body.title1": "Lusty Orgasms | Porn Videos",
							"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
							"body.url1": "https://lustyorgasms.com",
							"body.url2": "https://lustyorgasms.com",
							"body.url3": "https://lustyorgasms.com",
							"body.straight": straight,
							"body.gay": gay,
							"ipBody.straight": straight,
							"ipBody.gay": gay,
							"dpBody.straight": straight,
							"dpBody.gay": gay,
							"body.one": list,
							"body.two": list,
							"body.three": list,
							"body.page": 2,
							"body.close": ''
						};

						// Get index template
						helpers.getTemplate("index", templateData, function (err, templateString) {
							if (!err && templateString) {
								//console.log(templateData);
								helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
									if (!err && fullString) {
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
									} else {
										callback("Error Getting Full String");
									}
								});
							} else {
								callback("Error With Template String");
							}
						});
					} else {
						callback("Error Fetching Most Viewed Videos");
					}
				});
			}
		} else {
			callback("Error Fetching Categories");
		}
	});
};


worker.clearImages = function () {
	// Fetch file list
	fs.readdir(worker.publicDir + "card" + "/", function (err, files) {
		if (!err && files && files.length > 0) {
			files.forEach((file) => {
				file.replace(".jpg", "");
				if (Date.now() - parseInt(file) > (1000 * 60 * 10)) {
					fs.unlink(worker.publicDir + "card" + "/" + file, function (err) {
						if (err) {
							console.log(err)
						}
					});
				}
			});
		} else {
			console.log(err);
		}
	});
}

// Export Modules
module.exports = worker;
