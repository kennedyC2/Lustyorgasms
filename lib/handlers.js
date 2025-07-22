/*
 *
 * script for handlers
 *
 */

// Dependencies
// ==================================================================================
var { getTemplate, getFullTemplate, getStaticAssets } = require("./helper");
var { allCategories, videoByCategory, search, videoByTags, listVideos_mv, listVideos_it, listVideos_rt, iframe, videoById, relatedVideos } = require("./fetch");
var path = require("path");
var { readFile } = require("fs");
var web = require("./image.js");

// Container for all handler functions
// ===================================================================================
var handler = {};

// handler.index
// =========================================================================================================
// handler["index"] = (data, callback) => {
// 	if (data.method == "get") {
// 		// var url = data.completeUrl[0];
// 		// Get Template
// 		var templateDir = path.join(__dirname, "./../templates/");
// 		readFile(templateDir + "indexTemplate" + ".html", "utf-8", (err, templateData) => {
// 			if (!err && templateData) {
// 				callback(200, templateData, "html");
// 			} else {
// 				callback("Template Not found");
// 			}
// 		});
// 	} else {
// 		callback(405, undefined, "html");
// 	}
// };

// handler.ping
// ======================================================================================================
handler.ping = (data, callback) => {
	callback(200, "Up and Running", "html");
};

// handler.hello
// ======================================================================================================
handler.hello = (data, callback) => {
	callback(200, "Welcome to the best porn website in the world", "html");
};

