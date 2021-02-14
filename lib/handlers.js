/*
 *
 * script for handlers
 *
 */

// Dependencies
// ==================================================================================
var helpers = require('./helper');
var fetch = require('./fetch');
var path = require('path');
var fs = require('fs');

// Container for all handler functions
// ===================================================================================
var handler = {};

// handler.index
// =========================================================================================================
handler.index = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get Template
		var templateDir = path.join(__dirname, './../templates/');
		fs.readFile(templateDir + 'indexTemplate' + '.html', 'utf-8', function (err, templateData) {
			if (!err && templateData) {
				callback(200, templateData, 'html');
			} else {
				callback('Template Not found');
				console.log('Template Not found');
			}
		});
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.ping
// ======================================================================================================
handler.ping = function (data, callback) {
	callback(200, 'Up and Running', 'html');
};

// handler.hello
// ======================================================================================================
handler.hello = function (data, callback) {
	callback(200, "Welcome to the best porn website in the world", 'html');
};

// handler.notFound
// ======================================================================================================
handler.notFound = function (data, callback) {
	callback(404);
};

// Handler.public
// ======================================================================================================
handler.public = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get the filename requested
		var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
		if (trimmedAssetName && trimmedAssetName.length > 0) {
			// Get the asset data
			helpers.getStaticAssets(trimmedAssetName, function (err, data) {
				if (!err && data) {
					//console.log(data);
					// Determine teh content type (default to plain)
					var contentType = 'plain';

					// css
					if (trimmedAssetName.indexOf('.css') > -1) {
						contentType = 'css';
					}

					// JS
					if (trimmedAssetName.indexOf('.js') > -1) {
						contentType = 'js';
					}

					// svg
					if (trimmedAssetName.indexOf('.svg') > -1) {
						contentType = 'svg';
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

// Handler.pornStarList
// ==================================================================================
handler.pornStarList = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get queryStringObject
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (page) {
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// Fetch all categories
					fetch.pornStarList(page, function (err, pornStarList, num) {
						if (!err && pornStarList && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'pornStarList',
									'body.title': 'Lusty Orgasms | Porn Star list',
									'body.title1': 'Lusty Orgasms | Porn Star list',
									'body.straight': straight,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.pornStarList1': pornStarList,
									'body.pornStarList2': pornStarList,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'pornStarList',
									'body.title': 'Lusty Orgasms | Porn Star list',
									'body.title1': 'Lusty Orgasms | Porn Star list',
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.pornStarList1': pornStarList,
									'body.pornStarList2': pornStarList,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'pornStarList',
									'body.title': 'Lusty Orgasms | Porn Star list',
									'body.title1': 'Lusty Orgasms | Porn Star list',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.pornStarList1': pornStarList,
									'body.pornStarList2': pornStarList,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'pornStarList',
									'body.title': 'Lusty Orgasms | Porn Star list',
									'body.title1': 'Lusty Orgasms | Porn Star list',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.pornStarList1': pornStarList,
									'body.pornStarList2': pornStarList,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							helpers.getTemplate('pornStarList', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						} else {
							callback(500, undefined, 'html');
						}
					});
				} else {
					callback(500, undefined, 'html');
				}
			});
		} else {
			callback(400, undefined, 'html');
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.getVideo
// ===========================================================================================
handler.getVideo = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// trim off unnecessary details
		var category =
			typeof data.queryStringObject.category == 'string' && data.queryStringObject.category.trim().length > 0
				? data.queryStringObject.category.trim()
				: false;
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (category && page) {
			// Get categories
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch video by category
					fetch.videoByCategory(category, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'videoByCategory',
									'body.title': 'Lusty Orgasms | Video Category: ' + category,
									'body.title1': 'Lusty Orgasms | Video Category: ' + category,
									'body.title2': 'Lusty Orgasms | Video Category: ' + category,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoByCategory1': videoData,
									'body.videoByCategory2': videoData,
									'body.prevCategory': category,
									'body.nextCategory': category,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'videoByCategory',
									'body.title': 'Lusty Orgasms | Video Category: ' + category,
									'body.title1': 'Lusty Orgasms | Video Category: ' + category,
									'body.title2': 'Lusty Orgasms | Video Category: ' + category,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoByCategory1': videoData,
									'body.videoByCategory2': videoData,
									'body.prevCategory': category,
									'body.nextCategory': category,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'videoByCategory',
									'body.title': 'Lusty Orgasms | Video Category: ' + category,
									'body.title1': 'Lusty Orgasms | Video Category: ' + category,
									'body.title2': 'Lusty Orgasms | Video Category: ' + category,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoByCategory1': videoData,
									'body.videoByCategory2': videoData,
									'body.prevCategory': category,
									'body.nextCategory': category,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'videoByCategory',
									'body.title': 'Lusty Orgasms | Video Category: ' + category,
									'body.title1': 'Lusty Orgasms | Video Category: ' + category,
									'body.title2': 'Lusty Orgasms | Video Category: ' + category,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoByCategory1': videoData,
									'body.videoByCategory2': videoData,
									'body.prevCategory': category,
									'body.nextCategory': category,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							helpers.getTemplate('videoByCategory', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									console.log('y');
									callback(500, undefined, 'html');
								}
							});
						} else {
							console.log('j');
							callback(500, undefined, 'html');
						}
					});
				} else {
					console.log('h');
					callback(500, undefined, 'html');
				}
			});
		} else {
			callback(400, undefined, 'html');
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.topRated
// ===========================================================================================
handler.topRated = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get page number
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (page && nextPage) {
			// fetch categories
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch topRated videos
					fetch.topRatedVideos(false, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'topRated',
									'body.title': 'Lusty Orgasms | Top Rated Videos',
									'body.title1': 'Lusty Orgasms | Top Rated Videos',
									'body.title2': 'Lusty Orgasms | Top Rated Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'topRated',
									'body.title': 'Lusty Orgasms | Top Rated Videos',
									'body.title1': 'Lusty Orgasms | Top Rated Videos',
									'body.title2': 'Lusty Orgasms | Top Rated Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'topRated',
									'body.title': 'Lusty Orgasms | Top Rated Videos',
									'body.title1': 'Lusty Orgasms | Top Rated Videos',
									'body.title2': 'Lusty Orgasms | Top Rated Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'topRated',
									'body.title': 'Lusty Orgasms | Top Rated Videos',
									'body.title1': 'Lusty Orgasms | Top Rated Videos',
									'body.title2': 'Lusty Orgasms | Top Rated Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							helpers.getTemplate('topRated', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						} else {
							callback(500, undefined, 'html');
						}
					});
				} else {
					callback(500, undefined, 'html');
				}
			});
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.mostViewed
// ===============================================================================================
handler.mostViewed = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get page number
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (page && nextPage) {
			// fetch categories
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch topRated videos
					fetch.mostViewedVideos(false, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'mostViewed',
									'body.title': 'Lusty Orgasms | Most Viewed Videos',
									'body.title1': 'Lusty Orgasms | Most Viewed Videos',
									'body.title2': 'Lusty Orgasms | Most Viewed Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'mostViewed',
									'body.title': 'Lusty Orgasms | Most Viewed Videos',
									'body.title1': 'Lusty Orgasms | Most Viewed Videos',
									'body.title2': 'Lusty Orgasms | Most Viewed Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'mostViewed',
									'body.title': 'Lusty Orgasms | Most Viewed Videos',
									'body.title1': 'Lusty Orgasms | Most Viewed Videos',
									'body.title2': 'Lusty Orgasms | Most Viewed Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'mostViewed',
									'body.title': 'Lusty Orgasms | Most Viewed Videos',
									'body.title1': 'Lusty Orgasms | Most Viewed Videos',
									'body.title2': 'Lusty Orgasms | Most Viewed Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							// Get template string
							helpers.getTemplate('mostViewed', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						} else {
							callback(500, undefined, 'html');
						}
					});
				} else {
					callback(500, undefined, 'html');
				}
			});
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.recommended
// ==========================================================================================
handler.recommended = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get page number
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (page && nextPage) {
			// fetch categories
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch topRated videos
					fetch.recommendedVideos(false, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'recommended',
									'body.title': 'Lusty Orgasms | Recommended Videos',
									'body.title1': 'Lusty Orgasms | Recommended Videos',
									'body.title2': 'Lusty Orgasms | Recommended Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'recommended',
									'body.title': 'Lusty Orgasms | Recommended Videos',
									'body.title1': 'Lusty Orgasms | Recommended Videos',
									'body.title2': 'Lusty Orgasms | Recommended Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'recommended',
									'body.title': 'Lusty Orgasms | Recommended Videos',
									'body.title1': 'Lusty Orgasms | Recommended Videos',
									'body.title2': 'Lusty Orgasms | Recommended Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'recommended',
									'body.title': 'Lusty Orgasms | Recommended Videos',
									'body.title1': 'Lusty Orgasms | Recommended Videos',
									'body.title2': 'Lusty Orgasms | Recommended Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							// Get template string
							helpers.getTemplate('recommended', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						} else {
							callback(500, undefined, 'html');
						}
					});
				} else {
					callback(500, undefined, 'html');
				}
			});
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.newVideos
// ========================================================================================
handler.newVideos = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get page number
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (page) {
			// fetch categories
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch topRated videos
					fetch.newVideos(false, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'newVideos',
									'body.title': 'Lusty Orgasms | New Videos',
									'body.title1': 'Lusty Orgasms | New Videos',
									'body.title2': 'Lusty Orgasms | New Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'newVideos',
									'body.title': 'Lusty Orgasms | New Videos',
									'body.title1': 'Lusty Orgasms | New Videos',
									'body.title2': 'Lusty Orgasms | New Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'newVideos',
									'body.title': 'Lusty Orgasms | New Videos',
									'body.title1': 'Lusty Orgasms | New Videos',
									'body.title2': 'Lusty Orgasms | New Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'newVideos',
									'body.title': 'Lusty Orgasms | New Videos',
									'body.title1': 'Lusty Orgasms | New Videos',
									'body.title2': 'Lusty Orgasms | New Videos',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							// Get template string
							helpers.getTemplate('newVideos', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						} else {
							callback(500, undefined, 'html');
						}
					});
				} else {
					callback(400, undefined, 'html');
				}
			});
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.search
// ==========================================================================================
handler.search = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		var keyword =
			typeof data.queryStringObject.keyword == 'string' && data.queryStringObject.keyword.trim().length > 0
				? data.queryStringObject.keyword.trim()
				: false;
		var type =
			typeof data.queryStringObject.type == 'string' && data.queryStringObject.type.trim().length > 0
				? data.queryStringObject.type.trim()
				: false;
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (keyword && type && page) {
			if (type == 'video') {
				// Fetch categories
				fetch.allCategories(function (err, straight, gay) {
					if (!err && straight && gay) {
						// fetch data
						fetch.search(keyword, page, function (err, videoData, num) {
							if (!err && videoData && num) {
								var templateData = '';
								if (num / 20 < 2) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title2': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage,
										'body.hide': 'hide'
									};
								} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title2': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage,
										'body.prev': 'hide'
									};
								} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title2': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage,
										'body.next': 'hide'
									};
								} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.title2': 'Lusty Orgasms | Search Videos: ' + keyword,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage
									};
								}

								// Get template string
								helpers.getTemplate('search', templateData, function (err, templateString) {
									if (!err && templateString) {
										// Get full template
										helpers.getFullTemplate(templateString, templateData, function (
											err,
											fullString
										) {
											if (!err && fullString) {
												callback(200, fullString, 'html');
											} else {
												callback(500, undefined, 'html');
											}
										});
									} else {
										callback(500, undefined, 'html');
									}
								});
							} else {
								// Video not foumd
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'search',
									'body.title': 'Lusty Orgasms | Not Found',
									'body.title1': 'Lusty Orgasms | Not Found',
									'body.title2': 'Lusty Orgasms | Not Found',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay
								};

								// Get template string
								helpers.getTemplate('400', templateData, function (err, templateString) {
									if (!err && templateString) {
										// Get full template
										helpers.getFullTemplate(templateString, templateData, function (
											err,
											fullString
										) {
											if (!err && fullString) {
												callback(400, fullString, 'html');
											} else {
												callback(500, undefined, 'html');
											}
										});
									} else {
										callback(500, undefined, 'html');
									}
								});
							}
						});
					} else {
						callback(500, undefined, 'html');
					}
				});
			} else {
				// fetch categories
				fetch.allCategories(function (err, straight, gay) {
					if (!err && straight && gay) {
						// Fetch pornStar video
						fetch.pornStarVideos(keyword, page, function (err, videoData, num) {
							if (!err && videoData && num) {
								var templateData = '';
								if (num / 20 < 2) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage,
										'body.hide': 'hide'
									};
								} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage,
										'body.prev': 'hide'
									};
								} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.prevKeyword': keyword,
										'body.nextKeyword': keyword,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage,
										'body.next': 'hide'
									};
								} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
									// Define template data for interpolation
									templateData = {
										'head.title': 'Lust & Orgasms',
										'head.description':
											'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
										'body.class': 'search',
										'body.title': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.title1': 'Lusty Orgasms | Search PornStar: ' + keyword,
										'body.straight': straight,
										'body.gay': gay,
										'ipBody.straight': straight,
										'ipBody.gay': gay,
										'dpBody.straight': straight,
										'dpBody.gay': gay,
										'body.prevType': type,
										'body.nextType': type,
										'body.prevKeyword': keyword,
										'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url1': url,
										'body.url2': url,
										'body.url3': url,
										'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
										'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
										'body.url': data.url,
										'body.nextKeyword': keyword,
										'body.videoData1': videoData,
										'body.videoData2': videoData,
										'body.prevPage': prevPage,
										'body.nextPage': nextPage
									};
								}

								//console.log(num);
								// Get template string
								helpers.getTemplate('search', templateData, function (err, templateString) {
									if (!err && templateString) {
										// Get full template
										helpers.getFullTemplate(templateString, templateData, function (
											err,
											fullString
										) {
											if (!err && fullString) {
												callback(200, fullString, 'html');
											} else {
												callback(500, undefined, 'html');
											}
										});
									} else {
										callback(500, undefined, 'html');
									}
								});
							} else {
								// Video not foumd
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'search',
									'body.title': 'Lusty Orgasms | Not Found',
									'body.title1': 'Lusty Orgasms | Not Found',
									'body.title2': 'Lusty Orgasms | Not Found',
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay
								};

								// Get template string
								helpers.getTemplate('400', templateData, function (err, templateString) {
									if (!err && templateString) {
										// Get full template
										helpers.getFullTemplate(templateString, templateData, function (
											err,
											fullString
										) {
											if (!err && fullString) {
												callback(400, fullString, 'html');
											} else {
												callback(500, undefined, 'html');
											}
										});
									} else {
										callback(500, undefined, 'html');
									}
								});
							}
						});
					} else {
						callback(500, undefined, 'html');
					}
				});
			}
		} else {
			callback(400, undefined, 'html');
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.playVideo
// ==========================================================================================
handler.playVideo = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		var id =
			typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length > 0
				? data.queryStringObject.id.trim()
				: false;
		if (id) {
			// Get category
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch title and tags
					fetch.videoById(id, function (err, title, tags) {
						if (!err && title && tags) {
							// console.log(title)
							// fetch videos by related videos
							fetch.relatedVideos(id, function (err, relatedVideos) {
								if (!err && relatedVideos) {
									// fetch iframe
									fetch.iframe(id, function (err, data, thumb) {
										if (!err && data && thumb) {
											var edit = data
												.replace(/'false'/g, "'true'")
												.replace(/watchHD:.true/g, 'watchHD: false')
												.replace(
													/id="thumbs_wrapper"/g,
													'id="thumbs_wrapper" style="display: none;"'
												)
												.replace(/"link_url"/g, '"link__url"')
												.replace(/"related_url"/g, '"related__url"')
												.replace(/"actionTags"/g, '"actionTaggs"')
												.replace(
													/a.orangeButton:visited {\n            color: #000;\n        }/g,
													'a.orangeButton:visited {\n            color: #000;\n        }\n.mhp1138_container .mhp1138_eventCatcher {\n            pointer-events: none;\n        }'
												)
												.replace(/twitter/g, '');
											//var edited = edit.search(/'true'/g);
											//console.log(edited);
											// Define template data for interpolation
											templateData = {
												'head.title': 'Lust & Orgasms',
												'head.description':
													'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
												'body.class': 'search play',
												'body.straight': straight,
												'body.title': title,
												'body.title1': title,
												'body.title2': title,
												'body.gay': gay,
												'body.thumb': thumb,
												'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
												'body.thumb2': 'https://lustyorgasms.com/public/images/icng.png',
												'body.url1': url,
												'body.url2': url,
												'body.url3': url,
												'ipBody.straight': straight,
												'ipBody.gay': gay,
												'dpBody.straight': straight,
												'dpBody.gay': gay,
												'body.videoData': edit,
												'body.tag': tags,
												'body.related1': relatedVideos,
												'body.related2': relatedVideos
											};

											// Get template string
											helpers.getTemplate('playVideo', templateData, function (
												err,
												templateString
											) {
												if (!err && templateString) {
													// Get full template
													helpers.getFullTemplate(templateString, templateData, function (
														err,
														fullString
													) {
														if (!err && fullString) {
															callback(200, fullString, 'html');
														} else {
															callback(500, undefined, 'html');
														}
													});
												} else {
													callback(500, undefined, 'html');
												}
											});
										} else {
											callback(500, undefined, 'html');
											console.log('s');
										}
									});
								} else {
									callback(500, undefined, 'html');
									console.log('r');
								}
							});
						} else {
							// Video not foumd
							templateData = {
								'head.title': 'Lust & Orgasms',
								'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
								'body.class': 'search play',
								'body.straight': straight,
								'body.title': 'Lusty Orgasms | Video Unavailable',
								'body.title1': 'Lusty Orgasms | Video Unavailable',
								'body.title2': 'Lusty Orgasms | Video Unavailable',
								'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
								'body.url1': url,
								'body.url2': url,
								'body.url3': url,
								'body.thumb1': 'https://lustyorgasms.com/public/images/icng.png',
								'body.url': 'https://lustyorgasms.com',
								'body.gay': 'Lusty Orgasms | Porn Videos',
								'ipBody.straight': straight,
								'ipBody.gay': gay,
								'dpBody.straight': straight,
								'dpBody.gay': gay
							};

							// Get template string
							helpers.getTemplate('404', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(404, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						}
					});
				} else {
					callback(500, undefined, 'html');
					console.log('h');
				}
			});
		} else {
			callback(400, undefined, 'html');
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.tagVideo
// ==========================================================================================
handler.tagVideo = function (data, callback) {
	// Define method
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Get tag
		var tag =
			typeof data.queryStringObject.keyword == 'string' && data.queryStringObject.keyword.trim().length > 0
				? data.queryStringObject.keyword.trim()
				: false;
		var page = typeof data.queryStringObject.page !== undefined ? parseInt(data.queryStringObject.page) : false;
		var nextPage = page + 1;
		var prevPage = page - 1;
		if (tag && page) {
			// fetch category
			fetch.allCategories(function (err, straight, gay) {
				if (!err && straight && gay) {
					// fetch tag video
					fetch.videoByTags(tag, page, function (err, videoData, num) {
						if (!err && videoData && num) {
							var templateData = '';
							if (num / 20 < 2) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'tagVideo',
									'body.title': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title1': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title2': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.prevKeyword': tag,
									'body.nextKeyword': tag,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.hide': 'hide'
								};
							} else if (num / 20 > 1 && page < 2 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'tagVideo',
									'body.title': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title1': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title2': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.prevKeyword': tag,
									'body.nextKeyword': tag,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.prev': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage > num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'search',
									'body.title': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title1': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title2': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.prevKeyword': tag,
									'body.nextKeyword': tag,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage,
									'body.next': 'hide'
								};
							} else if (num / 20 > 1 && page > 1 && nextPage < num / 20) {
								// Define template data for interpolation
								templateData = {
									'head.title': 'Lust & Orgasms',
									'head.description': 'Lust & Orgasms Brings You NEW Porn Videos Every Day For Free.',
									'body.class': 'search',
									'body.title': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title1': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.title2': 'Lusty Orgasms | Search Videos: ' + tag,
									'body.thumb': 'https://lustyorgasms.com/public/images/icng.png',
									'body.url1': url,
									'body.url2': url,
									'body.url3': url,
									'body.url': data.url,
									'body.straight': straight,
									'body.gay': gay,
									'ipBody.straight': straight,
									'ipBody.gay': gay,
									'dpBody.straight': straight,
									'dpBody.gay': gay,
									'body.prevKeyword': tag,
									'body.nextKeyword': tag,
									'body.videoData1': videoData,
									'body.videoData2': videoData,
									'body.prevPage': prevPage,
									'body.nextPage': nextPage
								};
							}

							//console.log(num);
							// Get template string
							helpers.getTemplate('tagVideo', templateData, function (err, templateString) {
								if (!err && templateString) {
									// Get full template
									helpers.getFullTemplate(templateString, templateData, function (err, fullString) {
										if (!err && fullString) {
											callback(200, fullString, 'html');
										} else {
											callback(500, undefined, 'html');
										}
									});
								} else {
									callback(500, undefined, 'html');
								}
							});
						}
					});
				} else {
					callback(500, undefined, 'html');
				}
			});
		} else {
			callback(400, undefined, 'html');
		}
	} else {
		callback(405, undefined, 'html');
	}
};

