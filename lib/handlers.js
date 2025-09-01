/*
 *
 * script for handlers
 *
 */

// Dependencies
// ==================================================================================
var { getTemplate, getFullTemplate, getStaticAssets } = require("./helper");
var { allCategories, videoByCategory, search, videoByTags, listVideos, iframe, videoById } = require("./fetch");
var path = require("path");
var { readFile } = require("fs");
var web = require("./image.js");

// Page number Spinner
var nextPage = (currentPage) => {
	// Check currentPage
	if (!currentPage) {
		return Math.floor(Math.random() * 2000) + 1
	}

	// Else
	for (let i = 0; i < 30; i++) {
		let page = Math.floor(Math.random() * 30) + 1

		if (page !== currentPage) {
			return page;
		}
	}
}


// Container for all handler functions
// ===================================================================================
var handler = {};

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
	// Get categories
	allCategories((err, categories) => {
		if (!err && categories) {
			// Define template data for interpolation
			let templateData = {
				"head.title": "Lust & Orgasms",
				"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
				"body.class": "category_page",
				"body.title": "Lusty Orgasms | Porn Videos",
				"body.title1": "Lusty Orgasms | Porn Videos",
				"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
				"body.url1": "https://lustyorgasms.com",
				"body.url2": "https://lustyorgasms.com",
				"body.url3": "https://lustyorgasms.com",
				"body.categories": categories,
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
		} else {
			callback(400, undefined, "html");
		}
	});
};

