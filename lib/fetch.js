/*
 *
 * Script for calling redTube API
 *
 */

// Dependencies
// =============================================================================
var { fetch } = require("./helper");
const { translate } = require("bing-translate-api");

// Categories
// =============================================================================
const category_list = ["Big Tits", "Teens", "Lesbian", "Blowjob", "Anal", "Amateur", "Asian", "Public", "Cumshot", "Ebony", "Group", "Hentai", "Mature", "Fetish", "Japanese", "Facials", "MILF", "Latina", "Gangbang", "Squirting", "Interracial", "Masturbation", "Blonde", "Creampie", "Double Penetration", "Lingerie", "POV", "Redhead", "Vintage", "Arab", "Brazilian", "HD", "Virtual Reality", "Compilation", "Casting", "Verified Amateurs", "Young and Old", "Indian", "BBW", "Romantic", "Massage", "Cartoon", "French", "Bondage", "Pissing", "Feet", "Brunette", "Celebrity", "German", "Rough", "Big Ass", "Funny", "Threesome", "European", "Orgy", "Reality", "College", "Bukkake", "Party", "Cosplay", "Webcam", "Big Dick", "Step Fantasy", "Female Orgasm", "Toys", "Solo Male", "Bisexual Male", "BTS", "Bisexual", "Cuckold", "Fingering", "Fisting", "Handjob", "Muscle", "Parody", "Pussy Licking", "SFW", "Small Tits", "Solo girl", "Striptease", "Tattoos", "Erotic", "Hardcore", "Strip", "Shemale", "Transgender"]
const videoCategories = ["mostviewed", "rating", "recommended", "International"]

// Container for all fetch requests
// =============================================================================
var fetchData = {};

// Translator
const translator = (str, callback) => {
	translate(str, "auto-detect", "en", true)
		.then((res) => {
			callback(false, res.translation);
		})
		.catch((err) => {
			console.error(err);
			callback(true, err);
		});
};

//  for fetching all categories
// =============================================================================
fetchData.allCategories = (callback) => {
	var straight = "";
	count = 0;

	category_list.forEach((datum) => {
		straight +=
			`
			<a href="category/${datum.toLowerCase().replace(" ", "_")}" class="st${count++} dropdown-item">${datum}</a>
			`;
	});

	callback(false, straight);
};

//  Fxn for fetching videos by categories
// =============================================================================
fetchData.videoByCategory = (category, page, callback) => {
	// Check if category is in the list
	if (category && category_list.indexOf(category) > -1) {
		// instantiate Request
		fetch("https://api.redtube.com/?data=redtube.Videos.searchVideos&search=" + category + "&output=json&page=" + page + "&thumbsize=big", (err, response) => {
			if (!err && response) {
				// Check if videos exists
				// If video does not exist, return error
				if (!response.videos) {
					callback(true, {}, "Video not found");
					return
				}

				// Define variables
				var videoData = response.videos;
				var data = "";
				var count = 0;

				// Loop through video data
				// and construct HTML
				for (const d of videoData) {
					data += `
						<div class="card a${(count += 1)}" title=${d.video.title.trim()}>
						<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" referrerpolicy="no-referrer" class="card-img-top" alt="image" /></a>
						
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
				callback(false, data);
			} else {
				console.log(err);
			}
		});
	} else {
		callback(true);
	}
};

//  Fxn for fetching videos list
// ==============================================================================

fetchData.listVideos = (page, folder, callback) => {
	let count = 0;

	// Instantiate request
	fetch(`https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=hard&ordering=${videoCategories[folder]}&thumbsize=big&page=` + page, (err, response) => {
		if (!err && response) {
			var videoData = response.videos;
			var num = response.count;
			var data = "";

			// include count in id
			for (const d of videoData) {
				data += `
				
					<div class="card a${(count += 1)}" title=${d.video.title.toString()}>
						<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" referrerpolicy="no-referrer" class="card-img-top" alt="image" /></a>
						
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

			callback(false, data, videoCategories[folder]);
		} else {
			console.log(err);
		}
	});
}

// Fxn for searching database
// =============================================================================
fetchData.search = (word, page, callback) => {
	// Instantiate request
	fetch(`https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${word}&ordering=${videoCategories[folder]}&thumbsize=big&page=` + page, (err, response) => {
		if (!err && response) {
			// Check if video exists
			// If video does not exist, return error
			if (!response.videos) {
				callback(true, undefined, "No videos found for this query");
				return
			}

			// Define variables
			var videoData = response.videos;
			var videos = "";
			var count = 0;
			for (const d of videoData) {
				videos += `
						
							<div class="card a${(count += 1)}" title=${d.video.title.trim()}>
								<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" referrerpolicy="no-referrer" class="card-img-top" alt="image" /></a>
								
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

			// Return videos
			callback(false, videos, videoCategories[folder]);
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
			// Check if video exists
			// If video does not exist, return error
			if (!response.video) {
				callback(true, {}, "Video not found");
				return
			}

			// Define variables
			var tags = response.video.tags ? response.video.tags : false;
			var title = response.video.title ? response.video.title : false;
			let thumb = response.video.thumb ? response.video.thumb : false;
			var embed_url = response.video.embed_url ? response.video.embed_url : false;
			var random = Math.floor(Math.random() * tags.length) + 1;
			var data = "";

			if (tags && tags.length !== 0 && tags.length > 0) {
				for (const d of tags) {
					data += `
						<a href="tag/${d.replace(" ", "_").toLowerCase()}">${d}</a>
					`;
				}
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
								<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" referrerpolicy="no-referrer" class="card-img-top" alt="image" /></a>
								
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
fetchData.videoByTags = (str, page, callback) => {
	// Check query
	var _tag = str == "180° Virtual Reality" ? "Virtual Reality" : str;

	translator(_tag, (err, tag) => {
		if (!err && tag) {
			// Instantiate Request
			fetch(`https://api.redtube.com/?data=redtube.Videos.searchVideos&output=json&search=${tag}&tags[]=${tag}&ordering=${videoCategories[folder]}&thumbsize=big&page=` + page, (err, response) => {
				if (!err && response) {
					// Check if video exists
					// If video does not exist, return error
					if (!response.videos) {
						callback(true, undefined, "No videos found for this tag");
						return
					}

					// Define variables
					var videoData = response.videos;
					var videos = "";
					var count = 0;
					for (const d of videoData) {
						videos += `
						
							<div class="card a${(count += 1)}" title=${d.video.title.trim()}>
								<a href="view/${d.video.video_id}"><img data-src="${d.video.thumb}" referrerpolicy="no-referrer" class="card-img-top" alt="image" /></a>
								
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
					callback(false, videos, videoCategories[folder]);
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