// handler.favicon
// ==========================================================================================
handler.favicon = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		favDir = path.join(__dirname, '../public/favicon_io/');
		// Get file
		fs.readFile(favDir + data.trimmedPath, function (err, file) {
			if (!err && file) {
				callback(200, file, 'ico');
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
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == 'object' && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, './../templates/');
			fs.readFile(templateDir + '11985bf2958c069727c2394a07d57991.html', 'utf-8', function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, 'html');
				} else {
					callback(400, undefined, 'html');
					console.log('Template Not found');
				}
			});
		} else {
			callback(400, undefined, 'html');
			console.log('invalid template name');
		}
	} else {
		callback(405);
	}
};

// handler.hubtraffic
// ===========================================================================================
handler.hubTraffic = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == 'object' && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, './../templates/');
			fs.readFile(templateDir + '8b617e8612a657eb.html', 'utf-8', function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, 'html');
				} else {
					callback(400, undefined, 'html');
					console.log('Template Not found');
				}
			});
		} else {
			callback(400, undefined, 'html');
			console.log('invalid template name');
		}
	} else {
		callback(405);
	}
};

// handler.sitemap
// ===========================================================================================
handler.sitemap = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == 'object' && data !== null ? data : false;
		if (data) {
			var templateDir = path.join(__dirname, './../templates/');
			fs.readFile(templateDir + 'sitemap.xml', 'utf-8', function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, 'xml');
				} else {
					callback(400, undefined, 'html');
					console.log('Template Not found');
				}
			});
		} else {
			callback(400, undefined, 'html');
			console.log('invalid template name');
		}
	} else {
		callback(405);
	}
};

// handler.serviceWorker
// ===========================================================================================
handler.serviceWorker = function (data, callback) {
	if (data.method == 'get') {
		var url = data.completeUrl[0];
		// Sanity check
		data = typeof data == 'object' && data !== null ? data : false;
		if (data) {
			var swDir = path.join(__dirname, './../');
			fs.readFile(swDir + 'sw.js', 'utf-8', function (err, templateData) {
				if (!err && templateData) {
					callback(200, templateData, 'js');
				} else {
					callback(400, undefined, 'html');
					console.log('Template Not found');
				}
			});
		} else {
			callback(400, undefined, 'html');
			console.log('invalid template name');
		}
	} else {
		callback(405);
	}
};

// Export module
// ==================================================================================
module.exports = handler;
