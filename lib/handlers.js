/*
 *
 * script for handlers
 *
 */

// Dependencies
// ==================================================================================
var helpers = require("./helper");
var fetch = require("./fetch");
var path = require("path");
var fs = require("fs");
var web = require("./image.js");

// Container for all handler functions
// ===================================================================================
var handler = {};

// handler.index
// =========================================================================================================
handler.index = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Get Template
		var templateDir = path.join(__dirname, "./../templates/");
		fs.readFile(templateDir + "indexTemplate" + ".html", "utf-8", function (err, templateData) {
			if (!err && templateData) {
				callback(200, templateData, "html");
			} else {
				callback("Template Not found");
				// console.log("Template Not found");
			}
		});
	} else {
		callback(405, undefined, "html");
	}
};

// handler.ping
// ======================================================================================================
handler.ping = function (data, callback) {
	callback(200, "Up and Running", "html");
};

// handler.hello
// ======================================================================================================
handler.hello = function (data, callback) {
	callback(200, "Welcome to the best porn website in the world", "html");
};

// handler.notFound
// ======================================================================================================
handler.notFound = function (data, callback) {
	callback(404);
	// Define template data for interpolation
	templateData = {
		"head.title": "Lust & Orgasms",
		"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
		"body.class": 404,
		"body.title": 404,
		"body.title1": 404,
		"body.title2": 404,
		"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
		"body.url1": url,
		"body.url2": url,
		"body.url3": url,
		"body.straight": straight,
		"body.gay": gay,
		"ipBody.straight": straight,
		"ipBody.gay": gay,
		"dpBody.straight": straight,
		"dpBody.gay": gay,
		"body.Keyword": tag,
		"body.nextKeyword": tag,
		"body.videoData1": "",
		"body.videoData2": "",
		"body.videoData3": "",
		"body.prevPage": "",
		"body.next": "",
		"body.close": "hide",
	};

	// Get template string
	helpers.getTemplate("400", templateData, function (err, templateString) {
		if (!err && templateString) {
			// Get full template
			helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
				if (!err && fullString) {
					callback(400, fullString, "html");
				} else {
					callback(500, undefined, "html");
				}
			});
		} else {
			callback(500, undefined, "html");
		}
	});
};

// Handler.public
// ======================================================================================================
handler.public = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Get the filename requested
		var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
		if (trimmedAssetName && trimmedAssetName.length > 0) {
			// Get the asset data
			helpers.getStaticAssets(trimmedAssetName, function (err, data) {
				if (!err && data) {
					//console.log(data);
					// Determine teh content type (default to plain)
					var contentType = "plain";

					// css
					if (trimmedAssetName.indexOf(".css") > -1) {
						contentType = "css";
					}

					// JS
					if (trimmedAssetName.indexOf(".js") > -1) {
						contentType = "js";
					}

					// svg
					if (trimmedAssetName.indexOf(".svg") > -1) {
						contentType = "svg";
					}

					// callback the data
					callback(200, data, contentType);
				} else {
					callback(404);
				}
			});
		} else {
			callback(404);
		}
	} else {
		callback(405);
	}
};

