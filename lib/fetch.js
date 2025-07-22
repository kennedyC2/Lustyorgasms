/*
 *
 * Script for calling redTube API
 *
 */

// Dependencies
// =============================================================================
var { fetch } = require("./helper");
var file = require("./data");
const { translate } = require("bing-translate-api");

// Container for all fetch requests
// =============================================================================
var fetchData = {};

// Translator
fetchData.translate = (trans, callback) => {
	translate(trans, "auto-detect", "en", true)
		.then((res) => {
			callback(false, res.translation);
		})
		.catch((err) => {
			callback(true, err);
		});
};

//  for fetching all categories
// =============================================================================
fetchData.allCategories = (callback) => {
	const category_list = ["Big Tits", "Teens", "Lesbian", "Blowjob", "Anal", "Amateur", "Asian", "Public", "Cumshot", "Ebony", "Group", "Hentai", "Mature", "Fetish", "Japanese", "Facials", "MILF", "Latina", "Gangbang", "Squirting", "Interracial", "Masturbation", "Blonde", "Creampie", "Double Penetration", "Lingerie", "POV", "Redhead", "Vintage", "Arab", "Brazilian", "HD", "Virtual Reality", "Compilation", "Casting", "Verified Amateurs", "Young and Old", "Indian", "BBW", "Romantic", "Massage", "Cartoon", "French", "Bondage", "Pissing", "Feet", "Brunette", "Celebrity", "German", "Rough", "Big Ass", "Funny", "Threesome", "European", "Orgy", "Reality", "College", "Bukkake", "Party", "Cosplay", "Webcam", "Big Dick", "Step Fantasy", "Female Orgasm", "Toys", "Solo Male", "Bisexual Male", "BTS", "Bisexual", "Cuckold", "Fingering", "Fisting", "Handjob", "Muscle", "Parody", "Pussy Licking", "SFW", "Small Tits", "Solo girl", "Striptease", "Tattoos", "Erotic", "Hardcore", "Strip", "Shemale", "Transgender"]

	var straight = "";
	count = 0;

	category_list.forEach((datum) => {
		straight +=
			`
			<a href="category/${datum}?p=1" class="st${count++} dropdown-item">${datum}</a>
			`;
	});

	callback(false, straight);

	// // Fetch Categories
	// fetch("https://api.redtube.com/?data=redtube.Categories.getCategoriesList&output=json", (err, response) => {
	// 	if (!err && response) {
	// 		var straight = [];

	// 		// loop thru straight data
	// 		for (const d of response.categories) {
	// 			straight.push(d.category);
	// 		}

	// 		file.create("straight", "category", straight, (err) => {
	// 			if (err) {
	// 				console.log(err);
	// 			}
	// 		});
	// 	} else {
	// 		console.log(err);
	// 	}
	// });
};

//  Fxn for fetching videos by categories
// =============================================================================
fetchData.videoByCategory = (category, page, callback) => {
	// Check for "HD"
	if (category == "HD" || category == "hd") {
		callback(true);
	} else {
		// instantiate Request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&search=" + category + "&output=json&page=" + page + "&thumbsize=big", (err, response) => {
			if (!err && response) {
				var videoData = response.videos;
				var num = response.count;
				var data = "";
				var count = 0;
				for (const d of videoData) {
					data += `
						<div class="card a${(count += 1)}" title=${d.video.title.trim()}>
						<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" class="card-img-top" alt="image" /></a>
						
						<div class="card-body">
							<p class="card-title py-0 my-0">${d.video.title.trim()}</p>
						</div>
						<div class="card-footer">
							<small class="text-body-secondary">
								<p>
									<i class="fas fa-eye"></i>
									<span class="ms-1">${d.video.views}</span>
								</p>
								<p>
									<i class="fas fa-heart"></i>
									<span class="ms-1">${Math.round(d.video.rating)}%</span>
								</p>
							</small>
						</div>
					</div>
					`;
				}
				callback(false, data, num);
			} else {
				console.log(err);
			}
		});
	}
};

//  Fxn for fetching videos lis=> t
// ==============================================================================

// MostViewed
fetchData.listVideos_mv = (include, page, callback) => {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=" + page, (err, response) => {
			if (!err && response) {
				var videoData = response.videos;
				var num = response.count;
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
			} else {
				console.log(err);
			}
		});
	} else {
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=big&page=" + page, (err, response) => {
			if (!err && response) {
				var videoData = response.videos;
				var num = response.count;
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
			} else {
				console.log(err);
			}
		});
	}
};

