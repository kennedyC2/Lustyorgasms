/*
 *
 * Server Loader
 *
 */

// Dependencies
// ==================================================================================
var url = require("url");
var http = require("http");
var https = require("https");
var stringDecoder = require("string_decoder").StringDecoder;
var helpers = require("./helper");
var handler = require("./handlers");
var config = require("./config");
var fs = require("fs");
var dirPath = require("path");

// Container for Server functions
// =================================================================================
var server = {};

// Http Server
// ================================================================================
server.httpServer = http.createServer((req, res) => {
	server.unifiedServer(req, res);
});

// https certificate and key
// ================================================================================
server.httpsServerOptions = {
	key: fs.readFileSync(dirPath.join(__dirname, "/../https/key.pem")),
	cert: fs.readFileSync(dirPath.join(__dirname, "/../https/cert.pem")),
};

// Https Server
// ================================================================================
server.httpsServer = https.createServer(server.httpsServerOptions, (req, res) => {
	server.unifiedServer(req, res);
});

// Unified Server
// =================================================================================
server.unifiedServer = (req, res) => {
	// Reset Array
	var requestUrl = [];

	// Get Request Url
	var _url = url.parse(req.url, true);

	// Get Full Url, and save
	var reqUrl = "https://lustyorgasms.com" + _url.href;
	requestUrl.push(reqUrl);

	// Get Path
	var path = _url.pathname;

	// Trim path to remove Unwanted items
	var trimmedPath = path
		.replace(/^\/+|\/+$/g, "")
		.replace('"', "")
		.replace('"', "")
		.replace("https://", "")
		.replace("%E2%80%9Dlustyorgasms.com%E2%80%9D", "");

	// Get request method
	var method = req.method.toLowerCase();

	// Get Request headers
	var header = req.headers;

	// Get querystring Object
	var queryStringObject = _url.query;

	// Get the payload, if any
	var decoder = new stringDecoder("utf-8");
	var incomingMessage = "";
	req.on("data", (data) => {
		incomingMessage += decoder.write(data);
	});

	// End request
	req.on("end", () => {
		incomingMessage += decoder.end();

		// Channel path to handler for processing
		var chosenHandler = typeof server.router[trimmedPath] !== "undefined" ? server.router[trimmedPath] : handler.notFound;

		// if the request is within the public directory, route to the public handler
		chosenHandler = trimmedPath.indexOf("public/") > -1 ? handler.public : trimmedPath.indexOf("webfonts/") > -1 ? handler.webfont : chosenHandler;

		// if the request is within the playVideo directory, route to the getVideo handler
		chosenHandler = trimmedPath.indexOf("view/") > -1 ? handler.playVideo : chosenHandler;

		// if the request is within the getVideo directory, route to the getVideo handler
		chosenHandler = trimmedPath.indexOf("category/") > -1 ? handler.getVideo : chosenHandler;

		// Construct information to be sent to handler
		var data = {
			trimmedPath: trimmedPath,
			path: path,
			header: header,
			method: method,
			queryStringObject: queryStringObject,
			payload: helpers.parseJsonToObject(incomingMessage),
			completeUrl: requestUrl,
		};

		// console.log(data)

		// Send response
		chosenHandler(data, (statusCode, message, contentType) => {
			try {
				server.handlerProcessor(res, statusCode, message, contentType);
			} catch (error) {
				console.log(error);
				server.handlerProcessor(res, 500, { Error: "An unknown error has occured" }, "json");
			}
		});
	});
};

// Handler processor for error handling
// ================================================================================================
server.handlerProcessor = (res, statusCode, message, contentType) => {
	// Sanity check
	statusCode = typeof statusCode == "number" ? statusCode : 200;
	contentType = typeof contentType == "string" ? contentType : "json";

	// Define message for sending
	var responseMsg = "";

	// JSON
	if (contentType == "json") {
		res.setHeader("Content-Type", "application/json");
		message = typeof message == "object" ? message : {};
		responseMsg = JSON.stringify(message);
	}

	// HTML
	if (contentType == "html") {
		res.setHeader("Content-Type", "text/html");
		message = typeof message == "string" ? message : "";
		responseMsg = message;
	}

	// XML
	if (contentType == "xml") {
		res.setHeader("Content-Type", "text/xml");
		message = typeof message == "string" ? message : "";
		responseMsg = message;
	}

	// PLAIN
	if (contentType == "plain") {
		res.setHeader("Content-Type", "text/plain");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	// CSS
	if (contentType == "css") {
		res.setHeader("Content-Type", "text/css");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	// JS
	if (contentType == "js") {
		res.setHeader("Content-Type", "text/javascript");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	//SVG
	if (contentType == "svg") {
		res.setHeader("Content-Type", "image/svg+xml");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	// PNG
	if (contentType == "png") {
		res.setHeader("Content-Type", "image/png");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	//JPG
	if (contentType == "jpg") {
		res.setHeader("Content-Type", "image/jpg");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	if (contentType == "ico") {
		res.setHeader("Content-Type", "image/x-icon");
		message = typeof message !== "undefined" ? message : "";
		responseMsg = message;
	}

	// Define response content
	res.setHeader("Access-Control-Allow-Origin", "https://lustyorgasms.com");
	res.setHeader("Access-Control-Allow-Methods", "GET, OPTION");
	res.setHeader("Access-Control-Request-Method", "GET");
	res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Max-Age", "86400");
	res.writeHead(statusCode);
	// console.log(data);

	// Send message
	res.end(responseMsg);
};

// Define Router
server.router = {
	"": handler.index,
	ping: handler.ping,
	hello: handler.hello,
	public: handler.public,
	home: handler.home,
	getVideo: handler.getVideo,
	search: handler.search,
	playVideo: handler.playVideo,
	tag: handler.tagVideo,
	"favicon.ico": handler.favicon,
	"apple-touch-icon.png": handler.favicon,
	"android-chrome-192x192.png": handler.favicon,
	"android-chrome-512x512.png": handler.favicon,
	"favicon-32x32.png": handler.favicon,
	"favicon-16x16.png": handler.favicon,
	"site.webmanifest": handler.favicon,
	"11985bf2958c069727c2394a07d57991.html": handler.exoclicks,
	"8b617e8612a657eb.html": handler.hubTraffic,
	sitemap: handler.sitemap,
	"service-worker": handler.serviceWorker,
};

// init function
// ===============================================================================================
server.init = () => {
	// Instantiate the http server
	server.httpServer.listen(config.httpPort, () => {
		console.log("HTTP Server has started on " + config.envName + " mode, with port " + config.httpPort);
	});

	// Instantiate the https server
	server.httpsServer.listen(config.httpsPort, () => {
		console.log("HTTPS Server has started on " + config.envName + " mode, with port " + config.httpsPort);
	});
};

// Export modules
// =========================================================================================
module.exports = server;