// handler.getVideo
// ===========================================================================================
handler.getVideo = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// trim off unnecessary details
		var q = data.queryStringObject.q || data.queryStringObject.category || data.trimmedPath.split("/")[1];
		var p = data.queryStringObject.p || data.queryStringObject.page;
		var category = typeof q == "string" && q.trim().length > 0 ? q.trim() : false;
		var page = typeof p !== undefined ? parseInt(p) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (category && page) {
			// Get categories
			fetch.allCategories(false, function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch video by category
					fetch.videoByCategory(category, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = "";
							if (nextPage <= num / 20 - 1) {
								// Define template data for interpolation
								templateData = {
									"head.title": "Lust & Orgasms",
									"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
									"body.class": "videoByCategory",
									"body.title": "Lusty Orgasms | Video Category: " + category,
									"body.title1": "Lusty Orgasms | Video Category: " + category,
									"body.title2": "Lusty Orgasms | Video Category: " + category,
									"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
									"body.url1": url,
									"body.url2": url,
									"body.url3": url,
									"body.straight": straight,
									"body.gay": gay,
									"ipBody.straight": straight,
									"ipBody.gay": gay,
									"dpBody.straight": straight,
									"dpBody.gay": gay,
									"body.videoByCategory1": videoData,
									"body.videoByCategory2": videoData,
									"body.videoByCategory3": videoData,
									"body.Category": category,
									"body.next": nextPage,
									"body.close": "",
								};
							} else {
								// Define template data for interpolation
								templateData = {
									"head.title": "Lust & Orgasms",
									"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
									"body.class": "videoByCategory",
									"body.title": "Lusty Orgasms | Video Category: " + category,
									"body.title1": "Lusty Orgasms | Video Category: " + category,
									"body.title2": "Lusty Orgasms | Video Category: " + category,
									"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
									"body.url1": url,
									"body.url2": url,
									"body.url3": url,
									"body.straight": straight,
									"body.gay": gay,
									"ipBody.straight": straight,
									"ipBody.gay": gay,
									"dpBody.straight": straight,
									"dpBody.gay": gay,
									"body.videoByCategory1": videoData,
									"body.videoByCategory2": videoData,
									"body.videoByCategory3": videoData,
									"body.Category": category,
									"body.next": nextPage,
									"body.close": "hide",
								};
							}

							//console.log(num);
							helpers.getTemplate("videoByCategory", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									console.log("y");
									callback(500, undefined, "html");
								}
							});
						} else {
							// Define template data for interpolation
							templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "videoByCategory",
								"body.title": "Lusty Orgasms | Video Category: " + category,
								"body.title1": "Lusty Orgasms | Video Category: " + category,
								"body.title2": "Lusty Orgasms | Video Category: " + category,
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": url,
								"body.url2": url,
								"body.url3": url,
								"body.straight": straight,
								"body.gay": gay,
								"ipBody.straight": straight,
								"ipBody.gay": gay,
								"dpBody.straight": straight,
								"dpBody.gay": gay,
								"body.videoByCategory1": videoData,
								"body.videoByCategory2": videoData,
								"body.videoByCategory3": videoData,
								"body.Category": category,
								"body.next": nextPage,
								"body.close": "hide",
							};

							// Get template string
							helpers.getTemplate("400", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(400, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									callback(500, undefined, "html");
								}
							});
						}
					});
				} else {
					console.log("h");
					callback(500, undefined, "html");
				}
			});
		} else {
			callback(400, undefined, "html");
		}
	} else {
		callback(405, undefined, "html");
	}
};

// handler.search
// ==========================================================================================
handler.search = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		var q = data.queryStringObject.q || data.queryStringObject.keyword;
		var p = data.queryStringObject.p || data.queryStringObject.page;
		var keyword = typeof q == "string" && q.trim().length > 0 ? q.trim() : false;
		var page = typeof p !== undefined ? parseInt(p) : false;
		var nextPage = page + 1;
		// var prevPage = page - 1;
		if (keyword && page) {
			// Fetch categories
			fetch.allCategories(false, function (err, straight, gay) {
				if ((!err && straight, gay)) {
					// fetch data
					fetch.search(keyword, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = "";
							if (nextPage <= num / 20 - 1) {
								// Define template data for interpolation
								templateData = {
									"head.title": "Lust & Orgasms",
									"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
									"body.class": "search",
									"body.title": "Lusty Orgasms | Search Videos: " + keyword,
									"body.title1": "Lusty Orgasms | Search Videos: " + keyword,
									"body.title2": "Lusty Orgasms | Search Videos: " + keyword,
									"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
									"body.url1": url,
									"body.url2": url,
									"body.url3": url,
									"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
									"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
									"body.url": data.url,
									"body.straight": straight,
									"body.gay": gay,
									"ipBody.straight": straight,
									"ipBody.gay": gay,
									"dpBody.straight": straight,
									"dpBody.gay": gay,
									"body.Keyword": keyword,
									"body.query": keyword,
									"body.videoData1": videoData,
									"body.videoData2": videoData,
									"body.videoData3": videoData,
									"body.next": nextPage,
									"body.close": "",
								};
							} else {
								// Define template data for interpolation
								templateData = {
									"head.title": "Lust & Orgasms",
									"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
									"body.class": "search",
									"body.title": "Lusty Orgasms | Search Videos: " + keyword,
									"body.title1": "Lusty Orgasms | Search Videos: " + keyword,
									"body.title2": "Lusty Orgasms | Search Videos: " + keyword,
									"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
									"body.url1": url,
									"body.url2": url,
									"body.url3": url,
									"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
									"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
									"body.url": data.url,
									"body.straight": straight,
									"body.gay": gay,
									"ipBody.straight": straight,
									"ipBody.gay": gay,
									"dpBody.straight": straight,
									"dpBody.gay": gay,
									"body.Keyword": keyword,
									"body.query": keyword,
									"body.videoData1": videoData,
									"body.videoData2": videoData,
									"body.videoData3": videoData,
									"body.next": nextPage,
									"body.close": "hide",
								};
							}

							// Get template string
							helpers.getTemplate("search", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									callback(500, undefined, "html");
								}
							});
						} else {
							// Video not foumd
							templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "search",
								"body.title": "Lusty Orgasms | Not Found",
								"body.title1": "Lusty Orgasms | Not Found",
								"body.title2": "Lusty Orgasms | Not Found",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": url,
								"body.url2": url,
								"body.url3": url,
								"body.straight": straight,
								"body.gay": gay,
								"ipBody.straight": straight,
								"ipBody.gay": gay,
								"dpBody.straight": straight,
								"dpBody.gay": gay,
							};

							// Get template string
							helpers.getTemplate("400", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(400, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									callback(500, undefined, "html");
								}
							});
						}
					});
				} else {
					callback(500, undefined, "html");
				}
			});
		} else {
			callback(400, undefined, "html");
		}
	} else {
		callback(405, undefined, "html");
	}
};