// handler.offline
// ======================================================================================================
handler.offline = (data, callback) => {
	console.log("offline handler called");
	// Get categories
	allCategories((err, categories) => {
		if (!err && categories) {
			// Define template data for interpolation
			let templateData = {
				"head.title": "Lust & Orgasms",
				"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
				"body.class": "category_page",
				"body.title": "Lusty Orgasms | Porn Videos",
				"body.title1": "Lusty Orgasms | Porn Videos",
				"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
				"body.url1": "https://lustyorgasms.com",
				"body.url2": "https://lustyorgasms.com",
				"body.url3": "https://lustyorgasms.com",
				"body.categories": categories,
			};

			// Get template string
			getTemplate("offline", templateData, (err, templateString) => {
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
			callback(400, undefined, "html");
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
		// Get query data
		let url = data.completeUrl[0];
		let q = data.queryStringObject.q || data.queryStringObject.category || data.trimmedPath.split("/")[1]
		let p = data.queryStringObject.p || data.queryStringObject.page

		// trim off unnecessary details
		var category = typeof q == "string" && q.trim().length > 0 ? (q.charAt(0).toUpperCase() + q.slice(1)).trim() : false;;
		var page = typeof p !== undefined ? parseInt(p) : false;
		var next = nextPage(page);

		// Check if category and page are valid
		if (category && next) {
			// Get categories
			allCategories((err, categories) => {
				if (!err && categories) {
					// fetch video by category
					videoByCategory(category, next, (err, videoData) => {
						if (!err && videoData) {
							// Define template data for interpolation
							let templateData = {
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
								"body.Category": category,
								"body.page": next,
							};

							// If page is not defined, return HTML template
							if (!page) {
								// Get template string
								getTemplate("category", templateData, (err, templateString) => {
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
								// If page is defined, return JSON data
								callback(200, {
									data: videoData,
									page: next,
								}, "json");
							}

						} else {
							// Define template data for interpolation
							let templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "category_page",
								"body.title": "Lusty Orgasms | Porn Videos",
								"body.title1": "Lusty Orgasms | Porn Videos",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": "https://lustyorgasms.com",
								"body.url2": "https://lustyorgasms.com",
								"body.url3": "https://lustyorgasms.com",
								"body.categories": categories,
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
					callback(400, undefined, "html");
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
		let url = data.completeUrl[0];

		// Get tag
		var q = data.queryStringObject.q || data.queryStringObject.keyword || data.trimmedPath.split("/")[1]
		var p = data.queryStringObject.p || data.queryStringObject.page;

		// trim off unnecessary details
		var keyword = typeof q == "string" && q.trim().length > 0 ? q.trim().toLowerCase().replace("_", " ") : false;
		var page = typeof p !== undefined ? parseInt(p) : false;
		var next = nextPage(page);
		// var vidFolder = Math.floor(Math.random() * 4); // Randomly select a video folder (1, 2, or 3)

		if (keyword && next) {
			// Fetch categories
			allCategories((err, categories) => {
				if (!err && categories) {
					// fetch data
					search(keyword, next, (err, videoData, folder) => {
						if (!err && videoData && folder) {
							// Define template data for interpolation
							let templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "search",
								"body.title": "Lusty Orgasms | Search Videos: " + keyword,
								"body.title1": "Lusty Orgasms | Search Videos: " + keyword,
								"body.title2": "Lusty Orgasms | Search Videos: " + keyword,
								"body.url": url,
								"body.url1": url,
								"body.url2": url,
								"body.url3": url,
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
								"body.categories": categories,
								"body.content": videoData,
								"body.folder": folder,
								"body.page": next,
							};

							// If page is not defined, return HTML template
							if (!page) {
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
								// If page is defined, return JSON data
								callback(200, {
									data: videoData,
									page: next,
									folder: folder,
								}, "json");
							}

						} else {
							// Video not found
							let templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "search",
								"body.title": "Lusty Orgasms | Not Found",
								"body.title1": "Lusty Orgasms | Not Found",
								"body.title2": "Lusty Orgasms | Not Found",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": "https://lustyorgasms.com",
								"body.url2": "https://lustyorgasms.com",
								"body.url3": "https://lustyorgasms.com",
								"body.categories": categories,
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

		// Get video ID
		let vid_id;
		if (data.trimmedPath == "playVideo") {
			vid_id = data.queryStringObject.id.toString();
		} else {
			vid_id = data.trimmedPath.split("/")[1];
		}

		// Check if vid_id is valid
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
										"body.url1": url,
										"body.url2": url,
										"body.url3": url,
										"body.categories": categories,
										"body.relatedVideos": relatedVideos,
										"video.url": embed_url,
										"video.tags": tags,
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
								}
							});
						} else {
							// Video not found
							templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "search play",
								"body.title": "Lusty Orgasms | Page Unavailable",
								"body.title1": "Lusty Orgasms | Page Unavailable",
								"body.title2": "Lusty Orgasms | Page Unavailable",
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.url": "https://lustyorgasms.com",
								"body.url1": "https://lustyorgasms.com",
								"body.url2": "https://lustyorgasms.com",
								"body.url3": "https://lustyorgasms.com",
								"body.categories": categories,
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
					callback(400, undefined, "html");
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
		let url = data.completeUrl[0];

		// Get tag
		var q = data.queryStringObject.q || data.queryStringObject.keyword || data.trimmedPath.split("/")[1]
		var p = data.queryStringObject.p || data.queryStringObject.page;

		// trim off unnecessary details
		var tag = typeof q == "string" && q.trim().length > 0 ? q.trim().toLowerCase().replace("_", " ") : false;
		var page = typeof p !== undefined ? parseInt(p) : false;
		var next = nextPage(page);
		// var vidFolder = Math.floor(Math.random() * 4); // Randomly select a video folder (1, 2, or 3)

		if (tag && next) {
			// fetch category
			allCategories((err, categories) => {
				if (!err && categories) {
					// fetch tag video
					videoByTags(tag, next, (err, videoData, folder) => {
						if (!err && videoData && folder) {
							// Define template data for interpolation
							let templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "tagVideo",
								"body.title": "Lusty Orgasms | Search Videos: " + tag,
								"body.title1": "Lusty Orgasms | Search Videos: " + tag,
								"body.title2": "Lusty Orgasms | Search Videos: " + tag,
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": url,
								"body.url2": url,
								"body.url3": url,
								"body.categories": categories,
								"body.content": videoData,
								"body.folder": folder,
								"body.page": next,
							};

							// If page is not defined, return HTML template
							if (!page) {
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
										callback(500, undefined, "html");
									}
								});
							} else {
								// If page is defined, return JSON data
								callback(200, {
									data: videoData,
									page: next,
									folder: folder,
								}, "json");
							}

						} else {
							// Define template data for interpolation
							let templateData = {
								"head.title": "Lust & Orgasms",
								"head.description": "Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.",
								"body.class": "tagVideo",
								"body.title": "Lusty Orgasms | Search Videos: " + tag,
								"body.title1": "Lusty Orgasms | Search Videos: " + tag,
								"body.title2": "Lusty Orgasms | Search Videos: " + tag,
								"body.thumb": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb1": "https://lustyorgasms.com/public/images/icng.png",
								"body.thumb2": "https://lustyorgasms.com/public/images/icng.png",
								"body.url1": "https://lustyorgasms.com",
								"body.url2": "https://lustyorgasms.com",
								"body.url3": "https://lustyorgasms.com",
								"body.categories": categories,
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
					callback(400, undefined, "html");
				}
			});
		} else {
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
		var next = nextPage(page);
		// var vidFolder = Math.floor(Math.random() * 4); // Randomly select a video folder (1, 2, or 3)

		// fetch categories
		allCategories((err, categories) => {
			if (!err && categories) {
				// Fetch data
				listVideos(next, (err, list, folder) => {
					if (!err && list && folder) {
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
							"body.folder": folder,
							"body.page": next,
							"body.close": "hide;",
						};

						if (!page) {
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
						} else {
							callback(200, {
								data: list,
								page: next,
								folder: folder,
							}, "json");
						}
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

// handler.favicon
// ==========================================================================================
handler.favicon = (data, callback) => {
	if (data.method == "get") {
		var url = data.completeUrl[0];
		let favDir = path.join(__dirname, "../public/");
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
		let fontDir = path.join(__dirname, "../public/");

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
			var templateDir = path.join(__dirname, "./../");
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
