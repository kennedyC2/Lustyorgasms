//  Activate Service Worker, if inactive
// ===================================================================================================
var cache_name = "LO - cv1";
var url = ["/", "public/normalize.css", "public/app.min.css", "public/app.min.js", "public/images/1597744820143.png", "public/images/eye.svg", "public/images/like.svg"];
self.addEventListener("install", function (event) {
	// console.log('WORKER: install event in progress.');
	event.waitUntil(
		caches
			.open(cache_name)
			.then(function (cache) {
				return cache.addAll(url);
			})
			.then(function () {
				// console.log('WORKER: install completed');
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
				caches.open(cache_name).then(function (cache) {
					cache.put(event.request, cacheCopy);
				});
				// .then(function() {
				// 	console.log('WORKER: fetch response stored in cache.', event.request.url);
				// });

				// Return the response so that the promise is settled in fulfillment.
				return response;
			}

			//  Function for Unresolved response
			function unableToResolve() {
				// console.log('WORKER: fetch request failed in both cache and network.');
				/* Here we're creating a response programmatically. The first parameter is the response body, and the second one defines the options for the response.*/
				return new Response("<h1>Service Unavailable</h1>", {
					status: 503,
					statusText: "Service Unavailable",
					headers: new Headers({
						"Content-Type": "text/html",
					}),
				});
			}
		}),
	);
});

// Delete Old caches on update
// =========================================================================================
self.addEventListener("activate", function (event) {
	var cacheAllowlist = [cache_name];

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