// handler.playVideo
// ==========================================================================================
handler.playVideo = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		let vid_id;
		// console.log(data.trimmedPath, data.path)
		if (data.trimmedPath == "playVideo") {
			vid_id = data.queryStringObject.id.toString();
		} else {
			vid_id = data.trimmedPath.split("/")[1];
		}
		var id = typeof vid_id !== undefined ? vid_id : false;
		if (id) {
			// Get category
			fetch.allCategories(false, function (err, straight, gay) {
				if ((!err && straight, gay)) {
					// fetch title and tags
					fetch.videoById(id, function (err, title, tags) {
						if (!err && title && tags) {
							// fetch videos by related videos
							fetch.relatedVideos(id, function (err, relatedVideos) {
								if (!err && relatedVideos) {
									// fetch iframe
									fetch.iframe(id, function (err, data, thumb) {
										if (!err && data && thumb) {
											// Save web image
											var imageTitle = Date.now();
											web.get(thumb, imageTitle);
											// Edit video div
											var edit = data
												.replace(/'false'/g, "'true'")
												.replace(/watchHD:.true/g, "watchHD: false")
												.replace(/id="thumbs_wrapper"/g, 'id="thumbs_wrapper" style="display: none;"')
												.replace(/"link_url"/g, '"link__url"')
												.replace(/"related_url"/g, '"related__url"')
												.replace(/"actionTags"/g, '"actionTaggs"')
												.replace(/a.orangeButton:visited {\n            color: #000;\n        }/g, "a.orangeButton:visited {\n            color: #000;\n        }\n.mhp1138_container .mhp1138_eventCatcher {\n            pointer-events: none;\n        }")
												.replace(/twitter/g, "")
												.replace(/background: #000 none repeat scroll 0 0;/g, "")
												.replace(/color: #fff;/g, "")
												.replace(/font-family: Arial,Helvetica,sans-serif;/g, "")
												.replace(/font-size: 12px;/g, "")
												.replace(/utmSource = document.referrer.split..\/...2./g, "utmSource = ''");
											// Define template data for interpolation
											templateData = {
												"head.title": "Lust & Orgasms",
												"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
												"body.class": "search play",
												"body.straight": straight,
												"body.title": title,
												"body.title1": title,
												"body.title2": title,
												"body.gay": gay,
												"body.thumb": "https://lustyorgasms.com/public/card/" + imageTitle + ".jpg",
												"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
												"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
												"body.url1": url,
												"body.url2": url,
												"body.url3": url,
												"ipBody.straight": straight,
												"ipBody.gay": gay,
												"dpBody.straight": straight,
												"dpBody.gay": gay,
												"body.videoData": edit,
												"body.tag": tags,
												"body.related1": relatedVideos,
												"body.related2": relatedVideos,
												"body.related3": relatedVideos,
											};

											// Get template string
											helpers.getTemplate("playVideo", templateData, function (err, templateString) {
												if (!err && templateString) {
													// Get full template
													helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
														if (!err && fullString) {
															callback(200, fullString, "html");
														} else {
															callback(500, undefined, "html");
														}
													});
												} else {
													callback(500, undefined, "html");
												}
											});
										} else {
											callback(500, undefined, "html");
											console.log("s");
										}
									});
								} else {
									callback(500, undefined, "html");
									console.log("r");
								}
							});
						} else {
							// Video not found
							templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "search play",
								"body.straight": straight,
								"body.title": "Lusty Orgasms | Video Unavailable",
								"body.title1": "Lusty Orgasms | Video Unavailable",
								"body.title2": "Lusty Orgasms | Video Unavailable",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": url,
								"body.url2": url,
								"body.url3": url,
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.url": "https://lustyorgasms.com",
								"body.gay": "Lusty Orgasms | Porn Videos",
								"ipBody.straight": straight,
								"ipBody.gay": gay,
								"dpBody.straight": straight,
								"dpBody.gay": gay,
							};

							// Get template string
							helpers.getTemplate("404", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(404, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									callback(500, undefined, "html");
								}
							});
						}
					});
				} else {
					callback(500, undefined, "html");
					console.log("h");
				}
			});
		} else {
			callback(400, undefined, "html");
		}
	} else {
		callback(405, undefined, "html");
	}
};