// handler.notFound
// ======================================================================================================
handler.notFound = (data, callback) => {
	// callback(404);
	// Define template data for interpolation
	let templateData = {
		"head.title": "Lust & Orgasms",
		"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
		"body.class": 404,
		"body.title": 404,
		"body.title1": 404,
		"body.title2": 404,
		"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
		"body.url1": "url",
		"body.url2": "url",
		"body.url3": "url",
		"body.straight": "",
		"body.gay": "",
		"ipBody.straight": "",
		"ipBody.gay": "",
		"dpBody.straight": "",
		"dpBody.gay": "",
		"body.Keyword": "",
		"body.nextKeyword": "",
		"body.videoData1": "",
		"body.videoData2": "",
		"body.videoData3": "",
		"body.prevPage": "",
		"body.next": "",
		"body.close": "hide",
	};

	// Get template string
	getTemplate("400", templateData, (err, templateString) => {
		if (!err && templateString) {
			// Get full template
			getFullTemplate(templateString, templateData, (err, fullString) => {
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
handler.public = (data, callback) => {
	if (data.method == "get") {
		// var url = data.completeUrl[0];
		// Get the filename requested
		var trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
		if (trimmedAssetName && trimmedAssetName.length > 0) {
			// Get the asset data
			getStaticAssets(trimmedAssetName, (err, data) => {
				if (!err && data) {
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
					callback(404, "", "html");
				}
			});
		} else {
			callback(404, "", "html");
		}
	} else {
		callback(405, "", "html");
	}
};

// handler.getVideo
// ===========================================================================================
handler.getVideo = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];

		// trim off unnecessary details
		var q = data.queryStringObject.q || data.queryStringObject.category || data.trimmedPath.split("/")[1];
		var p = data.queryStringObject.p || data.queryStringObject.page;
		var category = typeof q == "string" && q.trim().length > 0 ? q.trim() : false;

		// Pages
		var page = typeof p !== undefined ? parseInt(p) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;

		// Check if category and page are valid
		if (category && page) {
			// Get categories
			allCategories((err, categories) => {
				if (!err && categories) {
					// fetch video by category
					videoByCategory(category, page, (err, videoData, num) => {
						if (!err && videoData && num) {
							var templateData;
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
									"body.categories": categories,
									"body.videoByCategory": videoData,
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
									"body.categories": categories,
									"body.videoByCategory": videoData,
									"body.videoByCategory2": videoData,
									"body.videoByCategory3": videoData,
									"body.Category": category,
									"body.next": nextPage,
									"body.close": "hide",
								};
							}

							//console.log(num);
							getTemplate("videoByCategory", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
								"body.class": "index",
								"body.title": "Lusty Orgasms | Porn Videos",
								"body.title1": "Lusty Orgasms | Porn Videos",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": "https://lustyorgasms.com",
								"body.url2": "https://lustyorgasms.com",
								"body.url3": "https://lustyorgasms.com",
								"body.categories": categories,
								"body.videoByCategory": videoData,
								"body.videoByCategory2": videoData,
								"body.videoByCategory3": videoData,
								"body.Category": category,
								"body.next": nextPage,
								"body.close": "hide",
							};

							// Get template string
							getTemplate("400", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
handler.search = (data, callback) => {
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
			allCategories(false, (err, categories) => {
				if ((!err && categories)) {
					// fetch data
					search(keyword, page, (err, videoData, num) => {
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
							getTemplate("search", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
							// Video not found
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
							getTemplate("400", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
handler.playVideo = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		let vid_id;
		if (data.trimmedPath == "playVideo") {
			vid_id = data.queryStringObject.id.toString();
		} else {
			vid_id = data.trimmedPath.split("/")[1];
		}
		var id = typeof vid_id !== undefined ? vid_id : false;
		if (id) {
			// Get category
			allCategories((err, categories) => {
				if ((!err && categories)) {
					// fetch title, tags and related videos
					videoById(id, (err, title, embed_url, tags, relatedVideos, thumb) => {
						if (!err && title && embed_url && tags && relatedVideos && thumb) {
							// fetch iframe
							iframe(id, (err, data) => {
								if (!err && data) {
									// Save web image
									var imageTitle = Date.now();
									web.get(thumb, imageTitle);

									// Define Template Data
									var templateData = {
										"head.title": "Lust & Orgasms",
										"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
										"body.class": "index",
										"body.title": "Lusty Orgasms | Porn Videos",
										"body.title1": "Lusty Orgasms | Porn Videos",
										"body.thumb": "https://lustyorgasms.com/public/card/" + imageTitle + ".jpg",
										"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
										"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
										"body.url1": "https://lustyorgasms.com",
										"body.url2": "https://lustyorgasms.com",
										"body.url3": "https://lustyorgasms.com",
										"body.categories": categories,
										"body.relatedVideos": relatedVideos,
										"video.url": embed_url,
										// "body.page": nextPage,
										"body.close": "hide;",
									};

									// Get template string
									getTemplate("video", templateData, (err, templateString) => {
										if (!err && templateString) {
											// Get full template
											getFullTemplate(templateString, templateData, (err, fullString) => {
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
									console.log("s", err, data);
								}
							});
						} else {
							// Video not found
							templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "search play",
								"body.title": "Lusty Orgasms | Video Unavailable",
								"body.title1": "Lusty Orgasms | Video Unavailable",
								"body.title2": "Lusty Orgasms | Video Unavailable",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.url": "https://lustyorgasms.com",
								"body.url1": "https://lustyorgasms.com",
								"body.url2": "https://lustyorgasms.com",
								"body.url3": "https://lustyorgasms.com",
								"body.categories": categories,
							};

							// Get template string
							getTemplate("404", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
handler.tagVideo = (data, callback) => {
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
			allCategories(false, (err, categories) => {
				if ((!err && categories)) {
					// fetch tag video
					videoByTags(tag, page, (err, videoData, num) => {
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
							getTemplate("tagVideo", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
							getTemplate("400", templateData, (err, templateString) => {
								if (!err && templateString) {
									// Get full template
									getFullTemplate(templateString, templateData, (err, fullString) => {
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
handler["index"] = (data, callback) => {
	if (data.method == "get") {
		// Define Collectables
		var page = typeof data.queryStringObject.p !== undefined ? parseInt(data.queryStringObject.p) : false;
		// Video folders
		// var pageLoad = page == 1 ? data.queryStringObject.pageLoad : page;
		var pageLoad = page == 1 ? data.queryStringObject.pageLoad : Math.floor(Math.random() * 30) + 1;
		var nextPage = page + 1;
		// fetch categories
		allCategories((err, categories) => {
			if (!err && categories) {
				// Randomize line
				var n = Math.floor(Math.random() * 2);
				// Fetch data
				listVideos_it(pageLoad, (err, list, num) => {
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
							"body.categories": categories,
							"body.content": list,
							"body.page": nextPage,
							"body.close": "hide;",
						};

						// Get Template
						getTemplate("index", templateData, (err, template) => {
							if (!err && template) {
								getFullTemplate(template, templateData, (err, fullString) => {
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
				callback(500, undefined, "html");
			}
		});
	} else {
		callback(405);
	}
};

// handler.tagQuery
// ==========================================================================================
handler.tagQuery = (data, callback) => {
	if (data.method == "get") {
		// Define Collectables
		var path = typeof data.trimmedPath !== undefined ? data.trimmedPath : false;
		var p = data.queryStringObject.p || data.queryStringObject.page;
		var page = typeof p !== undefined ? parseInt(p) : false;
		if (page && path) {
			var query = path.split("/")[1];
			// Fetch data
			videoByTags(query, page, (err, list) => {
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
					getTemplate("tagVideo", templateData, (err, template) => {
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
handler.categoryQuery = (data, callback) => {
	if (data.method == "get") {
		// Define Collectables
		var path = typeof data.trimmedPath !== undefined ? data.trimmedPath : false;
		console.log(path);
		var page = typeof data.queryStringObject.p !== undefined ? parseInt(data.queryStringObject.p) : false;
		if (page && path) {
			var query = path.split("/")[1];
			// Fetch data
			videoByCategory(query, page, (err, list) => {
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
					getTemplate("videoByCategory", templateData, (err, template) => {
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
handler.favicon = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		favDir = path.join(__dirname, "../public/favicon_io/");
		// Get file
		readFile(favDir + data.trimmedPath, (err, file) => {
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

// handler.webfont
// ==========================================================================================
handler.webfont = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		fontDir = path.join(__dirname, "../public/");
		// Get file
		readFile(fontDir + data.trimmedPath, (err, file) => {
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
handler.exoclicks = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, "./../templates/");
			readFile(templateDir + "11985bf2958c069727c2394a07d57991.html", "utf-8", (err, templateData) => {
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
handler.hubTraffic = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, "./../templates/");
			readFile(templateDir + "8b617e8612a657eb.html", "utf-8", (err, templateData) => {
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
handler.sitemap = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, "./../templates/");
			readFile(templateDir + "sitemap.xml", "utf-8", (err, templateData) => {
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
handler.serviceWorker = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == "object" && data !== null ? data : false;
		if (data) {
			var swDir = path.join(__dirname, "./../");
			readFile(swDir + "sw.js", "utf-8", (err, templateData) => {
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
