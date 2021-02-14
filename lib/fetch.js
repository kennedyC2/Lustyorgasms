/*
*
* Script for calling redTube API
*
*/

// Dependencies
// =============================================================================
var fetch = require('node-fetch');

// Container for all fetch requests functions
// =============================================================================
var fetchData = {};

// function for fetching all categories
// =============================================================================
fetchData.allCategories = function(callback) {
	// Instantiate Request
	fetch('https://api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json')
		.then((data) => data.json())
		.then((json) => {
			var straightData = json.categories;
			var gayData = json.categories_gay;
			var straight = '';
			var gay = '';
			count = 0;
			// loop thru straight data
			for (const d of straightData) {
				straight += `
            <a href="getVideo?category=${d.category}&page=1" class="st${count++}">${d.category}</a>
            `;
			}

			count = 0;
			// loop thru gay data
			for (const d of gayData) {
				gay += `
            <a href="getVideo?category=${d.category}&page=1" class="gy${count++}">${d.category}</a>
            `;
			}
			//console.log(gay + '\n');
			// console.log(straight);
			callback(false, straight, gay);
		})
		.catch((err) => console.log(err.message));
};

// function for fetching videos by categories
// =============================================================================
fetchData.videoByCategory = function(category, page, callback) {
	// instantiate Request
	fetch(
		'https://api.redtube.com/?data=redtube.Videos.searchVideos&search=' +
			category +
			'&output=json&page=' +
			page +
			'&thumbsize=big'
	)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.videos;
			var num = json.count;
			var count = 0;
			var data = '';
			for (const d of videoData) {
				//console.log(d.video);
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
					.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
};

// function for fetching new videos
// ==============================================================================
fetchData.newVideos = function(include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				// include count in id
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper v${(count += 1)}">
                    <div class="thumb-wrapper">
                    <a href="playVideo/?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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

// function for fetching most viewed videos
// ==============================================================================
fetchData.mostViewedVideos = function(include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				var hdn = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
	} else {
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo/?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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

// function for fetching top rated videos
// ==============================================================================
fetchData.topRatedVideos = function(include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
	} else {
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper v${(count += 1)}">
                    <div class="thumb-wrapper">
                    <a href="playVideo/?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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

// function for fetching recommended videos
// ==============================================================================
fetchData.recommendedVideos = function(include, page, callback) {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				for (const d of videoData) {
					data += `<div class="outer-wrapper a${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
				//console.log(videoData);
				callback(false, data, num);
			})
			.catch((err) => console.log(err.message));
	} else {
		// Instantiate request
		fetch(
			'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=' +
				page
		)
			.then((data) => data.json())
			.then((json) => {
				var videoData = json.videos;
				var num = json.count;
				var data = '';
				var count = 0;
				for (const d of videoData) {
					data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo/?id=${d.video.video_id}"><img src="${d.video
						.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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

// function for fetching porn star list
// =============================================================================
fetchData.pornStarList = function(page, callback) {
	// Instantiate request
	fetch('https://api.redtube.com/?data=redtube.Stars.getStarDetailedList&output=json&page=' + page)
		.then((data) => data.json())
		.then((json) => {
			var pornStarData = json.stars;
			var num = json.count;
			var data = '';
			var count = 0;
			for (const d of pornStarData) {
				data += ` <div class="art-cnt v${(count += 1)}">
            <div class="dp"><a href="search?keyword=${d.star}&type=pornStar&page=1"><img src="${d.star_thumb}" alt="thumb"/></a></div>
            <div class="nm">${d.star}</div>
            </div>
            `;
			}
			callback(false, data, num);
			//console.log(json.stars);
		})
		.catch((err) => console.log(err.message));
};

// function for fetching porn star video with porn star name
// ============================================================================
fetchData.pornStarVideos = function(name, page, callback) {
	// Instantiate request
	fetch(
		'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&stars[]=' +
			name +
			'&thumbsize=big&page=' +
			page
	)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.videos;
			var num = json.count;
			var data = '';
			var count = 0;
			for (const d of videoData) {
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
					.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
};

// function for searching database
// =============================================================================
fetchData.search = function(word, page, callback) {
	// Instantiate request
	fetch(
		'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=' +
			word +
			'&ordering=mostviewed&thumbsize=big&page=' +
			page
	)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.videos;
			var num = json.count;
			var data = '';
			var count = 0;
			for (const d of videoData) {
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
					.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
fetchData.iframe = function(id, callback) {
	// Define request details
	fetch('https://embed.redtube.com/?id=' + id)
		.then((data) => data.text())
		.then((text) => {
			var hell = text.split('<script>');
			var hell1 = hell[4].split(';');
			var hell2 = hell1[2].split(',');
			var imageThumb = '';
			for (const prop of hell2) {
				prop.replace("'", '');
				var ned = prop
					.replace('"', '')
					.replace('"', '')
					.replace('"', '')
					.replace('"', '')
					.replace('"', '')
					.replace('"', '')
					.split(':');
				if (ned[0] === 'image_url') {
					imageThumb =
						ned[1] +
						':' +
						ned[2]
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '')
							.replace('\\', '');
					break;
				}
			}
			// console.log(imageThumb);
			callback(false, text, imageThumb);
		})
		.catch((err) => console.log(err.message));
};

// function for fetching related videos
// =============================================================================
fetchData.videoById = function(id, callback) {
	fetch('https://api.redtube.com/?data=redtube.Videos.getVideoById&video_id=' + id + '&output=json&thumbsize=big')
		.then((data) => data.json())
		.then((json) => {
			//var videoData = json.video;
			// console.log(json);
			if (!json.code) {
				var tags = json.video.tags;
				var title = json.video.title;
				var data = '';

				if (tags.length !== 0 && tags.length > 0) {
					for (const d of tags) {
						data += `
                        <a href="video/tag?keyword=${d}&page=1">${d}</a>
                    `;
					}
				} else if (tags == 'undefined') {
					data += `
                        <a href="/" style = "color: black"; >No tags available</a>
                    `;
				} else {
					data += `
                        <a href="/" style = "color: black"; >No tags available</a>
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
fetchData.videoByTags = function(tag, page, callback) {
	fetch(
		'https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=' +
			tag +
			'&tags[]=' +
			tag +
			'&ordering=mostviewed&thumbsize=big&page=' +
			page
	)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.videos;
			var num = json.count;
			var data = '';
			var count = 0;
			for (const d of videoData) {
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${d.video.video_id}"><img src="${d.video
					.thumb}" alt="thumbnail" width="100%" height="100%"/></a>
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
};

// function for fetching related videos
// ==================================================================================
fetchData.relatedVideos = function(id, callback) {
	fetch('https://embed.redtube.com/related?id=' + id)
		.then((data) => data.json())
		.then((json) => {
			var videoData = json.related || json.more;
			var data = '';
			var count = 0;
			for (const d of videoData) {
				var videoId = d[4].split('/');
				data += `<div class="outer-wrapper v${(count += 1)}">
                        <div class="thumb-wrapper">
                        <a href="playVideo?id=${videoId[3]}"><img src="${d[0]}" alt="thumbnail"/></a>
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
			//console.log(videoData);
			callback(false, data);
		})
		.catch((err) => console.log(err.message));
};

// function for fetching tags
// =============================================================================
fetchData.getTags = function(callback) {
	fetch('https://api.redtube.com/?data=redtube.Tags.getTagList&output=json')
		.then((data) => data.json())
		.then((json) => {
			//var videoData = json.video;
			// console.log(json.tags);
			if (json.tags) {
				var data = '';
				for (const prop of json.tags) {
					data += `
							<a href="video/tag?keyword=${prop.tag.tag_name}&page=1">${prop.tag.tag_name}</a>
						`;
				}
				// console.log(data);
				// console.log(json);
				callback(false, data);
			} else {
				// console.log(json);
				callback(true);
			}
		})
		.catch((err) => console.log(err.message));
};

// Export module
// ============================================================================
module.exports = fetchData;