// handler.tagVideo
// ==========================================================================================
handler.tagVideo = function (data, callback) {
	// Define method
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Get tag
		var q = data.queryStringObject.q || data.queryStringObject.keyword;
		var p = data.queryStringObject.p || data.queryStringObject.page;
		var tag = typeof q == "string" && q.trim().length > 0 ? q.trim() : false;
		var page = typeof p !== undefined ? parseInt(p) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (tag && page) {
			// fetch category
			fetch.allCategories(false, function (err, straight, gay) {
				if ((!err && straight, gay)) {
					// fetch tag video
					fetch.videoByTags(tag, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = "";
							if (nextPage <= num / 20 - 1) {
								// Define template data for interpolation
								templateData = {
									"head.title": "Lust & Orgasms",
									"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
									"body.class": "tagVideo",
									"body.title": "Lusty Orgasms | Search Videos: " + tag,
									"body.title1": "Lusty Orgasms | Search Videos: " + tag,
									"body.title2": "Lusty Orgasms | Search Videos: " + tag,
									"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
									"body.url1": url,
									"body.url2": url,
									"body.url3": url,
									"body.straight": straight,
									"body.gay": gay,
									"ipBody.straight": straight,
									"ipBody.gay": gay,
									"dpBody.straight": straight,
									"dpBody.gay": gay,
									"body.keyword": tag,
									"body.nextKeyword": tag,
									"body.videoData1": videoData,
									"body.videoData2": videoData,
									"body.videoData3": videoData,
									"body.prevPage": prevPage,
									"body.next": nextPage,
									"body.close": "",
								};
							} else {
								// Define template data for interpolation
								templateData = {
									"head.title": "Lust & Orgasms",
									"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
									"body.class": "tagVideo",
									"body.title": "Lusty Orgasms | Search Videos: " + tag,
									"body.title1": "Lusty Orgasms | Search Videos: " + tag,
									"body.title2": "Lusty Orgasms | Search Videos: " + tag,
									"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
									"body.url1": url,
									"body.url2": url,
									"body.url3": url,
									"body.straight": straight,
									"body.gay": gay,
									"ipBody.straight": straight,
									"ipBody.gay": gay,
									"dpBody.straight": straight,
									"dpBody.gay": gay,
									"body.Keyword": tag,
									"body.nextKeyword": tag,
									"body.videoData1": videoData,
									"body.videoData2": videoData,
									"body.videoData3": videoData,
									"body.prevPage": prevPage,
									"body.next": nextPage,
									"body.close": "hide",
								};
							}

							//console.log(num);
							// Get template string
							helpers.getTemplate("tagVideo", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									console.log("g5");
									callback(500, undefined, "html");
								}
							});
						} else {
							// Define template data for interpolation
							templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "tagVideo",
								"body.title": "Lusty Orgasms | Search Videos: " + tag,
								"body.title1": "Lusty Orgasms | Search Videos: " + tag,
								"body.title2": "Lusty Orgasms | Search Videos: " + tag,
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": url,
								"body.url2": url,
								"body.url3": url,
								"body.straight": straight,
								"body.gay": gay,
								"ipBody.straight": straight,
								"ipBody.gay": gay,
								"dpBody.straight": straight,
								"dpBody.gay": gay,
								"body.Keyword": tag,
								"body.nextKeyword": tag,
								"body.videoData1": videoData,
								"body.videoData2": videoData,
								"body.videoData3": videoData,
								"body.prevPage": prevPage,
								"body.next": nextPage,
								"body.close": "hide",
							};

							// Get template string
							helpers.getTemplate("400", templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(400, fullString, "html");
										} else {
											callback(500, undefined, "html");
										}
									});
								} else {
									callback(500, undefined, "html");
								}
							});
						}
					});
				} else {
					console.log("g");
					callback(500, undefined, "html");
				}
			});
		} else {
			console.log("h");
			callback(400, undefined, "html");
		}
	} else {
		console.log("i");
		callback(405, undefined, "html");
	}
};