// TopRated
fetchData.listVideos_rt = (include, page, callback) => {
	if (include) {
		var count = 0;
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=rating&thumbsize=big&page=" + page, (err, response) => {
			if (!err && response) {
				var videoData = response.videos;
				var num = response.count;
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
			} else {
				console.log(err);
			}
		});
	} else {
		// Instantiate request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=rating&thumbsize=big&page=" + page, (err, response) => {
			if (!err && response) {
				var videoData = response.videos;
				var num = response.count;
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
			} else {
				console.log(err);
			}
		});
	}
};

// International
fetchData.listVideos_it = (page, callback) => {
	let count = 0;

	// Instantiate request
	fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=mostviewed&thumbsize=medium&page=" + page, (err, response) => {
		if (!err && response) {
			var videoData = response.videos;
			var num = response.count;
			var data = "";

			// include count in id
			for (const d of videoData) {
				data += `
				
					<div class="card a${(count += 1)}" title=${d.video.title.trim()}>
						<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" class="card-img-top" alt="image" /></a>
						
						<div class="card-body">
							<p class="card-title py-0 my-0">${d.video.title.trim()}</p>
						</div>
						<div class="card-footer">
							<small class="text-body-secondary">
								<p>
									<i class="fas fa-eye"></i>
									<span class="ms-1">${d.video.views}</span>
								</p>
								<p>
									<i class="fas fa-heart"></i>
									<span class="ms-1">${Math.round(d.video.rating)}%</span>
								</p>
							</small>
						</div>
					</div>

					`;
			}

			// console.log(num);
			callback(false, data, num);
		} else {
			console.log(err);
		}
	});
}

// Fxn for searching database
// =============================================================================
fetchData.search = (word, page, callback) => {
	// Instantiate request
	fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + word + "&ordering=mostviewed&thumbsize=big&page=" + page, (err, response) => {
		if (!err && response) {
			var videoData = response.videos;
			var num = response.count;
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
			// console.log(num);
			callback(false, data, num);
		} else {
			console.log(err);
		}
	});
};

//  for fetching video iframe detail=> s
// ==============================================================================
fetchData.iframe = (id, callback) => {
	const url = "https://api.redtube.com/?data=redtube.Videos.isVideoActive&video_id=" + id + "&output=json"

	fetch(url, (err, response) => {
		// Check error
		if (!err && response) {
			// Check if video is active
			if (response["active"]["is_active"]) {
				callback(false, response, "Video is active");
			} else {
				callback(true, {}, "Video is not available");
			}
		} else {
			console.log(err)
		}
	});
};

//  Fxn for fetching related video=> s
// =============================================================================
fetchData.videoById = (id, callback) => {
	fetch("https://api.redtube.com/?data=redtube.Videos.getVideoById&video_id=" + id + "&output=json&thumbsize=big", (err, response) => {
		if (!err && response) {
			var tags = response.video.tags;
			var title = response.video.title;
			let thumb = response.video.thumb;
			var embed_url = response.video.embed_url;
			var random = Math.floor(Math.random() * tags.length) + 1;
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

			// Fetch related videos by tags
			fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + tags[random] + "&tags[]=" + tags[random] + "&ordering=mostviewed&thumbsize=big&page=" + Math.floor(Math.random() * 30) + 1, (err, response) => {
				if (!err && response) {
					var videoData = response.videos;
					let videos = ""
					var count = 0;
					for (const d of videoData) {
						videos += `
						
							<div class="card a${(count += 1)}" title=${d.video.title.trim()}>
								<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" class="card-img-top" alt="image" /></a>
								
								<div class="card-body">
									<p class="card-title py-0 my-0">${d.video.title.trim()}</p>
								</div>
								<div class="card-footer">
									<small class="text-body-secondary">
										<p>
											<i class="fas fa-eye"></i>
											<span class="ms-1">${d.video.views}</span>
										</p>
										<p>
											<i class="fas fa-heart"></i>
											<span class="ms-1">${Math.round(d.video.rating)}%</span>
										</p>
									</small>
								</div>
							</div>
						`;
					}

					callback(false, title, embed_url, data, videos, thumb);
				} else {
					console.log(err);
				}
			});
		} else {
			console.log(err);
		}
	});
};

// Fxn for fetching video by tag=> s
// ===================================================================================
fetchData.videoByTags = (trans, page, callback) => {
	// Check query
	var tran = trans == "180° Virtual Reality" ? "Virtual Reality" : trans;

	fetchData.translate(tran, (err, tag) => {
		if (!err && tag) {
			// Instantiate Request
			fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=" + tag + "&tags[]=" + tag + "&ordering=mostviewed&thumbsize=big&page=" + page, (err, response) => {
				if (!err && response) {
					var videoData = response.videos;
					var num = response.count;
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
					callback(false, data, num);
				} else {
					console.log(err);
				}
			});
		}
	});
};

// Export module
// ============================================================================
module.exports = fetchData;
