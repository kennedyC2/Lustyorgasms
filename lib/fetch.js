/*
 *
 * Script for calling redTube API
 *
 */

// Dependencies
// =============================================================================
var fetch = require("node-fetch");
var file = require("./data");

// Container for all fetch requests functions
// =============================================================================
var fetchData = {};

// function for fetching all categories
// =============================================================================
fetchData.allCategories = function (load, callback) {
	if (!load) {
		var straight = "";
		var gay = "";
		count = 0;
		// fetch straight category
		file.read("straight", "category", function (err, data) {
			if (!err && data) {
				data.forEach((datum) => {
					straight += `
						<a href="category/${datum}?p=1" class="st${count++}">${datum}</a>
					`;
				});

				count = 0;
				// fetch gay category
				file.read("gay", "category", function (err, data) {
					if (!err && data) {
						data.forEach((datum) => {
							gay += `
								<a href="category/${datum}?p=1" class="st${count++}">${datum}</a>
							`;
						});
					}
					callback(false, straight, gay);
				});
			} else {
				console.log(err);
			}
		});
	} else {
		// Instantiate Request
		fetch("https://api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json")
			.then((data) => data.json())
			.then((json) => {
				// var fullData = json.categories;
				var straight = [];
				var gay = [];

				// loop thru straight data
				for (const d of json.categories) {
					straight.push(d.category);
				}

				for (const d of json.categories_gay) {
					gay.push(d.category);
				}

				file.create("gay", "category", gay, function (err) {
					if (err) {
						console.log(err);
					}
				});

				file.create("straight", "category", straight, function (err) {
					if (err) {
						console.log(err);
					}
				});

				// callback(false);
			})
			.catch((err) => console.log(err.message));
	}
};

// function for fetching videos by categories
// =============================================================================
fetchData.videoByCategory = function (category, page, callback) {
	// Check for "HD"
	if (category == "HD" || category == "hd") {
		callback(true);
	} else {
		// instantiate Request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&search=" + category + "&output=json&page=" + page + "&thumbsize=big")
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var count = 0;
				var data = "";
				for (const d of videoData) {
					data += `<div class="outer-wrapper v${(count += 1)}">
							<div class="thumb-wrapper">
							<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
								<div class="time">${d.video.duration}</div>
							</div>
					
							<div class="info-wrapper">
								<div class="title" title="${d.video.title}">${d.video.title}</div>
								<div class="lk-vw">
									<div class="views">
										<img src="public/images/eye.svg" alt="views">
										<p>${d.video.views}</p>
									</div>
									<div class="likes">
										<img src="public/images/like.svg" alt="likes">
										<p>${Math.round(d.video.rating)}%</p>
									</div>
								</div>
							</div>
						</div>
					`;
				}
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	}
};

// function for fetching videos list
// ==============================================================================

// MostViewed
fetchData.listVideos_mv = function (include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				// include count in id
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
				}
				// console.log(num);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	} else {
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
				}
				//console.log(data);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	}
};

// TopRated
fetchData.listVideos_rt = function (include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=rating&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				// include count in id
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
				}
				// console.log(num);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	} else {
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=rating&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
				}
				//console.log(data);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	}
};

// International
fetchData.listVideos_it = function (include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&ordering=rating&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				// include count in id
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
				}
				// console.log(num);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	} else {
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&ordering=rating&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
				}
				//console.log(data);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	}
};

// function for searching database
// =============================================================================
fetchData.search = function (word, page, callback) {
	// Instantiate request
	fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + word + "&ordering=mostviewed&thumbsize=big&page=" + page)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.videos;
			var num = json.count;
			var data = "";
			var count = 0;
			for (const d of videoData) {
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
                            <div class="time">${d.video.duration}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" title="${d.video.title}">${d.video.title}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p>${d.video.views}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p>${Math.round(d.video.rating)}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
			}
			//console.log(data);
			callback(false, data, num);
		})
		.catch((err) => console.log(err.message));
};

