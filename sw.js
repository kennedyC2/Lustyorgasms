//  Activate Service Worker, if inactive
// ===================================================================================================
var default_cache = "static_v1";
var image_cache_name = "images";

// file extensions to cache
var image_extensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"]

var url = [
	"/",
	"/offline",
	"/public/all.min.css",
	"/public/app.css",
	"/public/app.js",
	"/public/bootstrap.css",
	"/public/bootstrap.bundle.js",
	"/public/bootstrap.bundle.js.map",
	"/public/images/1597744820143.png",
	"/favicon/android-chrome-192x192.png",
	"/favicon/android-chrome-512x512.png",
	"/favicon/apple-touch-icon-120x120.png",
	"/favicon/apple-touch-icon-152x152.png",
	"/favicon/apple-touch-icon-180x180.png",
	"/favicon/apple-touch-icon-60x60.png",
	"/favicon/apple-touch-icon-72x72.png",
	"/favicon/browserconfig.xml",
	"/favicon/favicon-16x16.png",
	"/favicon/favicon-32x32.png",
	"/favicon/favicon-48x48.png",
	"/favicon/favicon.ico",
	"/favicon/mstile-150x150.png",
	"/webfonts/fa-brands-400.eot",
	"/webfonts/fa-brands-400.svg",
	"/webfonts/fa-brands-400.ttf",
	"/webfonts/fa-brands-400.woff",
	"/webfonts/fa-brands-400.woff2",
	"/webfonts/fa-regular-400.eot",
	"/webfonts/fa-regular-400.svg",
	"/webfonts/fa-regular-400.ttf",
	"/webfonts/fa-regular-400.woff",
	"/webfonts/fa-regular-400.woff2",
	"/webfonts/fa-solid-900.eot",
	"/webfonts/fa-solid-900.svg",
	"/webfonts/fa-solid-900.ttf",
	"/webfonts/fa-solid-900.woff",
	"/webfonts/fa-solid-900.woff2",
];

// Install Service Worker and save pages to cache
// ===================================================================================================
self.addEventListener("install", function (event) {
	console.log('WORKER: install event in progress.');
	event.waitUntil(
		caches
			.open(default_cache)
			.then(function (cache) {
				return cache.addAll(url);
			})
			.then(function () {
				console.log('WORKER: install completed');
			}),
	);
});

// Delete Old caches on update
// =========================================================================================
self.addEventListener("activate", function (event) {
	var cacheAllowlist = [default_cache, image_cache_name];

	event.waitUntil(
		caches.keys().then(function (cacheNames) {
			return Promise.all(
				cacheNames.map(function (cacheName) {
					if (cacheAllowlist.indexOf(cacheName) === -1) {
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});

// intercept fetch request and render saved pages
// ===================================================================================================
self.addEventListener("fetch", function (event) {
	// console.log('WORKER: fetch event in progress.');
	// Block all GET request
	if (event.request.method !== "GET") {
		// console.log('WORKER: fetch event ignored.', event.request.method, event.request.url);
		return;
	}

	// Render Saved cache pages
	event.respondWith(
		// check for matching pages in catch
		caches.match(event.request).then(function (cached) {
			// Get fresh page and save to cache
			var networked = fetch(event.request)
				// We handle the network request with success and failure scenarios.
				.then(fetchedFromNetwork, unableToResolve)
				// We should catch errors on the fetchedFromNetwork handler as well.
				.catch(unableToResolve);
			// return cached page if available, or return network page
			// console.log('WORKER: fetch event', cached ? '(cached)' : '(network)', event.request.url);
			return cached || networked;

			// Function for Fetched Response
			function fetchedFromNetwork(response) {
				// Copy network page and save for next reload
				var cacheCopy = response.clone();

				// console.log('WORKER: fetch response from network.', event.request.url);

				// We open a cache to store the response for this request.
				// Route to appropriate cache based on file type
				let cache_to_open = event.request.url.indexOf(".jpg") > -1 || event.request.url.indexOf(".jpeg") > -1 ? image_cache_name : default_cache
				caches.open(cache_to_open)
					.then(function (cache) {
						cache.put(event.request, cacheCopy);
					})
					.then(function () {
						// console.log('WORKER: fetch response stored in cache.', event.request.url);
						// Trim cache to save space
						var maxItems = event.request.url.indexOf(".jpg") > -1 || event.request.url.indexOf(".jpeg") > -1 ? 200 : 100;
						caches.open(cache_to_open).then((cache) => {
							cache.keys().then((keys) => {
								if (keys.length > maxItems) {
									cache.delete(keys[0])
								}
							});
						});
					});

				// Return the response so that the promise is settled in fulfillment.
				return response;
			}

			//  Function for Unresolved response
			function unableToResolve() {
				// console.log('WORKER: fetch request failed in both cache and network.');
				// Return the offline page  
				return caches.match('/offline');
			}
		}),
	);
});