// handler.home
// ==========================================================================================
handler.home = function (data, callback) {
	if (data.method == "get") {
		// Define Collectables
		var page = typeof data.queryStringObject.p !== undefined ? parseInt(data.queryStringObject.p) : false;
		if (page) {
			// Video folders
			var pageLoad = page == 1 ? data.queryStringObject.pageLoad : page;
			var line = ["mv", "rt"];
			var nextPage = page + 1;
			// fetch categories
			fetch.allCategories(false, function (err, straight, gay) {
				if ((!err && straight, gay)) {
					// Randomize line
					var n = Math.floor(Math.random() * 2);
					if (line[n] == "mv") {
						// Fetch data
						fetch.listVideos_mv(true, pageLoad, function (err, list, num) {
							if (!err && list && num) {
								if (nextPage <= num / 20 - 1) {
									// get international
									fetch.listVideos_it(true, pageLoad, function (err, list_2, num) {
										if (!err && list && num) {
											// Define Template Data
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
												"body.three": list_2,
												"body.one2": list_2,
												"body.page": nextPage,
												"body.close": "",
											};

											// Get Template
											helpers.getTemplate("index", templateData, function (err, template) {
												if (!err && template) {
													helpers.getFullTemplate(template, templateData, function (err, fullString) {
														if (!err && fullString) {
															callback(200, fullString, "html");
														} else {
															callback(500, undefined, "html");
														}
													});
												} else {
													callback(500, undefined, "html");
												}
											});
										}
									});
								} else {
									// get international
									fetch.listVideos_it(true, pageLoad, function (err, list_2, num) {
										if (!err && list && num) {
											// Define Template Data
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
												"body.three": list_2,
												"body.one2": list_2,
												"body.page": nextPage,
												"body.close": "hide;",
											};

											// Get Template
											helpers.getTemplate("index", templateData, function (err, template) {
												if (!err && template) {
													helpers.getFullTemplate(template, templateData, function (err, fullString) {
														if (!err && fullString) {
															callback(200, fullString, "html");
														} else {
															callback(500, undefined, "html");
														}
													});
												} else {
													callback(500, undefined, "html");
												}
											});
										}
									});
								}
							} else {
								callback(500, undefined, "html");
							}
						});
					} else {
						// Fetch data
						fetch.listVideos_rt(true, pageLoad, function (err, list, num) {
							if (!err && list && num) {
								if (nextPage <= num / 20 - 1) {
									// get international
									fetch.listVideos_it(true, pageLoad, function (err, list_2, num) {
										if (!err && list && num) {
											// Define Template Data
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
												"body.three": list_2,
												"body.one2": list_2,
												"body.page": nextPage,
												"body.close": "",
											};

											// Get Template
											helpers.getTemplate("index", templateData, function (err, template) {
												if (!err && template) {
													helpers.getFullTemplate(template, templateData, function (err, fullString) {
														if (!err && fullString) {
															callback(200, fullString, "html");
														} else {
															callback(500, undefined, "html");
														}
													});
												} else {
													callback(500, undefined, "html");
												}
											});
										}
									});
								} else {
									// get international
									fetch.listVideos_it(true, pageLoad, function (err, list_2, num) {
										if (!err && list && num) {
											// Define Template Data
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
												"body.three": list_2,
												"body.one2": list_2,
												"body.page": nextPage,
												"body.close": "hide;",
											};

											// Get Template
											helpers.getTemplate("index", templateData, function (err, template) {
												if (!err && template) {
													helpers.getFullTemplate(template, templateData, function (err, fullString) {
														if (!err && fullString) {
															callback(200, fullString, "html");
														} else {
															callback(500, undefined, "html");
														}
													});
												} else {
													callback(500, undefined, "html");
												}
											});
										}
									});
								}
							} else {
								callback(500, undefined, "html");
							}
						});
					}
				} else {
					callback(500, undefined, "html");
				}
			});
		} else {
			callback(400, undefined, "html");
		}
	} else {
		callback(405);
	}
};