// function for fetching video iframe details
// ==============================================================================
fetchData.iframe = function (id, callback) {
	// Define request details
	fetch("https://embed.redtube.com/?id=" + id)
		.then((data) => data.text())
		.then((text) => {
			// console.log(text)
			var hell = text.split('"image_url":"')[1];
			var imageThumb = hell.split('"')[0];
			// console.log(imageThumb);
			callback(false, text, imageThumb);
		})
		.catch((err) => console.log(err.message));
};

// function for fetching related videos
// =============================================================================
fetchData.videoById = function (id, callback) {
	fetch("https://api.redtube.com/?data=redtube.Videos.getVideoById&video_id=" + id + "&output=json&thumbsize=big")
		.then((data) => data.json())
		.then((json) => {
			//var videoData = json.video;
			// console.log(json);
			if (!json.code) {
				var tags = json.video.tags;
				var title = json.video.title;
				var data = "";

				if (tags.length !== 0 && tags.length > 0) {
					for (const d of tags) {
						data += `
							<a href="tag?q=${d}&p=1">${d}</a>
						`;
					}
				} else if (tags == "undefined") {
					data += `
			            <a href="#" style = "color: black"; >No tags available</a>
			        `;
				} else {
					data += `
			            <a href="#" style = "color: black"; >No tags available</a>
			        `;
				}

				// console.log(json);
				callback(false, title, data);
			} else {
				// console.log(json);
				callback(true);
			}
		})
		.catch((err) => console.log(err.message));
};

// function for fetching video by tags
// ===================================================================================
fetchData.videoByTags = function (tag, page, callback) {
	// Check query
	if (tag === "кончил" || tag === "180° Virtual Reality" || tag === "Любительское") {
		callback(true);
	} else {
		// Instantiate Request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + tag + "&tags[]=" + tag + "&ordering=mostviewed&thumbsize=big&page=" + page)
			.then((data) => data.json())
			.then((json) => {
				// console.log(json);
				var videoData = json.videos;
				var num = json.count;
				var data = "";
				var count = 0;
				if (videoData.length == 0) {
					callback(true);
				} else {
					for (const d of videoData) {
						data += `<div class="outer-wrapper v${(count += 1)}">
								<div class="thumb-wrapper">
								<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
									<div class="time">${d.video.duration}</div>
								</div>
						
								<div class="info-wrapper">
									<div class="title" title="${d.video.title}">${d.video.title}</div>
									<div class="lk-vw">
										<div class="views">
											<img src="public/images/eye.svg" alt="views">
											<p>${d.video.views}</p>
										</div>
										<div class="likes">
											<img src="public/images/like.svg" alt="likes">
											<p>${Math.round(d.video.rating)}%</p>
										</div>
									</div>
								</div>
							</div>
		
						`;
					}

					callback(false, data, num);
				}
			})
			.catch((err) => console.log(err.message));
	}
};

// function for fetching related videos
// ==================================================================================
fetchData.relatedVideos = function (id, callback) {
	fetch("https://embed.redtube.com/related?id=" + id)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.related || json.more;
			var data = "";
			var count = 0;
			for (const d of videoData) {
				var videoId = d[4].split("/");
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="view/${videoId[3]}"><img src="${d[0]}" alt="thumbnail"/></a>
                            <div class="time">${d[2]}</div>
                        </div>
                
                        <div class="info-wrapper">
                            <div class="title" style="color: black;" title="${d[1]}">${d[1]}</div>
                            <div class="lk-vw">
                                <div class="views">
                                    <img src="public/images/eye.svg" alt="views">
                                    <p style="color: black;">${d[5]}</p>
                                </div>
                                <div class="likes">
                                    <img src="public/images/like.svg" alt="likes">
                                    <p style="color: black;">${Math.round(d[3])}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    `;
			}
			// console.log(num);
			callback(false, data);
		})
		.catch((err) => console.log(err.message));
};

// Export module
// ============================================================================
module.exports = fetchData;