// handler.tagQuery
// ==========================================================================================
handler.tagQuery = function (data, callback) {
	if (data.method == "get") {
		// Define Collectables
		var path = typeof data.trimmedPath !== undefined ? data.trimmedPath : false;
		var p = data.queryStringObject.p || data.queryStringObject.page;
		var page = typeof p !== undefined ? parseInt(p) : false;
		if (page && path) {
			var query = path.split("/")[1];
			// Fetch data
			fetch.videoByTags(query, page, function (err, list) {
				if (!err && list) {
					// Define Template Data
					var templateData = {
						"body.one": list,
						"body.two": list,
						"body.three": list,
						"body.page": (page += 1),
						"body.query": query,
					};

					// Get Template
					helpers.getTemplate("tagVideo", templateData, function (err, template) {
						if (!err && template) {
							callback(200, template, "html");
						} else {
							callback(500, undefined, "html");
						}
					});
				} else {
					callback(500, undefined, "html");
				}
			});
		} else {
			callback(400, undefined, "html");
		}
	} else {
		callback(405);
	}
};

// handler.categoryQuery
// ==========================================================================================
handler.categoryQuery = function (data, callback) {
	if (data.method == "get") {
		// Define Collectables
		var path = typeof data.trimmedPath !== undefined ? data.trimmedPath : false;
		console.log(path);
		var page = typeof data.queryStringObject.p !== undefined ? parseInt(data.queryStringObject.p) : false;
		if (page && path) {
			var query = path.split("/")[1];
			// Fetch data
			fetch.videoByCategory(query, page, function (err, list) {
				if (!err && list) {
					// Define Template Data
					var templateData = {
						"body.one": list,
						"body.two": list,
						"body.three": list,
						"body.page": page + 1,
						"body.category": query,
					};

					// Get Template
					helpers.getTemplate("videoByCategory", templateData, function (err, template) {
						if (!err && template) {
							callback(200, template, "html");
						} else {
							callback(500, undefined, "html");
						}
					});
				} else {
					callback(500, undefined, "html");
				}
			});
		} else {
			callback(400, undefined, "html");
		}
	} else {
		callback(405);
	}
};

// handler.favicon
// ==========================================================================================
handler.favicon = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		favDir = path.join(__dirname, "../public/favicon_io/");
		// Get file
		fs.readFile(favDir + data.trimmedPath, function (err, file) {
			if (!err && file) {
				callback(200, file, "ico");
			} else {
				callback(404);
			}
		});
	} else {
		callback(405);
	}
};

// handler.exoclicks
// ==========================================================================================
handler.exoclicks = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, "./../templates/");
			fs.readFile(templateDir + "11985bf2958c069727c2394a07d57991.html", "utf-8", function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, "html");
				} else {
					callback(400, undefined, "html");
					console.log("Template Not found");
				}
			});
		} else {
			callback(400, undefined, "html");
			console.log("invalid template name");
		}
	} else {
		callback(405);
	}
};

// handler.hubtraffic
// ===========================================================================================
handler.hubTraffic = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, "./../templates/");
			fs.readFile(templateDir + "8b617e8612a657eb.html", "utf-8", function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, "html");
				} else {
					callback(400, undefined, "html");
					console.log("Template Not found");
				}
			});
		} else {
			callback(400, undefined, "html");
			console.log("invalid template name");
		}
	} else {
		callback(405);
	}
};

// handler.sitemap
// ===========================================================================================
handler.sitemap = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, "./../templates/");
			fs.readFile(templateDir + "sitemap.xml", "utf-8", function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, "xml");
				} else {
					callback(400, undefined, "html");
					console.log("Template Not found");
				}
			});
		} else {
			callback(400, undefined, "html");
			console.log("invalid template name");
		}
	} else {
		callback(405);
	}
};

// handler.serviceWorker
// ===========================================================================================
handler.serviceWorker = function (data, callback) {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var swDir = path.join(__dirname, "./../");
			fs.readFile(swDir + "sw.js", "utf-8", function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, "js");
				} else {
					callback(400, undefined, "html");
					console.log("Template Not found");
				}
			});
		} else {
			callback(400, undefined, "html");
			console.log("invalid template name");
		}
	} else {
		callback(405);
	}
};

// Export module
// ==================================================================================
module.exports = handler;
